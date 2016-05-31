// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var showArticles = function (response) {
	// response is packed into array, not sure why..
		var articleArray = response[0];
	  for (var i = 0; i < articleArray.length; i++) {
		  
		    
	    	var newDiv = document.createElement("div"); 
	    	//https://www.liferay.com/?p_p_mode=view&_15_struts_action=%2Fjournal%2Fedit_article&_15_groupId=67510365&_15_articleId=69679838&_15_version=3.5
	    	//https://www.liferay.com/de/web/events2016/ldsf-dach?p_p_mode=view&_15_struts_action=%2Fjournal%2Fedit_article&_15_groupId=67510365&_15_articleId=69679838&_15_version=3.5
	    	var articleLinkText = "Article: " + articleArray[i].articleid;
	    	var newContent = document.createTextNode(articleLinkText); 
	    	//newDiv.appendChild(newContent); // füge den Textknoten zum neu erstellten div hinzu.

	    	
	    	//https://www.liferay.com/c/journal/get_article?groupId=67510365&articleId=69987772&version=1.8
	    	
	    	var a = document.createElement('a');
	    	a.appendChild(newContent);
	    	a.title = articleLinkText;
	    	a.href = "http://www.liferay.com/c/journal/view_article_content?groupId=" + articleArray[i].group + "&articleId=" + articleArray[i].articleid + "&version=" + articleArray[i].version;
	    	a.target = "_blank";
	    	//a.href = "https://www.liferay.com/group/control_panel/manage?p_p_id=15&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&doAsGroupId=14&refererPlid=8440537&_15_struts_action=%2Fjournal%2Fedit_article&_15_redirect=https%3A%2F%2Fwww.liferay.com%2Fgroup%2Fcontrol_panel%2Fmanage%3Fp_p_id%3D15%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_p_mode%3Dview%26doAsGroupId%3D14%26refererPlid%3D8440537%26_15_refererPlid%3D8440537%26_15_doAsGroupId%3D14&_15_originalRedirect=https%3A%2F%2Fwww.liferay.com%2Fgroup%2Fcontrol_panel%2Fmanage%3Fp_p_id%3D15%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_p_mode%3Dview%26doAsGroupId%3D14%26refererPlid%3D8440537%26_15_refererPlid%3D8440537%26" + 
	    	//"_15_doAsGroupId%3D14&_15_groupId=14&_15_articleId=8447720";
	    	a.href = "https://www.liferay.com/group/control_panel/manage?p_p_id=15&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&doAsGroupId=14&refererPlid=8440537&_15_struts_action=%2Fjournal%2Fedit_article&_15_redirect=https%3A%2F%2Fwww.liferay.com%2Fgroup%2Fcontrol_panel%2Fmanage%3Fp_p_id%3D15%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_p_mode%3Dview%26doAsGroupId%3D14%26refererPlid%3D8440537%26_15_refererPlid%3D8440537%26_15_doAsGroupId%3D14&_15_originalRedirect=https%3A%2F%2Fwww.liferay.com%2Fgroup%2Fcontrol_panel%2Fmanage%3Fp_p_id%3D15%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_p_mode%3Dview%26doAsGroupId%3D14%26refererPlid%3D8440537%26_15_refererPlid%3D8440537%26" + 
	    	"_15_doAsGroupId%3D" + articleArray[i].group + "&_15_groupId=" + articleArray[i].group + "&_15_articleId=" + articleArray[i].articleid;

	    	/*	a.href = "https://www.liferay.com?" + "&p_p_mode=view&_15_struts_action=%2Fjournal%2Fedit_article" +
	    	"&_15_groupId=" + articleArray[i].group + "&_15_articleId=" + articleArray[i].articleid + "&_15_version=" + articleArray[i].version;
	    	*/
	    	newDiv.appendChild(a);
	    	
	    	
	    	  // füge das neu erstellte Element und seinen Inhalt ins DOM ein
	    	  var currentDiv = document.getElementById("articles"); 
	    	  document.body.insertBefore(newDiv, currentDiv); 
	   	 }
	
}
/*
chrome.browserAction.onClicked.addListener(function(tab) {
	  chrome.tabs.executeScript({
	    file: 'webcontent.js'
	  }, showArticles);
	});
*/

document.addEventListener('DOMContentLoaded', function() {
	
	 document.getElementById("getarticles").addEventListener("click", function() {
			chrome.tabs.executeScript(null, {file: "webcontent.js"}, showArticles);
		});
	
});



function getCurrentTab(callback) {
	  var queryInfo = {
	    active: true,
	    currentWindow: true
	  };

	  chrome.tabs.query(queryInfo, function(tabs) {
	    var tab = tabs[0];
	    callback(tab);
	  });
}
