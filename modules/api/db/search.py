# this is the database search query and response formating engine
# from modules import ObjectId

class Search:
    def formatResp(self, resp, qery):
        fres_list = []
        for data in resp:
            fres = {
                "id": str(data["_id"]),
                "name": data["name"],
                "class": data["class"],
                "section": data["section"],
                "reg_no": data["RegistrationId"],
                "paid": "--",
                "date": "--"
            }
            if "date" in qery.keys():
                fres["date"] = "/".join([qery["date"][0:2], qery["date"][2:4], qery["date"][4:8]])
                fres["paid"] = "yes"
            if "month" in qery.keys():
                if data["PayInfo"][qery["month"]]["Paid"]:
                    fres["date"] = "/".join([data["PayInfo"][qery["month"]]["PayDate"][0:2], data["PayInfo"][qery["month"]]["PayDate"][2:4], data["PayInfo"][qery["month"]]["PayDate"][4:8]])
                    fres["paid"] = "yes"
                else:
                    fres["paid"] = "no"

            fres_list.append(fres)
            # pprint(fres)

        return fres_list

    def formatReq(self, req_data):
        query = {}

        # adding name to query
        if 'name' in req_data.keys():
            query['name'] = req_data['name'].title()

        # adding class to query
        if 'class' in req_data.keys():
            query['class'] = req_data['class']

        # adding section to query
        if 'section' in req_data.keys():
            query['section'] = req_data['section']

        # adding reg-no to query
        if 'reg_no' in req_data.keys():
            query['RegistrationId'] = req_data['reg_no'].upper()

        # adding date to query
        if 'date' in req_data.keys():
            mnth_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            mnth = mnth_list[int(req_data['date'][2:4])-1]
            query['PayInfo.'+mnth+'.PayDate'] = req_data['date']

        # adding month to query
        if 'month' in req_data.keys() :
            if 'paid' in req_data.keys():
                query['PayInfo.'+req_data['month']+'.Paid'] = req_data['paid']
            # else:
            #     query['PayInfo.'+req_data['month']+'.Paid'] = True
        print(query)
        return query
