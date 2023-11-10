from dotenv import load_dotenv
import os 
import telebot
import time
from answer import main


load_dotenv()
tg_bot_key = os.getenv("BOT_API")
bot = telebot.TeleBot (tg_bot_key)

@bot.message_handler(['start'])
def start ( message): 
    bot.reply_to(message, "Hello Welcom aboard chief!")
    bot.send_message (message.chat.id, "What can i do for Today !")

@bot.message_handler()
def query (message): 
    query = str(message.text)
    return query

print("done")
bot.polling()
