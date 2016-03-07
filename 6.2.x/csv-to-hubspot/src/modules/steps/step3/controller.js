var step3 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="3">\n	<p>Submitting</p>\n</div>'
	})

	var util = (function() {
		var sendToHubspot = function() {
			$.post('http://forms.hubspot.com/uploads/form/v2/' + core.config.hubspotPortal + '/' + core.config.hubspotForm + '?firstname=Phil&lastname=Chan&email=phillipchan1@gmail.com&redirectUrl=www.google.com&pageUrl=liferay.com', function(data) {
				console.log(data);
			});	
		}

		return {
			sendToHubspot: sendToHubspot
		}
	})();

})(steps);