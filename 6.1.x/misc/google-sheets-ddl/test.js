

function addDDLRecords() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  
  var config = ss.getSheetByName("Configuration"); 
  var datasheet = ss.getSheetByName("Data"); 
  var server = config.getRange("B13:B13").getValue();
  var groupid = config.getRange("B10:B10").getValue();
  var recordsetid = config.getRange("B11:B11").getValue();
  var displayindex = config.getRange("B12:B12").getValue();
  var auth = config.getRange("B14:B14").getValue();
  var userid = config.getRange("B9:B9").getValue();
  
  addDDLRecordsParams(server, groupid, recordsetid, displayindex, datasheet, base64auth, userid);
}


function addDDLRecordsParams(server, groupId, recordSetId, displayIndex, datasheet, base64auth, userid) {
  Logger.log("server: " + server);
  Logger.log("groupid: " + groupId);
  Logger.log("recordsetid: " + recordSetId);
  Logger.log("displayindex: " + displayIndex);
  
  var range = datasheet.getDataRange();
  
  var values = range.getValues();
  
  if (values.length <= 1) return;
  
    addDDLRow(values[0], values[1]);
  //   for (var i = 1; i < values.length; i++) {
  // 
  // }
  
  
  function addDDLRow(header, row) {
  
  var invokeURL = "/api/jsonws/invoke?cmd=";
    var cmdArray = [];
 
   var fieldMap = {};
   for (var j = 0; j < header.length; j++) {
     Logger.log("column: " + header[j] + " value: " + row[j]);
     if (header[j] != "uuid")
     fieldMap[header[j]] =row[j];
   }
   
     var record = { "groupId": groupId, 
      "recordSetId": recordSetId,
      "displayIndex": displayIndex,
      "serviceContext.userId": userid,
     "fieldsMap": fieldMap
   };
   cmdArray.push({ "/ddlrecord/add-record" : record});
    
   
  var auth =  Utilities.base64Encode("test@liferay.com" + ':' + "test");
  var headers = {
    "Authorization" : "Basic " + auth
  };

  var params = {
    "method":"GET",
    "headers":headers
  };
  
var url = server + invokeURL + encodeURIComponent(JSON.stringify(cmdArray));

//var url = server + invokeURL + encodeURIComponent(JSON.stringify(cmdArray)) + "&p_auth=" + auth;
//var url = server + invokeURL + JSON.stringify(cmdArray) + "&p_auth=" + auth;
var url = "https://web.liferay.com/api/secure/jsonws/portal/get-build-number";
var url = server + "/api/secure/jsonws/ddlrecord/add-record?";

for (var property in record) {
    if (record.hasOwnProperty(property)) {
   
        url += property + "=" + encodeURIComponent(JSON.stringify(record[property])) + "&";
    }
}
url = url.substring(0, url.length - 1);
Logger.log("url: " + url);
 //  var response= UrlFetchApp.fetch(url);
   var response= UrlFetchApp.fetch(url, params);
   Logger.log(response);
}
}




