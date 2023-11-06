import os
from dotenv import load_dotenv

load_dotenv()
NOTION_KEY = os.environ.get("NOTION_API")

print(NOTION_KEY)