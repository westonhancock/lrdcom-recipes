  function fetchDDL() {
    var ss = SpreadsheetApp.getActiveSpreadsheet(); 
    var config = ss.getSheetByName("Configuration"); 
  
    var url = config.getRange("B4:B4").getValue();
    fetchDDLParams("Data", url);
    
  }

  function fetchDDLParamsByRecordsetId(datasheetname, server, recordset){
    var skinny = "/api/jsonws/skinny-web.skinny/get-skinny-ddl-records/ddl-record-set-id/";
    var url = server + skinny + recordset;
    fetchDDLParams(datasheetname, url);
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
      Logger.log("content: " + content);
      var records = JSON.parse(content);
      Logger.log("found " + records.length + " records");
      result.records = records.length;
      
      if (records.length === 0) {
        return result;
      }
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
          addRow(datasheet, headerProps, record);
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

  function addRow(sheet, props, record) {
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
