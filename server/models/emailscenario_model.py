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
        if not self.id:
            self.id = get_uuid()

    def __str__(self):
        formatted_body = "\n    ".join(self.body.splitlines())
        return (
            f"ID={self.id}\n"
            f"Sender Email: {self.sender_email}\n"
            f"Sender Name: {self.sender_name}\n"
            f"Receiver Email: {self.receiver_email}\n "
            f"Subject: {self.subject}\n"
            f"Body: {self.body}\n"
            f"Phishing Status: {self.is_phishing}\n"
        )


    def __repr__(self):
        return (f"<EmailScenario(id={self.id}, sender_email={self.sender_email}, "
                f"receiver_email={self.receiver_email}, subject={self.subject}, "
                f"is_phishing={self.is_phishing}, created_at={self.created_at}, "
                f"updated_at={self.updated_at})>")
