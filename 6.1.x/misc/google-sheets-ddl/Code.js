function fetchDDL() {
   var ss = SpreadsheetApp.getActiveSpreadsheet(); 
   var config = ss.getSheetByName("Configuration"); 
 
   var url = config.getRange("B4:B4").getValue();
   fetchDDLParams("Data", url);
   
}

function fetchDDLParams(datasheetname, url){

   var ss = SpreadsheetApp.getActiveSpreadsheet();  
   var datasheet = ss.getSheetByName(datasheetname); 
   var result = {
     url: url,
     datasheetname: datasheetname
   };
   
   if (datasheet === null) {
     datasheet = ss.insertSheet(datasheetname);
   }
   Logger.log(url);
   
   var response= UrlFetchApp.fetch(url);
   Logger.log(response.getResponseCode());
   
   if(response.getResponseCode() == 200) {
     var content = response.getContentText("UTF-8");
     Logger.log("parsing response");

     var records = JSON.parse(content);
     Logger.log("found " + records.length + " records");
     result.records = records.length;
     
     // do first scan to get all header properties
     var headerPropsObj = {};
     var record;
     for (var i = 0; i < records.length; i++) {
        record = records[i].dynamicElements;
        populateHeader(record, headerPropsObj);
     }
     var headerProps = createHeader(datasheet, headerPropsObj);
     
     for (i = 0; i < records.length; i++) {
          record = records[i].dynamicElements;
         addRow(datasheet, headerProps, record, i);
    }
    // do a little formatting
    datasheet.setFrozenRows(1);
    
    for (var j = 1; j < headerProps.length+1; j++){
      datasheet.autoResizeColumn(j);
     }
  } else {
    new Error("Response code: " + response.getResponseCode() + " while trying to access url: " + url);
   }

  return result;
}

function addRow(sheet, props, record, rowno) {
  var rowData =[[]];
  for (var i = 0; i < props.length; i++) {
    var myvalue  = record[props[i]];
    rowData[0].push(myvalue);
  }
  sheet.appendRow(rowData[0]);
}

function populateHeader( record, header) {
  if (header === null) { header = {}; }
  for (var property in record) {
        if (record.hasOwnProperty(property)) {
          header[property] = true;
        }
   }  
  return header;
}

function createHeader(sheet, headerPropsObj) {
  
  sheet.clearContents();
   
  var props = [[]];
  
  for (var property in headerPropsObj) {
        if (headerPropsObj.hasOwnProperty(property)) {
          Logger.log( "found property: " + property);
          props[0].push(property);
        }
   }  
  sheet.appendRow(props[0]);
  return props[0];
}


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
  
  addDDLRecordsParams(server, groupid, recordsetid, displayindex, datasheet, auth, userid);
}


function addDDLRecordsParams(server, groupId, recordSetId, displayIndex, datasheet, auth, userid) {
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




