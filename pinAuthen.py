#Test your API keys and your ability to connect to the Pinata API
import requests

def pinAuthen(JWT):
    url = "https://api.pinata.cloud/data/testAuthentication"

    headers = {
        "accept": "application/json",
        #Authentication the JWT of our API key(secret access token, an encoded mix of secret and public API keys )
        "authorization": "Bearer " + JWT
    }

    response = requests.get(url, headers=headers)

    print(response.text)

JWT = "PASTE_YOUR_JWT"
pinAuthen(JWT)