# seed.py
from database import init_db, SessionLocal
from models import User, RoleEnum
from auth import hash_password

db = SessionLocal()
init_db()

# Check if users exist
existing = db.query(User).filter(User.email == "manager@example.com").first()
if not existing:
    manager = User(
        name="Manager User",
        email="manager@example.com",
        password=hash_password("manager"),
        role=RoleEnum.manager
    )
    employee = User(
        name="Employee User",
        email="employee@example.com",
        password=hash_password("employee"),
        role=RoleEnum.employee
    )
    db.add_all([manager, employee])
    db.commit()
    print("✅ Users created successfully")
else:
    print("⚠️ Users already exist. Skipping insert.")

db.close()
