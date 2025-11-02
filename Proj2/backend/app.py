from flask import Flask
from extensions import db, cors
from routes import bp as api_bp

def create_app():
    app = Flask(__name__)
    
    # Database Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:srushti@localhost:5432/foodpool'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    cors.init_app(app)
    
    # Register blueprints
    app.register_blueprint(api_bp)
    
    # Initialize database
    with app.app_context():
        # Import models here to ensure they're registered with SQLAlchemy
        import models
        db.create_all()
        print("✅ Database tables created!")
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)