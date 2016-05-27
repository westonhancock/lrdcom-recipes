var biggulp = require("../biggulp.js");

    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config.json'));

    var article = {
        groupId: "67510365",
        articleId: "74650618",
        defaultLocale: "de_DE",
        locales: [{
            locale: "de_DE",
            filename: "test.html"
        }, {
            locale: "en_US", 
            filename: "test.html"
        }]
    };
    biggulp.updateArticle(config, article);