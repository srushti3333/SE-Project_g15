# SE-Project_g15
The repository contains submissions for Software Engineering project done by Group-15

# 🍕 FoodPool: Eat Together. Save Together.

[![Build Status](https://github.com/srushti3333/SE-Project_g15/workflows/CI/badge.svg)](https://github.com/srushti3333/SE-Project_g15/actions)
[![codecov](https://codecov.io/gh/srushti3333/SE-Project_g15/branch/main/graph/badge.svg)](https://codecov.io/gh/srushti3333/SE-Project_g15)
[![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/flask-3.0.3-green.svg)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/react-18.0-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-14%2B-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Community-driven pooled food ordering platform that saves costs, reduces delivery inefficiency, and promotes eco-friendly practices.

---

 📹 Demo Video

🎥 [Watch our demo here](YOUR_VIDEO_LINK)

---

 🌟 Overview

FoodPool enables community-driven pooled food orders, letting nearby users combine meals to save costs and streamline delivery.

# Key Benefits:
- 💰 Save Money - Split delivery fees and access bulk discounts
- 🌍 Eco-Friendly - Reduce CO₂ emissions through optimized deliveries
- 🤝 Community-Driven - Connect with neighbors
- 🎁 Dual Rewards - Earn app loyalty points + restaurant incentives

---

 ✨ Features

- 🎯 Organizer-Led Orders - Single/multi-origin, curated menus, poll-based finalization
- 📍 Location-Based Pools - Discover and join nearby pools
- 💬 Real-Time Collaboration - Live chat, notifications, countdowns
- 🔄 Recurring Pools - Schedule weekly/monthly deliveries
- 📊 Dynamic Pricing - See savings in real-time as members join
- 🌱 Eco-Impact Tracking - Track CO₂ saved per pooled delivery
- ⭐ Gamification - Leaderboards, badges, and streaks

---

 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Flask 3.0.3 (Python) |
| Frontend | React 18 |
| Database | PostgreSQL 14+ |
| Authentication | JWT (Flask-JWT-Extended) |
| ORM | SQLAlchemy 2.0.44 |
| Testing | pytest, Jest |
| CI/CD | GitHub Actions |

---

 🚀 Getting Started

# Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

# Backend Setup
```bash
# Clone and navigate to backend
git clone https://github.com/srushti3333/SE-Project_g15.git
cd SE-Project_g15/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
echo "DATABASE_URL=postgresql://user:password@localhost:5432/foodpool" > .env
echo "JWT_SECRET_KEY=your-secret-key" >> .env

# Run server
python app.py
```

Server runs on `http://localhost:5000`

# Frontend Setup
```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Set up environment
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

App runs on `http://localhost:3000`

---

 🧪 Running Tests

# Backend
```bash
cd backend
pytest --cov=. --cov-report=html
```

# Frontend
```bash
cd frontend
npm test -- --coverage
```

Test Coverage: 100+ test cases covering nominal and off-nominal scenarios

---

 📁 Project Structure
```
SE-Project_g15/
├── backend/
│   ├── app.py              # Flask entry point
│   ├── models.py           # Database models
│   ├── routes.py           # API endpoints
│   ├── requirements.txt    # Dependencies
│   └── tests/              # Backend tests
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── routes/
│   │   ├── pages/
│   │   ├── components/
│   │   └── context/
│   ├── package.json
│   └── tests/              # Frontend tests
│
└── .github/
    └── workflows/
        └── ci.yml          # CI/CD pipeline
```

---

 📊 Development Workflow

# Branching Strategy
- `main` - Production code
- `develop` - Integration branch
- `feature/*` - New features
- `hotfix/*` - Bug fixes

# Making Changes
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add: feature description"

# Push and create PR
git push origin feature/your-feature
```

---

 👥 Team - Group 15

| Name |
|------|
| Dev Patel | 
| Sakhi Patel | 
| Srushti Thakar | 
| Vaishvi Patel | 

---
 📞 Discussion Forum

[![Discussion Forum](https://img.shields.io/badge/Discussion-Join%20Us-blue?style=for-the-badge)](YOUR_FORUM_LINK)

QR Code for Mobile Access:

![Discussion QR Code](docs/images/discussion-qr.png)

---

 📊 Project Milestones

# ✅ Release 1 (October 2024)
- Web UI/UX Design
- Authentication & Location Services
- Restaurant & Menu Management
- Cart & Checkout System

# 🚀 Release 2 (November 2024)
- Delivery Partner Portal
- Public Pool Discovery
- Dual-Layer Rewards System
- Gamified Analytics & Eco-Impact

---

 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

All pull requests require:
- Passing CI/CD checks
- Code review approval
- Test coverage for new features

---

 📧 Contact

- GitHub Issues: [Report bugs or request features](https://github.com/srushti3333/SE-Project_g15/issues)
- Discussion Forum: [Join the community](YOUR_FORUM_LINK)
- Email: Contact any team member

---

 🙏 Acknowledgments

Built with ❤️ by Group 15 for Software Engineering Course

Special thanks to our instructors and all contributors!

---

⭐ Star this repo if you find it useful!