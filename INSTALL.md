# 🛠️ Installation Guide
Follow these steps to set up and run the project locally.
---

## 📦 Prerequisites

Make sure you have the following installed on your system:
- Python 3.9+
- Node.js 18+ and npm
- Git
- Virtual Environment (venv or virtualenv)
- PostgreSQL (if using a database backend)
---

## 🚀 Backend Setup (Flask)

### 1.  Clone the Repository

```bash 
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>/backend
```

### 2.  Create and Activate Virtual Environment

```
python -m venv venv
source venv/bin/activate     # On macOS/Linux
venv\Scripts\activate        # On Windows
```

### 3.  Install Dependencies
```
pip install -r requirements.txt
```

### 4.  Set Up PostgreSQL Database
   
  Create a PostgreSQL User and Database

  4.1.  Open the PostgreSQL shell (or use pgAdmin):
  ```
  psql -U postgres
  ```
  
  4.2.  Create a new database user and password:
  ```
  CREATE USER myuser WITH PASSWORD 'mypassword';
  ```
  
  4.3.  Create a new database:
  ```
  CREATE DATABASE mydatabase OWNER myuser;
  ```
  
  4.4.  Grant privileges:
  ```
  GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
  ```
  
  4.5.  Exit psql:
  ```
  \q
  ```

### 5.  Configure Environment Variables

Create a .env file in the backend directory with the following:
```
FLASK_APP=app.py
FLASK_ENV=development
PORT=5000
SQLALCHEMY_DATABASE_URI=sqlite:///database.db
DB_HOST=127.0.0.1
DB_NAME=...YourDBName
DB_USER=...YourDBUser
DB_PASSWORD=...YourBDPassword
JWT_SECRET=...YourSecret
```

### 6.  Run Database Migrations
```
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 7.  Start the Flask Server
```
flask run
```

  Flask will start on http://localhost:5000

--- 

## 💻 Frontend Setup (React)

### 1.  Navigate to Frontend Folder

```
cd ../frontend
```

### 2.  Install Dependencies
```
npm install
```

### 3.  Start the Frontend
```
npm start
```

React app will run on http://localhost:3000 

---
## 🔄 Connecting Frontend and Backend

Update the backend API base URL in the frontend .env file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Restart the frontend server to apply changes.

---

## ✅ Running Tests

Frontend:
```
cd frontend
npm test -- --coverage
```

Backend:
```
cd backend
pytest --cov=. --cov-report=html
```
---

## 🧩 Common Issues

| Issue |	Solution |
|-------|----------|
| flask db migrate not found	| Run pip install Flask-Migrate |
| CORS errors in frontend	| Ensure Flask-CORS is enabled in extensions.py |
| Frontend API errors |	Check .env API URL and Flask server status |

---

## 🎉 You’re All Set!

Your application should now be running successfully with:

- Backend: http://localhost:5000 
- Frontend: http://localhost:3000 
