from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from extensions import db
from models import Group, GroupOrder, GroupOrderItem, GroupMember
from . import bp
from datetime import datetime, timezone

from datetime import datetime, timezone

def parse_iso_utc(dt_str: str):
    """Parse ISO datetime string, ensure UTC-aware."""
    if not dt_str:
        return None
    # Replace Z with +00:00
    if dt_str.endswith('Z'):
        dt_str = dt_str.replace('Z', '+00:00')
    dt = datetime.fromisoformat(dt_str)
    # Make timezone-aware UTC if naive
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    else:
        dt = dt.astimezone(timezone.utc)
    return dt


# Get all orders in a group
@bp.route('/groups/<int:group_id>/orders', methods=['GET'])
@jwt_required()
def get_group_orders(group_id):
    claims = get_jwt()
    username = claims.get('username')

    # Check if user is a member
    member = GroupMember.query.filter_by(group_id=group_id, username=username).first()
    if not member:
        return jsonify({'error': 'Not a member of this group'}), 403

    orders = GroupOrder.query.filter_by(group_id=group_id).all()
    return jsonify([o.to_dict() for o in orders]), 200

# Add or update an order for a user in a group
@bp.route('/groups/<int:group_id>/orders', methods=['POST'])
@jwt_required()
def add_or_update_order(group_id):
    claims = get_jwt()
    username = claims.get('username')
    data = request.json or {}

    group = Group.query.get_or_404(group_id)

    # Check membership
    member = GroupMember.query.filter_by(group_id=group_id, username=username).first()
    if not member:
        return jsonify({'error': 'Not a member of this group'}), 403

    data_next_order_time = data.get('nextOrderTime') or data.get('next_order_time')
    next_order_time_utc = parse_iso_utc(data_next_order_time) or group.next_order_time

    # Compare with current UTC time
    if datetime.now(timezone.utc) > next_order_time_utc:
        return jsonify({'error': 'Group order time has expired'}), 400

    # Get or create user's order
    order = GroupOrder.query.filter_by(group_id=group_id, username=username).first()
    if not order:
        order = GroupOrder(group_id=group_id, username=username)
        db.session.add(order)
        db.session.flush()  # Assign order.id

    # Clear previous items
    GroupOrderItem.query.filter_by(order_id=order.id).delete()

    # Add new items
    items = data.get('items', [])
    for item in items:
        db.session.add(GroupOrderItem(
            order_id=order.id,
            menu_item_id=item['menuItemId'],
            quantity=item.get('quantity', 1),
            special_instructions=item.get('specialInstructions', '')
        ))

    db.session.commit()
    return jsonify(order.to_dict()), 201


# Delete a user's order in a group
@bp.route('/groups/<int:group_id>/orders', methods=['DELETE'])
@jwt_required()
def delete_order(group_id):
    claims = get_jwt()
    username = claims.get('username')

    order = GroupOrder.query.filter_by(group_id=group_id, username=username).first()
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully'}), 200

# Place an immediate solo order
@bp.route('/groups/<int:group_id>/orders/immediate', methods=['POST'])
@jwt_required()
def place_immediate_order(group_id):
    claims = get_jwt()
    username = claims.get('username')
    data = request.json  # { items: [...] }

    group = Group.query.get_or_404(group_id)

    # Check if user is a member
    member = GroupMember.query.filter_by(group_id=group_id, username=username).first()
    if not member:
        return jsonify({'error': 'Not a member of this group'}), 403

    # Immediate orders ignore next_order_time
    order = GroupOrder.query.filter_by(group_id=group_id, username=username).first()
    if not order:
        order = GroupOrder(group_id=group_id, username=username)
        db.session.add(order)
        db.session.flush()  # To get order.id

    # Clear previous items
    GroupOrderItem.query.filter_by(order_id=order.id).delete()

    # Add new items
    items = data.get('items', [])
    for item in items:
        db.session.add(GroupOrderItem(
            order_id=order.id,
            menu_item_id=item['menuItemId'],
            quantity=item.get('quantity', 1),
            special_instructions=item.get('specialInstructions')
        ))

    db.session.commit()
    return jsonify(order.to_dict()), 201
