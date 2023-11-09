import os
import json
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain.agents import initialize_agent,Tool
from langchain.agents import AgentType
from langchain.chat_models import ChatOpenAI

import requests

load_dotenv()
browserless_api_key = os.getenv("BROWSERLESS_API_KEY")
serper_api_key = os.getenv("SERP_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")


def search(query):
    url = "https://google.serper.dev/search"

    payload = json.dumps({
        "q": query
    })

    headers = {

        'X-API-KEY': serper_api_key,
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text


def scrape_website():
    headers= {
        'Cache-Control' : 'no-cache',
        'Content-Type': 'application.json'
    }


result = search("Hashnode")
print(result)
