import os
import json
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain.agents import initialize_agent,Tool
from langchain.agents import AgentType
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from bs4 import BeautifulSoup
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


def scrape_website(objective:str , url:str):
    headers= {
        'Cache-Control' : 'no-cache',
        'Content-Type': 'application.json'
    }
    data= {
        "url":url
    }

    data_json = json.dumps(data)


    post_url = f"https://chrome.browserless.io/content?token={browserless_api_key}"

    response = requests.post (post_url , headers= headers , data=data_json)


    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        text = soup.get_text()
        print("CONTENTTTTTT:", text)
        if len(text) > 8000:
            output = summary(objective, text)
            return output
        else:
            return text
    else:
        print(f"HTTP request failed with status code {response.status_code}")


def summary(objective,content):
    llm = ChatOpenAI(temperature=0.4, model= "gpt-3.5-turbo-16k-0613", openai_api_key=openai_api_key)
    text_splitter = RecursiveCharacterTextSplitter(separators=["\n\n", "\n"], chunk_size = 8000 , chunk_overlap = 400)
    docs = text_splitter.create_documents([content])
    map_prompt ="""
Write a summary of the following text for {objective}:
"{text}"
SUMMARY:
"""
result = search("Hashnode")
print(result)
