import os
from fastapi import Depends, HTTPException, Security
from jose import jwt, JwtError
from dotenv import load_dotenv
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import requests


load_dotenv()
AUTH_DOMAIN = os.getenv("AUTH_DOMAIN")
API_AUDIENCE = os.getenv("API_AUDIENCE")
ALGORITHMS = os.getenv("AUTH_ALGORITHMS, RS256")

security = HTTPBearer()

def get_public_key():
    jwk_url = f"https://{AUTH_DOMAIN}/.well-known/jwks.json"
    response = requests.get(jwk_url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Unable to fetch JWKS")
    return response.json()["keys"]


def verify_jwt(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        jwks = get_public_key()
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")

        if not kid:
            raise HTTPException(
                status_code=401, detail="Invalid token: Missing 'kid' in header")
        matching_key = next(
            (jwk for jwk in jwks["keys"] if jwk["kid"] == kid), None)
        if not matching_key:
            raise HTTPException(
                status_code=401, detail="Invalid token: No matching 'kid' found in JWKS")

        rsa_key = jwt.construct_rsa_key(matching_key)
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH_DOMAIN}/"
        )
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Invalid Token") from e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail="An error occurred during token verification") from e
