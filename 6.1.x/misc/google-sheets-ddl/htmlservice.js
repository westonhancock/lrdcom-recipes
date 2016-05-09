function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Liferay')
      .addItem('DDL Fetch Sidebar', 'showDialog')
      .addToUi();
    showDialog();
}

function showDialog() {
  var html = HtmlService.createHtmlOutputFromFile('ddlfetchsidebar')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(400)
      .setHeight(300)
      .setTitle("DDL Fetch Utility");
  SpreadsheetApp.getUi(). // Or DocumentApp or FormApp.
       showSidebar(html);
 }