from server.models.base import Base
from server.models.utils import get_uuid
from sqlalchemy import Column,Text, String, Integer, DateTime, func, Index
import re


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

    # adding indexing for db queries
    __table_args__ = (
        Index('idx_email_scenarios', 'is_phishing'),
        Index('idx_email_scenarios_phishing_created', 'is_phishing', 'created_at')
    )

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.id:
            self.id = get_uuid()

    def _clean_email_body(self, body: str) -> str:
        """Minimal essential cleaning in backend"""
        if not body:
            return ""

        cleaned = body
        # Handle quoted-printable encoding
        cleaned = re.sub(r'=([0-9A-F]{2})',
                        lambda m: bytes.fromhex(m.group(1)).decode('utf-8', errors='ignore'),
                        cleaned)

        # Remove email footers and system messages
        cleaned = re.sub(r'--\nThis email has passed through.*?--', '', cleaned, flags=re.DOTALL)

        return cleaned.strip()

    def _extract_original_thread(self, body: str) -> str:
        """Extract original message thread if it exists"""
        if not body:
            return ""

        # common thread markers
        markers = [
            r'-----Original Message-----',
            r'On .* wrote:',
            r'>.+' # Quoted text
        ]

        for marker in markers:
            match = re.search(marker, body)
            if match:
                thread_start = match.start()
                return self._clean_email_body(body[thread_start:])

        return ""

    def format_email_parts(self) -> dict:
        """Extract and format different parts of the email"""
        body = self.body or ""

        # original thread
        original_thread = self._extract_original_thread(body)

        # Remove the original thread from main body if it exists
        main_body = body
        if original_thread:
            main_body = body[:body.find(original_thread)].strip()

        # Extract signature (looking for common signature markers)
        signature_match = re.search(r'\n(?:--|__|\+\+)\n.*?(?=\n\n|$)', main_body, re.DOTALL)
        signature = ""
        if signature_match:
            signature = signature_match.group()
            main_body = main_body[:signature_match.start()].strip()

        return {
            "main": self._clean_email_body(main_body),
            "signature": self._clean_email_body(signature),
            "original_thread": original_thread,
            "raw": body
        }

    def to_dict(self):
        """Convert the model to a clean dictionary format"""
        formatted_body = self.format_email_parts()

        return {
            "id": self.id,
            "sender": {
                "email": self.sender_email,
                "name": self.sender_name
            },
            "receiver": {
                "emails": [email.strip() for email in self.receiver_email.split(',')]
            },
            "subject": self.subject,
            "body": formatted_body,
            "is_phishing": bool(self.is_phishing),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    """def __str__(self):
        return (
            f"EmailScenario(id={self.id})\n"
            f"From: {self.sender_name} <{self.sender_email}>\n"
            f"To: {self.receiver_email}\n"
            f"Subject: {self.subject}\n"
            f"Phishing: {'Yes' if self.is_phishing else 'No'}\n"
            f"Body Length: {len(self.body)} chars"
        )
    """

    def __repr__(self):
        """Developer-friendly string representation"""
        return (
            f"EmailScenario("
            f"id='{self.id}', "
            f"sender_email='{self.sender_email}', "
            f"sender_name='{self.sender_name}', "
            f"is_phishing={bool(self.is_phishing)}"
            f")"
        )
