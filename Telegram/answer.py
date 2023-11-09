import os
import json
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain.agents import initialize_agent,Tool
from langchain.agents import AgentType
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from bs4 import BeautifulSoup
from typing import Type
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
    text_splitter = RecursiveCharacterTextSplitter(separators=["\n\n", "\n"], chunk_size = 4000 , chunk_overlap = 200)
    docs = text_splitter.create_documents([content])
    map_prompt ="""
Write a summary of the following text for {objective}:
"{text}"
SUMMARY:
"""

    map_prompt_template = PromptTemplate (template = map_prompt, input_variables= ["text","objective"])
    summary_chain = load_summarize_chain(
        llm=llm,
        chain_type='map_reduce',
        map_prompt=map_prompt_template,
        combine_prompt=map_prompt_template,
        verbose=True
    )

    output = summary_chain.run(input_documents=docs, objective=objective)

    return output

class ScrapeWebsiteInput(BaseModel):
    """Inputs for scrape_website"""
    objective: str = Field(
        description="The objective & task that users give to the agent")
    url: str = Field(description="The url of the website to be scraped")


class ScrapeWebsiteTool(BaseTool):
    name = "scrape_website"
    description = "useful when you need to get data from a website url, passing both url and objective to the function; DO NOT make up any url, the url should only be from the search results"
    args_schema: Type[BaseModel] = ScrapeWebsiteInput

    def _run(self, objective: str, url: str):
        return scrape_website(objective, url)

    def _arun(self, url: str):
        raise NotImplementedError("error here")

tools = [
    Tool(
        name="Search",
        func=search,
        description="useful for when you need to answer questions about current events, data. You should ask targeted questions"
    ),
    ScrapeWebsiteTool(),
]
