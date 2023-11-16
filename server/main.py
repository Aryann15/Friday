from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, request, jsonify
import os
from langchain.llms import OpenAI
from langchain import PromptTemplate


app = Flask(__name__)
CORS(app)


@app.route("/messages", methods=["POST"])
def handle_messages():
    load_dotenv()
    openai_api_key = os.environ.get("OPENAI_API_KEY")
    texts = request.form["text"]
    name = request.form["name"]
    topic = request.form["topic"]

    if name and topic and texts:
        template = """
You are an intelligent and helpful assistant. You speak in a polite, professional and knowledgeable tone from {name}'s point of view. Please view the conversaion from {name}'s point of view and Formulate a succinct yet informative response speaking in the first person and in a polite, professional tone of voice. 

Your role is to formulate an appropriate, informative and courteous response that further adds value to the conversation.

The current conversation is about you "{topic}". Create an insightful reply accordingly

Given the previous exchange: {texts}

"""
        openai = OpenAI(model_name="gpt-3.5-turbo-1106", openai_api_key=openai_api_key)
        openai.temperature = 0.8
        prompt_template = PromptTemplate(
            input_variables=["text", "name", "topic"], template=template
        )
        result = openai(prompt_template.format(text=texts, name=name, topic=topic))

        return result


if __name__ == "__main__":
    app.run(debug=True)
