import os
from dotenv import load_dotenv
import requests
import json

content_gpt ="""
Certainly, I can explain TRPC (Transient Receptor Potential Canonical) channels in simple words within 30 minutes. TRPC channels are a family of proteins found in our cells that play a crucial role in various bodily functions. To make it easier to understand, let's break this down step by step:

"""

load_dotenv()
NOTION_KEY = os.environ.get("NOTION_API")
headers = {'Authorization': f"Bearer {NOTION_KEY}", 
           'Content-Type': 'application/json', 
           'Notion-Version': '2022-06-28'}

search_params = {"filter": {"value": "page", "property": "object"}}
search_response = requests.post(
    f'https://api.notion.com/v1/search', 
    json=search_params, headers=headers)


search_results = search_response.json()["results"]
page_id = search_results[0]["id"]

create_page_body = {
    "parent": { "page_id": page_id },
    "properties": {
        "title": {
      "title": [{ 
          "type": "text", 
          "text": { "content": "explain trpc to me in 30 minutes in simple words" } }]
        }
    },
    "children": [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{ 
            "type": "text", 
            "text": { 
                "content": content_gpt 
            } 
        }]
      }
    }
  ]
}

create_response = requests.post(
     "https://api.notion.com/v1/pages", 
     json=create_page_body, headers=headers)
print(create_response.json())