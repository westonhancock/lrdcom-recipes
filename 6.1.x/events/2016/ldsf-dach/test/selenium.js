var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('safari')
    .build();

driver.get('http://www.liferay.com/web/events2016/ldsf-dach/recap');
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
//driver.wait(until.titleIs('webdriver - Google Search'), 1000);


var fs = require("fs");

driver.takeScreenshot().then(function(data){
   var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("out.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
});

driver.quit();