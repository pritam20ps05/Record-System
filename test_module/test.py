import random
import string
import os
from datetime import date
from pprint import pprint
from pymongo import MongoClient
import json

with open(os.path.dirname(os.getcwd())+"/credentials.json") as creds:
    credentials = json.load(creds)

db_client = MongoClient(credentials["db"]["uri"])
db = db_client.UserData
collection = db[credentials["db"]["test-col"]]

with open("firstnames.txt", "r") as f:
    names = f.read().split("\n")

with open("lastnames.txt", "r") as f:
    sur_names = f.read().split("\n")

iterations = int(input("Enter no. of documents: "))
sec_list_10 = ["A", "B", "C", "D"]
sec_list_12 = ["SCI", "COM", "HUM"]
mnth_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

for i in range(iterations):
    data = {}
    name = names[random.randint(0, len(names)-1)].lower().title()
    sur_name = sur_names[random.randint(0, len(sur_names)-1)].lower().title()
    dclass = random.randint(8, 12)
    mnts_paid = random.randint(6, 10)

    data["name"] = name + " " + sur_name
    data["class"] = dclass

    if dclass<11:
        data["section"] = sec_list_10[random.randint(0, 3)]
    else:
        data["section"] = sec_list_12[random.randint(0, 2)]

    data["RegistrationId"] = str(random.randint(100, 999)) + random.choice(string.ascii_letters).upper() + random.choice(string.ascii_letters).upper() + str(random.randint(10, 99))
    data["PayInfo"] = {}
    for mnthno in range(mnts_paid):
        data["PayInfo"][mnth_list[mnthno]] = {}
        data["PayInfo"][mnth_list[mnthno]]["Paid"] = True
        daten = random.randint(1, 20)
        if mnthno<9:
            if daten<10:
                data["PayInfo"][mnth_list[mnthno]]["PayDate"] = "0"+str(daten) + "0"+str(mnthno+1) + str(date.today().year)
            else:
                data["PayInfo"][mnth_list[mnthno]]["PayDate"] = str(daten) + "0"+str(mnthno+1) + str(date.today().year)
        else:
            if daten<11:
                data["PayInfo"][mnth_list[mnthno]]["PayDate"] = "0"+str(daten) + str(mnthno+1) + str(date.today().year)
            else:
                data["PayInfo"][mnth_list[mnthno]]["PayDate"] = str(daten) + str(mnthno+1) + str(date.today().year)


    for i in range(12):
        if i>mnts_paid-1:
            data["PayInfo"][mnth_list[i]] = {}
            data["PayInfo"][mnth_list[i]]["Paid"] = False
            data["PayInfo"][mnth_list[i]]["PayDate"] = ""

    collection.insert_one(data)
