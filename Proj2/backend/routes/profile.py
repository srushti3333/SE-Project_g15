from flask import Blueprint
from controllers.profile_controller import get_profile, update_profile
from flask_jwt_extended import jwt_required

profile_bp = Blueprint('profile', __name__)

profile_bp.route('/', methods=['GET'])(jwt_required()(get_profile))
profile_bp.route('/', methods=['PUT'])(jwt_required()(update_profile))
