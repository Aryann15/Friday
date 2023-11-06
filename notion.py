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
