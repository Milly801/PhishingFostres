from server.models.db_config import ph_session
from server.models.emailscenario_model import EmailScenario
from typing import Optional
import textwrap
from sqlalchemy import func
import time
from contextlib import contextmanager
from functools import lru_cache
from datetime import datetime, timedelta


class EmailScenarioRepo:
    def __init__(self):
        self.db = ph_session
        self._cache_timeout = timedelta(minutes=5)
        self._last_cache_reset = datetime.now()

    @contextmanager
    def query_performance(self, operation_name: str):
        """Monitor query performance"""
        start = time.time()
        try:
            yield
        finally:
            duration = time.time() - start
            print(f"Operation '{operation_name}' took {duration:.2f} seconds")

    def format_scenarios(self, scenarios):
        """Format a list of scenarios into clean JSON"""
        return [scenario.to_dict() for scenario in scenarios]

    def _should_reset_cache(self) -> bool:
        """Check if cache should be reset based on timeout"""
        return datetime.now() - self._last_cache_reset > self._cache_timeout

    def reset_cache(self):
        """Manually reset the cache"""
        self.get_randomized_emails_by_phishing_stat.cache_clear()
        self._last_cache_reset = datetime.now()
        print("Cache cleared!")

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

    @lru_cache(maxsize=32)  # Cache up to 32 different count values
    def get_randomized_emails_by_phishing_stat(self, count: int = 10):
        """Get random emails with caching"""
        with self.query_performance("total_operation"):
            
            if self._should_reset_cache():
                self.reset_cache()
                print("Cache reset due to timeout")

            phish_count = count // 2
            legit_count = count - phish_count

            with self.query_performance("fetch_phishing"):
                phished_emails = (self.db.query(EmailScenario)
                              .filter(EmailScenario.is_phishing == 1)
                              .order_by(func.random())
                              .limit(phish_count)
                              .all())

            with self.query_performance("fetch_legitimate"):
                legit_emails = (self.db.query(EmailScenario)
                            .filter(EmailScenario.is_phishing == 0)
                            .order_by(func.random())
                            .limit(legit_count)
                            .all())

            with self.query_performance("format_results"):
                formatted_results = self.format_scenarios(phished_emails + legit_emails)

            return formatted_results