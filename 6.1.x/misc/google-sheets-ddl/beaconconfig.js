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


function fetchExistingBeaconData() {
    var configObject = setupConfig();
    ["beacon_forms", "beacon_individual_events", "beacon_region_events", "beacon_regions"].forEach(function (value) {

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
        .addItem('Add Beacon Regions', 'addBeaconRegions')
        .addItem('Add Beacon Events', 'addRegionEvents')
        .addItem('Add Beacon Forms', 'addForms')
        .addItem('Add Individual Beacon Events', 'addIndividualEvents')
        .addItem('Fetch Data Beacon Regions', 'fetchExistingBeaconData')
        .addToUi();
}
function addForms() {
      var configObject = setupConfig();
      addRecords("beacon_forms");
}
function addIndividualEvents() {
      var configObject = setupConfig();
      addRecords("beacon_individual_events");
}

function addRegionEvents() {
      var configObject = setupConfig();
      addRecords("beacon_region_events");
}

function addBeaconRegions() {
    var configObject = setupConfig();
    addDDLRecordsParams(configObject.server, configObject.groupid,
        configObject.beacon_regions,
        configObject.displayindex,
        "maintain_beacon_regions",
        configObject.authorization,
        configObject.userid);
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


function getSponsorText () {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var datasheet = ss.getSheetByName("sponsors");
        
        var range = datasheet.getDataRange();

        var values = range.getValues();

        var sponsors = [];
        for (var i = 1; i < values.length; i++) {
            var value = values[i][0];
            value && sponsors.push(value);
        }
        return JSON.stringify(sponsors);
        
}