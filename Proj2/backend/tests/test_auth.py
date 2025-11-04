# backend/tests/test_auth.py
def test_register_user(client):
    response = client.post('/api/auth/register', json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass"
    })
    assert response.status_code in [200, 201]

def test_login_user(client):
    # Register first
    client.post('/api/auth/register', json={
        "username": "loginuser",
        "email": "login@example.com",
        "password": "testpass"
    })
    # Then login
    response = client.post('/api/auth/login', json={
        "username": "loginuser",
        "password": "testpass"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "token" in data 
    assert data["username"] == "loginuser"