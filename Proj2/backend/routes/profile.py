from flask import Blueprint
from controllers.profile_controller import get_profile, update_profile
from flask_jwt_extended import jwt_required

profile_bp = Blueprint('profile', __name__, url_prefix='/api/profile')


@profile_bp.route('', methods=['GET'])
@jwt_required()
def profile_get():
    return get_profile()

@profile_bp.route('', methods=['PUT'])
@jwt_required()
def profile_update():
    return update_profile()

@profile_bp.route('/orders', methods=['GET'])
@jwt_required()
def profile_orders():
    from controllers.profile_controller import get_past_orders
    return get_past_orders()
