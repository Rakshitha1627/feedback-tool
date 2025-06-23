from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

from database import Base

class RoleEnum(str, enum.Enum):
    manager = "manager"
    employee = "employee"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)

    feedback_received = relationship("Feedback", back_populates="employee", foreign_keys='Feedback.employee_id')
    feedback_given = relationship("Feedback", back_populates="manager", foreign_keys='Feedback.manager_id')

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, index=True)
    strengths = Column(Text)
    improvements = Column(Text)
    sentiment = Column(String)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee_id = Column(Integer, ForeignKey("users.id"))
    manager_id = Column(Integer, ForeignKey("users.id"))

    employee = relationship("User", back_populates="feedback_received", foreign_keys=[employee_id])
    manager = relationship("User", back_populates="feedback_given", foreign_keys=[manager_id])
