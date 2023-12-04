#Delete a file by CID
import requests

def delete(CID):

    url = "https://api.pinata.cloud/pinning/unpin/" + CID

    headers = {
        "accept": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyM2IyMWI5YS0wM2JhLTQ3YzItOGVjNC0zOWE0Y2RmNTlhZGUiLCJlbWFpbCI6ImRhaXJ1aXo1MDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjEwNzY0ZDY0NjI3YTg5MjNiMWYxIiwic2NvcGVkS2V5U2VjcmV0IjoiMjRlNTUwNDRmMGE3YjU4ZTUxMzBhYTFkMDgwMjQzZTc3NDE3NGY2NTdkYjFkYWY1ZDQ5ZGY1OTQzNDc5MjZjNCIsImlhdCI6MTcwMTY4MDc2M30.njdOPsvOzyKTKv4RzfQIKk-9iQMvEsfax0JunMFdiBk"
    }

    response = requests.delete(url, headers=headers)

    print(response.text)

CID = "PASTE CID HERE"

delete(CID)