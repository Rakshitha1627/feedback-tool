from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import login_router
from routes import manager, employee

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(manager.manager_router, prefix="/api/manager", tags=["Manager"])
app.include_router(employee.employee_router, prefix="/api/employee", tags=["Employee"])
