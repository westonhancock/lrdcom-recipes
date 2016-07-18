var sizes = [
    { width: 320, height: 640 },
    { width: 375, height: 667 },
    { width: 768, height: 1024 },
    { width: 320, height: 568 },
    { width: 414, height: 736 },
    { width: 375, height: 667 },
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
    { width: 1600, height: 900 },
    { width: 1440, height: 900 },
    { width: 1280, height: 1024 }
];

var url = "http://localhost:3000";
var url = "http://www.liferay.com/solutionsforum-de";


function savePage(size, filename) {
    var page = require('webpage').create();

    page.onResourceError = function (resourceError) {
        console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
        console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    };


    page.viewportSize = { width: size.width, height: size.height };
    page.open(url, function start(status) {
        console.log("opening url for viewport size: " + size.width + " x" + size.height);



        setTimeout(function () {
            page.render(filename);
            console.log("rendering url for viewport size: " + size.width + " x" + size.height);
        }, 10000);

    });
}

for (var i = 0; i < sizes.length; i++) {
    var value = sizes[i];
    //console.log(value.width);
 
    //savePage(value, "test/ldsf-dach-" + value.width + "x" + value.height + ".png");
}

var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

   page.viewportSize = { width: 1920, height: 1080 };
page.open(url, function () {

    //setTimeout(function () {
        page.evaluate(function () {

       //     YUI().use('node', function (Y) {
         //       console.log("yui", Y);

                document.querySelector("#fixedRegisterBtn a").click();
                //var x = Y.one("#fixedRegisterBtn a");
                //console.log(x);
                //x.simulate("click");
                
           // });
        });
        page.render("test/click.png");
        phantom.exit();
    //}, 10000);
    //phantom.exit();
});