import requests

headers = {
  "Authorization": "Bearer <your API key>",
  "Notion-Version": "2022-02-22"
}

response = requests.get("https://api.notion.com/v1/databases", headers=headers)
databases = response.json()

# Get first database ID 
database_id = databases[0]["id"]

print(database_id) 