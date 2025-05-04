from server.models.db_config import ph_session
from server.models.emailscenario_model import EmailScenario

def compare_user_response(email_id:str,user_response : str):
  '''compare user responses with phishing status in the db
    arguments:
    email_id:the id of the email 
    user_response: the response of the user
    '''
  
  email = ph_session.query(EmailScenario).filter_by(id=email_id).first()
  if not email:
        return {"email_id": email_id, "status": "Email not found"}

  
  actual_status = "Yes" if email.is_phishing == 1 else "No"  


  if user_response == "I dont know":
        return {
            "email_id": email_id,
            "user_response": user_response,
            "actual_status": actual_status,
            "is_correct": None,  
            "message": "user response is 'I dont know',"
        }


  is_correct = user_response == actual_status


  return {
        "email_id": email_id,
        "user_response": user_response,
        "actual_status": actual_status,
        "is_correct": is_correct 
    }