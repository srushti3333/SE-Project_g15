# routes/__init__.py
from flask import Blueprint

bp = Blueprint('api', __name__, url_prefix='/api')

from . import health, groups, polls, auth_routes, profile

# Register the auth blueprint with the main API blueprint
bp.register_blueprint(auth_routes.auth_bp, url_prefix='/auth')
bp.register_blueprint(profile.profile_bp, url_prefix='/profile')

__all__ = ['bp']
