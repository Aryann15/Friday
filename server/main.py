from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, request, jsonify
import os


app = Flask(__name__)

CORS (app)


if __name__ == "__main__":
    app.run(debug = True)
