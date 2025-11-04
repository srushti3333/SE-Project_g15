from flask import jsonify, request
from models import User
from extensions import db
from flask_jwt_extended import create_access_token

def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'message': 'All fields are required'}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(user.id), additional_claims={'username': user.username})
    return jsonify({'token': token, 'username': user.username}), 200

def test_register_user(client):
    response = client.post('/api/auth/register', json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass",
        "full_name": "Test User",  # add these if required
        "phone": "1234567890"
    })
    print(response.get_json())  # Optional: debug output
    assert response.status_code in [200, 201]
