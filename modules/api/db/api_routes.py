# this is the api routing section
from modules import Blueprint, collection, cross_origin, request, dumps, ObjectId
from modules.api.db.search import Search

search_api = Search()
api_routes = Blueprint("api_routes", __name__)

@api_routes.route('/search', methods=['POST'])
@cross_origin()
def search():
    reqd = request.get_json()
    print(reqd)

    dict_list = list(collection.find(search_api.formatReq(reqd)).sort("name"))
    return dumps(search_api.formatResp(dict_list, reqd))

@api_routes.route('/update', methods=['POST'])
@cross_origin()
def update():
    reqd = request.get_json()
    reqd["data"]["name"] = reqd["data"]["name"].title()
    reqd["data"]["RegistrationId"] = reqd["data"]["RegistrationId"].upper()

    if reqd["id"] != None and reqd["id"] != "" and ObjectId.is_valid(reqd["id"]):
        result = collection.update({"_id": ObjectId(reqd["id"])}, {"$set": reqd["data"]}, multi=False)
        resp = {
            "status": 200,
            "msg": "Data was successfully writen",
            "Proces": {
                "n": result["n"],
                "nModified": result["nModified"],
                "ok": result["ok"]
            }
        }
    else:
        return 400
    return dumps(resp)

@api_routes.route('/delete', methods=['POST'])
@cross_origin()
def delete():
    reqd = request.get_json()
    # print(reqd)

    collection.delete_one({"_id": ObjectId(reqd["id"])})
    resp = {
        "status": 200,
        "msg": "Data was successfully deleted"
    }

    return dumps(resp)

@api_routes.route('/insert', methods=['POST'])
@cross_origin()
def insert():
    reqd = request.get_json()
    reqd["name"] = reqd["name"].title()
    reqd["RegistrationId"] = reqd["RegistrationId"].upper()

    result = collection.insert_one(reqd)
    resp = {
        "status": 200,
        "msg": "Data was successfully inserted",
        "id": str(result.inserted_id)
    }

    return dumps(resp)

# flask route should be replaced to blueprints
