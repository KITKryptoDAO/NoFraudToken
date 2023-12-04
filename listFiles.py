#query the files on your Pinata account

import requests

def listFiles(query_params):
    url = "https://api.pinata.cloud/data/pinList?" + query_params

    #for example: ?metadata[keyvalues]={"time":{"value":"2018-01-01 00:00:00.000+00","secondValue":"2018-02-01 00:00:00.000+00","op":"between"}}
    #for all query_params see: https://docs.pinata.cloud/reference/get_data-pinlist

    headers = {
        "accept": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyM2IyMWI5YS0wM2JhLTQ3YzItOGVjNC0zOWE0Y2RmNTlhZGUiLCJlbWFpbCI6ImRhaXJ1aXo1MDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjEwNzY0ZDY0NjI3YTg5MjNiMWYxIiwic2NvcGVkS2V5U2VjcmV0IjoiMjRlNTUwNDRmMGE3YjU4ZTUxMzBhYTFkMDgwMjQzZTc3NDE3NGY2NTdkYjFkYWY1ZDQ5ZGY1OTQzNDc5MjZjNCIsImlhdCI6MTcwMTY4MDc2M30.njdOPsvOzyKTKv4RzfQIKk-9iQMvEsfax0JunMFdiBk"
    }

    response = requests.get(url, headers=headers)

    print(response.text)

query_params = "SET YOUR QUERY PARAMS"

listFiles(query_params)