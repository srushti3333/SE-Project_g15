# routes/__init__.py
from flask import Blueprint
from . import auth_routes, profile
from . import health  # noqa: F401
from . import groups  # noqa: F401
from . import polls  # noqa: F401
from . import orders  # noqa: F401

bp = Blueprint("api", __name__, url_prefix="/api")
# Register the auth blueprint with the main API blueprint
bp.register_blueprint(auth_routes.auth_bp, url_prefix="/auth")
bp.register_blueprint(profile.profile_bp, url_prefix="/profile")
# bp.register_blueprint(orders.orders_bp, url_prefix='/orders')

__all__ = ["bp"]
