from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, request, jsonify
import os


app = Flask(__name__)
CORS (app)


@app.route("/messages", methods=["POST"])
def handle_messages ():
    load_dotenv()
    texts = request.form["text"]
    name = request.form["name"]
    topic = request.form["topic"]

    if name and texts :
        print(name)
        print(topic)
        print(texts[:300])

    


if __name__ == "__main__":
    app.run(debug = True)
