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
    ["events"].forEach(function (value) {

        if (configObject && configObject[value]) {

            var recordsetId = configObject[value];
            Logger.log("trying to fetch " + value + " with record set id " + recordsetId);
            fetchDDLParamsByRecordsetId(value, configObject.server, recordsetId);

        }

    });
}


function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Liferay')
        .addItem('Add Events', 'addEvents')
    
        .addItem('Fetch Data', 'fetchExistingData')
    
        .addToUi();
}

function addEvents() {
      var configObject = setupConfig();
      addRecords("events");
}



function addRecords(record_type) {
    var configObject = setupConfig();
    addDDLRecordsParams(configObject.server, configObject.groupid,
        configObject[record_type],
        configObject.displayindex,
        "maintain_" + record_type,
        configObject.authorization,
        configObject.userid);
} 
