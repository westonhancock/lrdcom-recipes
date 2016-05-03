var hubspot = (function() {

	var hubspotFormID = config.hubspotPortal || '';
	var portalID = config.hubspotPortal || '';

	var sendToHubspot = function(url, paramObj) {
		var ajax = new XMLHttpRequest();
		var queryParameters = "";

		if (paramObj) {
			for (var key in paramObj) {
				if (paramObj.hasOwnProperty(key)) {
					queryParameters = queryParameters + "&" + key + "=" + paramObj[key];
				}
			}	
		}

		ajax.open(
			'POST', 
			url + '/' + portalID + '/' + hubspotFormID + queryParameters
		);

		ajax.send();
	}

	return {
		sendToHubspot: sendToHubspot
	}

})(config);