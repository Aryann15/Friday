from dotenv import load_dotenv
import os 

load_dotenv()
tg_bot_key = os.getenv("BOT_API")
print (tg_bot_key)