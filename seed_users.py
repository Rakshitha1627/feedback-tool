from database import SessionLocal, init_db
from models import User, RoleEnum
from auth import hash_password

db = SessionLocal()
init_db()

manager = User(
    name="Rakshitha M",
    email="manager@example.com",
    password=hash_password("manager"),
    role=RoleEnum.manager
)
employee = User(
    name="Riya E",
    email="employee@example.com",
    password=hash_password("employee"),
    role=RoleEnum.employee
)

db.add_all([manager, employee])
db.commit()
print(" Dummy users added!")
db.close()
