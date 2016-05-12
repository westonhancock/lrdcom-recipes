//TODO: handling for dates? how to know what are dates?...

function addDDLRecordsParams(server, groupId, recordSetId, displayIndex, datasheetname, base64auth, userid) {
    Logger.log("server: " + server);
    Logger.log("groupid: " + groupId);
    Logger.log("recordsetid: " + recordSetId);
    Logger.log("displayindex: " + displayIndex);


    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var datasheet = ss.getSheetByName(datasheetname);
    var range = datasheet.getDataRange();

    var values = range.getValues();

    if (values.length <= 1) return;

    for (var i = 1; i < values.length; i++) {
        addDDLRow(values[0], values[i]);
    }


    function addDDLRow(header, row) {
        
      
        
        var fieldMap = {};
        for (var j = 0; j < header.length; j++) {
            Logger.log("column: " + header[j] + " value: " + row[j]);

            if (header[j] != "uuid") {
                //var columnValue = row[j];
                

                fieldMap[header[j]] = row[j];
            }
        }

        var record = {
            "groupId": groupId,
            "recordSetId": recordSetId,
            "displayIndex": displayIndex,
            "serviceContext.userId": userid,
            "fieldsMap": fieldMap
        };

        var headers = {
            "Authorization": "Basic " + base64auth
        };

        var params = {
            "method": "GET",
            "headers": headers
        };

        var url = server + "/api/secure/jsonws/ddlrecord/add-record?";

        var toJSON = Date.prototype.toJSON;
        // Dates are converted to strings with toISOString by stringify. we want the primitive value though
        Date.prototype.toJSON = function()
        {
            return this.valueOf();
        };


        for (var property in record) {
            if (record.hasOwnProperty(property)) {

                url += property + "=" + encodeURIComponent(JSON.stringify(record[property])) + "&";
            }
        }
        Logger.log(JSON.stringify(new Date()));
       Date.prototype.toJSON = toJSON;
        Logger.log(JSON.stringify(new Date()));
        
        url = url.substring(0, url.length - 1);
        Logger.log("url: " + url);

        var response = UrlFetchApp.fetch(url, params);


        Logger.log(response);
        // capture record id so we can update in the future
        var responseObj = JSON.parse(response);

        Logger.log("recordId: " + responseObj.recordId.toFixed() || " no record id found");
    }
}
