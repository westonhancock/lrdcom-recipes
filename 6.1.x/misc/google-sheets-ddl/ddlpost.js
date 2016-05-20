// Handle timestamps as well as dates? right now we are stripping times...
// can ddls have timestamps?
// blank dates cause major chaos in start_date end_Date fields...what should value be?!!!

// what is the logic to POST stringify stuff?  very sensitive...
// handle exceptions {"exception":"com.liferay.portlet.dynamicdatamapping.StorageFieldRequiredException"}

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
    
    var header = values[0];
    var recordIdIndex = -1;
    for (var j = 0; j < header.length; j++) {
        if (header[j] == "recordId") { recordIdIndex = j;}
    }
    // TODO: add recordId if not found...
    Logger.log("Record Id Index: " + recordIdIndex);

    for (var i = 1; i < values.length; i++) {
        var thisRecordId = values[i][recordIdIndex];
        Logger.log("Record id: " + thisRecordId);
        if (recordIdIndex != -1 && !thisRecordId) {
            var result = addDDLRow(header, values[i], "ADD");
            if (result && result.recordId && result.recordId !== 0) {
                var updateRange = datasheet.getRange(i+1, recordIdIndex+1);
                updateRange.setValue(result.recordId);
            }
        } else if (thisRecordId) {
            addDDLRow(header, values[i], "EDIT", thisRecordId);
            
        }
    }


    function addDDLRow(header, row, mode, recordId) {
        
        var result = {  recordId: 0};
        
        
        var fieldMap = {};
        for (var j = 0; j < header.length; j++) {
            Logger.log("column: " + header[j] + " value: " + row[j]);
            if (header[j] != "uuid" && header[j] != "recordId") {
                var columnValue = row[j];
                // google apps scripts uses local time zone which can shift dates
                // since we just want date (no time) we create a new date from UTC              
              
                if (columnValue instanceof Date) {
                    Logger.log(header[j] + " (before): " + columnValue.valueOf());
                    if (columnValue < 0) {
                     // time value somehow set to 12/30/1899, just grab time
                         columnValue = columnValue.getHours() + ":" + ((columnValue.getMinutes() < 10) ? "0" + columnValue.getMinutes() : columnValue.getMinutes());   
                    } else {
                        columnValue = new Date(Date.UTC(columnValue.getYear(), columnValue.getMonth(), columnValue.getDate()));
                    }
                    Logger.log(header[j] + " (before): " + columnValue.valueOf());
                    columnValue = columnValue.valueOf();
                }
                fieldMap[header[j]] = JSON.stringify(columnValue);
                
            }
        }

        var record = {
            "groupId":   ""+groupId,
            "displayIndex":  ""+displayIndex,
            "serviceContext.userId":  ""+userid,
            "fieldsMap": fieldMap
        };
        
        if(mode == "ADD") {
            record.recordSetId =  ""+recordSetId;
        } else {
            record.recordId = ""+recordId;
            record.mergeFields = true;
            
        }
        

        var headers = {
            "Authorization": "Basic " + base64auth
        };


    
        var params = {
            "method": "POST",
            "headers": headers,
            "payload": record
        };
        

     

        var url = server +  ((mode == "ADD") ? "/api/secure/jsonws/ddlrecord/add-record" : "/api/secure/jsonws/ddlrecord/update-record");
        
 
        Logger.log("url: " + url);

        var response = UrlFetchApp.fetch(url, params);


        Logger.log(response);
        // capture record id so we can update in the future
        var responseObj = JSON.parse(response);

        Logger.log("recordId: " + responseObj.recordId.toFixed() || " no record id found");
        result.recordId = responseObj.recordId;
        return result;
        
    }
}
