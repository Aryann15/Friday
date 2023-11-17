from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, request, jsonify
import os
from langchain.llms import OpenAI
from langchain import PromptTemplate
from langchain.document_loaders import PyPDFLoader
from werkzeug.utils import secure_filename

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

Given the previous exchange: {text}

"""
        openai = OpenAI(model_name="gpt-3.5-turbo-1106", openai_api_key=openai_api_key)
        prompt_template = PromptTemplate(
            input_variables=["text", "name", "topic"], template=template
        )
        result = openai(prompt_template.format(text=texts, name=name, topic=topic))
        print (prompt_template.format(text=texts, name=name, topic=topic))
        return result
    else:
        return "error"

@app.route("/coverLetter", methods=["POST"])
def handle_letter ():
    load_dotenv()
    openai_api_key = os.environ.get("OPENAI_API_KEY")
    user_resume = request.files["resume"]
    job_details = request.form["job_details"]

    if user_resume and job_details:
        print(f"Resume File Name: {user_resume.filename}")
        print(f"User Question: {job_details}")
        resume_filename = secure_filename(user_resume.filename)
        user_resume.save(resume_filename)

        resume_path = f"./{resume_filename}"
        loader = PyPDFLoader(resume_path)
        content = loader.load_and_split()
        print(content)

        template = """"
        """
        openai = OpenAI(model_name="gpt-3.5-turbo-1106", openai_api_key=openai_api_key)
        prompt_template = PromptTemplate(
            input_variables=["job_details","resume_content"], template=template
        )


    return job_details
if __name__ == "__main__":
    app.run(debug=True)
