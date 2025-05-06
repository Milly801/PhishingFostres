from server.models.base import Base
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from server.models.utils import get_uuid

class UserResponse(Base):
    __tablename__ = 'user_responses'

    id = Column(String, primary_key=True, default=get_uuid)
    email_scenario_id = Column(String, ForeignKey('email_scenarios.id'), nullable=False)
    phishing_status = Column(String, nullable=False)
    auth0_id = Column(String, ForeignKey('users.auth0_id'), nullable=False)
    user_response = Column(String, nullable=False)
    result = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    def __repr__(self):
        return (
            f"<UserResponse(id={self.id}, email_scenario_id={self.email_scenario_id}, "
            f"auth0_id={self.auth0_id}, result={self.result})>"
        )

    user = relationship('User', back_populates='responses')