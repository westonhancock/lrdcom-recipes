var parseCSV = (function() {
	var parse = function(csv) {
		var lines = csv.split("\n");
		var result = [];
		var headers = lines[0].split(",");

		for (var i = 1; i < lines.length; i++) {
			var obj = {};
			var currentline = lines[i].split(",");

			for (var j = 0; j < headers.length; j++) {
				obj[headers[j]] = currentline[j];
			}

			result.push(obj);
		}

		return JSON.stringify(result); 
	}

	return {
		parse : parse
	}

})();

var sendToHubspot = (function() {
	var send = function() {
		$.post("http://forms.hubspot.com/uploads/form/v2/299703/5109c074-942c-49a6-929b-91b3441a9c3d?firstname=Phil&lastname=Chan&email=phillipchan1@gmail.com&redirectUrl=www.google.com&pageUrl=liferay.com", function(data) {
			console.log(data);
		});	
	}
	
	return {
		send: send
	}

})();