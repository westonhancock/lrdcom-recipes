// TODO: other way to deal with scope in google app script?


// Get config information by pulling values from named ranges
function setupConfig() {
    var configObject = {};
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Configuration");
    
    
    var range = ss.getDataRange();
 var values = range.getValues();
 
 // This logs the spreadsheet in CSV format with a trailing comma
 for (var i = 1; i < values.length; i++) {
   if (values[i][0] && values[i][1]) {
             Logger.log("found config property: value: " + values[i][0] + ": " + values[i][1]);
  
       configObject[values[i][0]] = values[i][1];
   }
  
 }
  return configObject;  
 }


function fetchExistingData() {
    var configObject = setupConfig();
    ["CFP"].forEach(function (value) {

        if (configObject && configObject[value]) {

            var recordsetId = configObject[value];
            Logger.log("trying to fetch " + value + " with record set id " + recordsetId);
            fetchDDLParamsByRecordsetId(value, configObject.server, recordsetId);

        }

    });
    funkyImages(configObject);
}


function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Liferay')
        .addItem('Fetch Data', 'fetchExistingData')
    
        .addToUi();
}


function funkyImages(configObject) {


    var ss = SpreadsheetApp.getActiveSpreadsheet(); 
    var cfp = ss.getSheetByName("CFP"); 
    
    var range = cfp.getDataRange();
    var values = range.getValues();
 
 var headshotcol = null;
 if (values.length >= 1) {

     for (var col = 0; col < values[0].length; col++) {
         if (values[0][col] == "headshot") {
            headshotcol = col;
            Logger.log("found headshot col" + headshotcol);
         }
     }
 }
if (headshotcol) {
 for (var row = 1; row < values.length; row++) {
         var docmedia = values[row][headshotcol];
          
         Logger.log("found docmedia" + docmedia);
         var headshotObj = JSON.parse(docmedia);
         var headshoturl = 
         configObject.server + "/documents/ddm/com.liferay.portlet.dynamicdatalists.model.DDLRecord/" + headshotObj.classPK + "/headshot";
         Logger.log("found url" + headshoturl);
         //values[row][headshotcol] = "=IMAGE(\"" + headshoturl + "\")";
         cfp.getRange(row+1, headshotcol+1).setValue("=IMAGE(\"" + headshoturl + "\")");

     }

}

 cfp.autoResizeColumn(headshotcol);    
    //https://web.liferay.com/documents/ddm/com.liferay.portlet.dynamicdatalists.model.DDLRecord/75294881/headshot

    //https://web.liferay.com/documents/ddm/com.liferay.portlet.dynamicdatalists.model.DDLRecord/75294174/headshot
}
