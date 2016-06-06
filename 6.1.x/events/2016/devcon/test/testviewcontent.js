
    var biggulp = require("../biggulp.js");
    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config.json'));
    //var articleConfig = JSON.parse(fs.readFileSync('./articleconfig.json'));
    
    var articleConfig = [
        {
            "groupId": "67510365",
        "articleId": "74591624",
        "urlTitle": "devcon-call-for-papers-web-events2016-devcon"
        }];   
   
    articleConfig.forEach(function(article) { 
        biggulp.viewArticleContent(config, article, "en_US");
      //  biggulp.getDisplayArticleByTitle(config, article); 
       // biggulp.getArticle(config, article);
      //  biggulp.getArticleContent(config, article, "en_US"); 
    });
