#pin JSON to IPFS
import requests

def pinJSON(json_content, name, contract_addr):

    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

    payload = {
        "pinataContent": json_content, #the content of JSON object produced by frontend will be stored here
        "pinataOptions": { "cidVersion": 1 }, #(optional) set the CID version of the uploading object to 1 by default
        "pinataMetadata": { "name": name, "keyvalues": {"contract address": contract_addr} } #(optional) metadata of the uploading object, can be used to query pinned files
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyM2IyMWI5YS0wM2JhLTQ3YzItOGVjNC0zOWE0Y2RmNTlhZGUiLCJlbWFpbCI6ImRhaXJ1aXo1MDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjEwNzY0ZDY0NjI3YTg5MjNiMWYxIiwic2NvcGVkS2V5U2VjcmV0IjoiMjRlNTUwNDRmMGE3YjU4ZTUxMzBhYTFkMDgwMjQzZTc3NDE3NGY2NTdkYjFkYWY1ZDQ5ZGY1OTQzNDc5MjZjNCIsImlhdCI6MTcwMTY4MDc2M30.njdOPsvOzyKTKv4RzfQIKk-9iQMvEsfax0JunMFdiBk"
    }

    response = requests.post(url, json=payload, headers=headers)

    print(response.text)

json_content = {"PASTE_YOUR_CONTENT"}
name = "File Name"
contract_addr = "contract address"

pinJSON(json_content, name, contract_addr)
