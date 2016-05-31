 chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
        	if (details.type == "main_frame") {
        		return { redirectUrl: details.url + "?js_fast_load=0&css_fast_load=0&strip=0"};
        	}
        },
        {urls: ["*://www.liferay.com/*"]},
        ["blocking","requestBody"]);