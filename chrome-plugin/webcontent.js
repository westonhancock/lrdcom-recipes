var articles = document.querySelectorAll(".journal-content-article");

var articleArray = [];
for (var i = 0; i < articles.length; ++i) {
	  var article = articles[i];
	  var articleinfo = article.id.split("_");
	  
	  //article_1_35606059_58117485_1.2
	  if (articleinfo.length == 5) {
		var articleobj = 
	  		{ group: articleinfo[2], articleid:   articleinfo[3], version: articleinfo[4]  };
	  	console.log(articleobj);
	  	articleArray.push(articleobj);
	  }	
}

var alink = document.querySelector("li.public-site a");
var p_auth = alink.href.split("&")[0].split("=")[1];
console.log("auth:" + p_auth)
		
var eventsUrl = "https://www.liferay.com/api/jsonws/" +
	 "/journalarticle/get-article?" +
	 "p_auth=" + p_auth + 
      "&groupId=" + articleArray[0].group +
    "&articleId=" + articleArray[0].articleid +
    "&version=" + articleArray[0].version;

function listener() {
    var events = JSON.parse(this.responseText);
    console.log(events);
  /*  var eventList = '';
    events.forEach(function (el) {
    	console.log(el);
        var event = el.dynamicElements;
        eventList += (event.start_date + ' ' + event.title + ' ' + event.location_label + '\n\n');
    });
    alert(eventList.trim());*/
}

var req = new XMLHttpRequest();
req.onload = listener;
req.open('get', eventsUrl, true);
req.send();
/*
Liferay.Service(
  '/journalarticle/get-article',
  {

    groupId: articleArray[0].group,
    articleId: articleArray[0].articleid,
    version: articleArray[0].version
  },
  function(obj) {
	  console.log("json");
    console.log(obj);
  }
);
*/




console.log("article array: " + articleArray);
articleArray
//chrome.runtime.sendMessage(articleArray, function(response) { 
//	if (response)
//	console.log("got response message: " + response.message);
//	
//});