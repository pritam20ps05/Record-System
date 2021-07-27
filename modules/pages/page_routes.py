# this is the page route section
from modules import Blueprint, render_template, request, ObjectId, collection, date

page_routes = Blueprint("page_routes", __name__, static_folder="static", static_url_path="/modules/pages/static", template_folder="templates")

@page_routes.route('/dashboard')
def dashboard():
    page = {
        "title": "Record System",
        "heading": "Search Entries",
        "year": date.today().year
    }
    return render_template("dashboard.html", params=page)

@page_routes.route('/entry', methods=["GET"])
def entry():
    id = request.args.get("id")

    # a basic template
    page = {
        "title": "Record System",
        "heading": "Update Entry",
        "value": {
            "name": "",
            "class": 0,
            "section": "",
            "reg_no": "",
        },
        "months": [["January", "31"], ["February", "28"],
                    ["March", "31"], ["April", "30"],
                    ["May", "31"], ["June", "30"],
                    ["July", "31"], ["August", "31"],
                    ["September", "30"], ["October", "31"],
                    ["November", "30"], ["December", "31"]],
        "year": date.today().year
    }

    # handles leap year
    if (page["year"] % 4) == 0:
        if (page["year"] % 100) == 0:
            if (page["year"] % 400) == 0:
                page["months"][1][1] = "29"
            else:
                page["months"][1][1] = "28"
        else:
            page["months"][1][1] = "29"
    else:
        page["months"][1][1] = "28"

    # handles the data fetching from db process
    if id != None and id != "" and ObjectId.is_valid(id):
        respd = collection.find_one({"_id": ObjectId(id)})
        if respd != None:
            page["value"]["name"] = respd["name"]
            page["value"]["class"] = respd["class"]
            page["value"]["section"] = respd["section"]
            page["value"]["reg_no"] = respd["RegistrationId"]
            page["value"]["PayInfo"] = respd["PayInfo"]
            page["value"]["id"] = id

            # print(str(respd["PayInfo"]))
            for mnt in respd["PayInfo"].keys():
                # print(mnt)
                page["value"]["PayInfo"][mnt] = respd["PayInfo"][mnt]
                if respd["PayInfo"][mnt]["PayDate"] != "":
                    page["value"]["PayInfo"][mnt]["PayDate"] = "-".join([respd["PayInfo"][mnt]["PayDate"][4:8], respd["PayInfo"][mnt]["PayDate"][2:4], respd["PayInfo"][mnt]["PayDate"][0:2]])
        else:
            return "<h1>(404) Specified Entry Was Not Found</h1>", 404
    else:
        return "<h1>Invalid Argument</h1>", 400

    return render_template("entry.html", params=page)

@page_routes.route('/add', methods=["GET"])
def add():
    page = {
        "title": "Record System",
        "heading": "Insert Entry",
        "months": [["January", "31"], ["February", "28"],
                    ["March", "31"], ["April", "30"],
                    ["May", "31"], ["June", "30"],
                    ["July", "31"], ["August", "31"],
                    ["September", "30"], ["October", "31"],
                    ["November", "30"], ["December", "31"]],
        "year": date.today().year
    }

    # handles leap year
    if (page["year"] % 4) == 0:
        if (page["year"] % 100) == 0:
            if (page["year"] % 400) == 0:
                page["months"][1][1] = "29"
            else:
                page["months"][1][1] = "28"
        else:
            page["months"][1][1] = "29"
    else:
        page["months"][1][1] = "28"

    return render_template("add.html", params=page)
