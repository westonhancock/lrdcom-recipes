var hubspot = (function() {

	var hubspotFormID = config.hubspotFormID || '';
	var hubspotPortalID = config.hubspotPortalID || '';

	var sendToHubspot = function(url, paramObj) {
		var ajax = new XMLHttpRequest();
		var queryParameters = "";
		var counter = 0;

		if (paramObj) {
			
			for (var key in paramObj) {
				if (paramObj.hasOwnProperty(key)) {
					let firstParameterPrefix = "&"

					if (counter == 0) {
						firstParameterPrefix = "?";
					}

					counter++;
					queryParameters = queryParameters + firstParameterPrefix + key + "=" + paramObj[key];
				}
			}	
		}

		ajax.open(
			'POST', 
			url + '/' + hubspotPortalID + '/' + hubspotFormID + queryParameters
		);

		ajax.send();
	}

	return {
		sendToHubspot: sendToHubspot
	}

})(config);