var sizes = [
{width: 320,height: 640},
{width: 375,height: 667},
{width: 768,height: 1024},
{width: 320,height: 568},
{width: 414,height: 736},
{width: 375,height: 667},
{width: 1366,height: 768},
{width: 1920,height: 1080},
{width: 1600,height: 900},
{width: 1440,height: 900},
{width: 1280,height: 1024}
];




function savePage(size, filename) {
    var page = require('webpage').create();
    page.viewportSize = { width: size.width, height: size.height };
    page.open('http://localhost:3000/', function start(status) {
    console.log(size.width + " x" + size.height);
    setTimeout( function() {
        page.render(filename);
    }, 3000);
    
    });
}

for (var i = 0; i < sizes.length; i++) {
    var value = sizes[i];
    console.log(value.width);
    savePage(value, "test/ldsf-dach-" + value.width + "x" + value.height + ".png");
}

