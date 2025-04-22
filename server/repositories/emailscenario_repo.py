from server.models.db_config import ph_session
from server.models.emailscenario_model import EmailScenario
import random
from typing import Optional
import textwrap


class EmailScenarioRepo:
    def __init__(self):
        self.db = ph_session

    def format_scenarios(self, scenarios: list) -> str:
        """Formats a list of EmailScenario objects into a readable string."""
        return "\n".join(str(scenario) for scenario in scenarios)


    def get_all_email_scenarios(self):
        all_scenarios = self.db.query(EmailScenario).all()
        return self.format_scenarios(all_scenarios)

    def get_by_id(self, email_id: str) -> Optional[EmailScenario]:
        if email_id:
            return self.db.query(EmailScenario).filter(EmailScenario.id == email_id).first()

    def get_by_phishing_status(self, phishing_stat : int = None) -> list:
        if phishing_stat is not None:
            found_scenarios = self.db.query(EmailScenario).filter(EmailScenario.is_phishing == phishing_stat).all()
            return self.format_scenarios(found_scenarios)

    def get_randomized_emails_by_phishing_stat(self, count: int = 10 ):
        phished_emails = self.db.query(EmailScenario).filter(EmailScenario.is_phishing == 1).all()
        legit_emails = self.db.query(EmailScenario).filter(
            EmailScenario.is_phishing == 0).all()
        mixed_scenarios = phished_emails + legit_emails
        random.shuffle(mixed_scenarios)
        limited_emails = mixed_scenarios[:count]
        return self.format_scenarios(limited_emails)
