import os
from dotenv import load_dotenv


load_dotenv()
browserless_api_key = os.getenv("BROWSERLESS_API_KEY")
serper_api_key = os.getenv("SERP_API_KEY")
openai_api_key = os.getenv("OPENAI_API_KEY")

query = "Explain TRPC to me in 30 minutes"
