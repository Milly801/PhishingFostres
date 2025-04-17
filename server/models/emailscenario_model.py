from models.base import Base
from models.utils import get_uuid
from sqlalchemy import Column,Text, String, Integer, DateTime, func


class EmailScenario(Base):
    __tablename__ = "email_scenarios"

    id = Column(String, primary_key=True, default=get_uuid)
    sender_email = Column(Text, nullable=False)
    sender_name = Column(Text, nullable=False)
    subject = Column(Text)
    receiver_email = Column(Text, nullable=False)
    body = Column(Text)
    is_phishing =Column(Integer, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.id:  # Ensure id is generated if not provided
            self.id = get_uuid()
