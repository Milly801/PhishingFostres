import pytest
from sqlalchemy import create_engine
from server.models.db_config import ph_session
from server.models.base import Base
from server.services.user_response_Algorithm import compare_user_response


email_id = "3b715dcf-0699-43c6-8e45-9487f2d17196"  
user_response = "Yes"  


result = compare_user_response(email_id, user_response)
print(result)