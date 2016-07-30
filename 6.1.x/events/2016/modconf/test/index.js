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

var url = "http://www.liferay.com/solutionsforum-de";
var url = "http://localhost:3000";
var url = "http://www.liferay.com/web/events2016/modconf";
var pageName = "modconf";


function savePage(size, filename) {
    var page = require('webpage').create();
    page.onConsoleMessage = function (msg) {
    console.log(msg);
}

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

    savePage(value, "test/" + pageName + "-" + value.width + "x" + value.height + ".png");
}

