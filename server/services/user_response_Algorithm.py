from server.models.db_config import ph_session
from server.models.emailscenario_model import EmailScenario
from server.models.userResponse_model import UserResponse  # Assuming this model exists or needs to be created

def save_user_response(email_scenario_id: str, phishing_status: str, auth0_id: str, user_response: str, result: str):
    """
    Save the user response against the email scenario in the database.

    Arguments:
    email_scenario_id: The ID of the email scenario.
    phishing_status: The phishing status of the email (e.g., "Yes" or "No").
    auth0_id: The ID of the user.
    user_response: The response provided by the user.
    result: Whether the user passed or failed (e.g., "Passed" or "Failed").
    """

    email = ph_session.query(EmailScenario).filter_by(id=email_scenario_id).first()
    if not email:
        return {"email_scenario_id": email_scenario_id, "status": "Email scenario not found"}


    user_response_entry = UserResponse(
        email_scenario_id=email_scenario_id,
        phishing_status=phishing_status,
        auth0_id=auth0_id,
        user_response=user_response,
        result=result
    )


    ph_session.add(user_response_entry)
    ph_session.commit()
    #print(f"Saved user response: {user_response_entry}")

    return {
        "email_scenario_id": email_scenario_id,
        "auth0_id": auth0_id,
        "status": "Response saved successfully"
    }