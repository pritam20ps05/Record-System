# this is the main resource management file
from os import getcwd
from urllib import parse
from flask import Flask, request, render_template, Blueprint
from flask_cors import cross_origin
from pymongo import MongoClient
# from pprint import pprint
from bson.json_util import dumps
from bson.objectid import ObjectId
from datetime import date
import json

with open(getcwd()+"/credentials.json") as creds:
    credentials = json.load(creds)

server_instance = Flask(__name__)
db_client = MongoClient(credentials["db"]["uri"])
db = db_client.UserData
collection = db[credentials["db"]["col"]]

# this import is here just to avoid circular import errors
from modules.api.db.api_routes import api_routes as dbroutes
from modules.pages.page_routes import page_routes

server_instance.register_blueprint(page_routes, url_prefix = "/")
server_instance.register_blueprint(dbroutes, url_prefix = "/api")
