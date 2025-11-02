from flask import Blueprint

bp = Blueprint('api', __name__, url_prefix='/api')

from . import health, groups, polls

__all__ = ['bp']