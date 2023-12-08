import argparse 
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()
jwt_key = os.getenv("JWT")

parser = argparse.ArgumentParser(description='Run Database Operations')

parser.add_argument("--method", choices=['create','read','update','delete'],help='specify the database operation')
parser.add_argument('--jwt', default=jwt_key, help='JWT secret key')

#parser for pin operation
parser.add_argument("--filepath", help='add file path')
parser.add_argument('--name', help='add custom Filename')
parser.add_argument('--contract', help='add contract address')
parser.add_argument('--user', help="add user address")
parser.add_argument('--time', help='add timestamp')

#parser for delete operation
parser.add_argument('--cid', help='add cid')

#parser for list operation
parser.add_argument('--query', help='add query parameters')

args = parser.parse_args()
jwt_key = args.jwt

#Database operations

#create
def pinJSON():
    url = url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

    with open(file_path, "r") as file:
        json_content = file.read()
    payload = {
        "pinataContent": json.loads(json_content), 
        "pinataOptions": { "cidVersion": 1 }, #(optional) set the CID version of the uploading object to 1 by default
        "pinataMetadata":{
            "name": name,
            "keyvalues":{
            "contract address": contract_addr,
            "user address": user_addr,
            "burn timestamp": timestamp
            }
            }
        
        
    }
    headers = {
        "accept": "application/json",
        "authorization": jwt_key
    }

    response = requests.post(url, json=payload, headers=headers)

    print(response.text)

#delete
def delete():

    url = "https://api.pinata.cloud/pinning/unpin/" + CID

    headers = {
        "accept": "application/json",
        "authorization": jwt_key
    }

    response = requests.delete(url, headers=headers)

    print(response.text)

#read
def listFiles():
    url = "https://api.pinata.cloud/data/pinList" + query_params

    #for example: ?metadata[keyvalues]={"time":{"value":"2018-01-01 00:00:00.000+00","secondValue":"2018-02-01 00:00:00.000+00","op":"between"}}
    #for all query_params see: https://docs.pinata.cloud/reference/get_data-pinlist

    headers = {
        "accept": "application/json",
        "authorization": jwt_key
    }

    response = requests.get(url, headers=headers)

    print(response.text)

#update
def updateMetadata():

    url = "https://api.pinata.cloud/pinning/hashMetadata"

    payload = {
        "ipfsPinHash": CID,
        "name": name,
        "keyvalues": {
            "contract address": contract_addr,
            "user address": user_addr,
            "burn timestamp": timestamp} 
        }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": jwt_key
    }

    response = requests.put(url, json=payload, headers=headers)

    print(response.text)


file_path = args.filepath
name = args.name
contract_addr = args.contract
user_addr = args.user
timestamp = args.time
CID = args.cid
query_params = args.query


#define a dictionary mapping method names to functions
method_functions = {
    'create' : pinJSON,
    'read' : listFiles,
    'update' : updateMetadata,
    'delete' : delete
}


selected_function = method_functions.get(args.method)

if selected_function:
    selected_function()
else:
    print(f"Unsupported method: {args.method}")