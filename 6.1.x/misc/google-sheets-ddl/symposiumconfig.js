// TODO: other way to deal with scope in google app script?


// Get config information by pulling values from named ranges
function setupConfig() {
    var configObject = {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var configarray = ss.getNamedRanges();
    configarray.forEach(function (value) {
        var propertyname = value.getName();

        var propertyvalue = value.getRange().getValue();
        configObject[propertyname] = propertyvalue;
        Logger.log("found config property: value: " + propertyname + ": " + propertyvalue);
    });
    return configObject;
}


function fetchExistingData() {
    var configObject = setupConfig();
    ["speakers", "speakerslastyear", "sponsors", "agenda", "agendalastyear"].forEach(function (value) {

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
        .addItem('Add Speakers', 'addSpeakers')
    
        .addItem('Fetch Data', 'fetchExistingData')
        .addItem("Add Sponsors", "addSponsors")
             .addItem("Add Agenda", "addAgenda")
        .addToUi();
}

function addAgenda() {
      var configObject = setupConfig();
      addRecords("agenda");
}

function addSpeakers() {
      var configObject = setupConfig();
      addRecords("speakers");
}

function addSponsors() {
      var configObject = setupConfig();
      addRecords("sponsors");
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
