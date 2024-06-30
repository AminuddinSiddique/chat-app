import requests
import json

url = "http://localhost:8000/api/auth/signup"

payload = json.dumps({
  "fullname": "john doe",
  "username": "john",
  "password": "john@321",
  "confirmPassword": "john@321",
  "gender": "male"
})
headers = {
  'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjViMDNmM2ZiZDhhMGMyODQyODMwZTkiLCJpYXQiOjE3MTcyNDA4MTksImV4cCI6MTcxODUzNjgxOX0.vO1hwJbORNFfb_scb1E-nHv-cpkRAO4zUqIXFZ1cpVQ',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
