from flask import request, jsonify
from models.user import User
from extensions import db
from flask_jwt_extended import get_jwt_identity

def get_profile():
    user_data = get_jwt_identity()
    user = User.query.get(user_data['id'])

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone,
        "street": user.street,
        "city": user.city,
        "state": user.state,
        "pincode": user.pincode
    }), 200


def update_profile():
    user_data = get_jwt_identity()
    user = User.query.get(user_data['id'])

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()

    for field in ["full_name", "phone", "street", "city", "state", "pincode"]:
        if field in data:
            setattr(user, field, data[field])

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200
