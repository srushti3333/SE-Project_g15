from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db, bcrypt
from config import Config
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
bcrypt.init_app(app)
JWTManager(app)

@app.route('/')
def home():
    return "Flask backend connected successfully!", 200

app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=Config.PORT, debug=True)
