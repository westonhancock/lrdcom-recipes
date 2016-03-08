var step3 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="3">\n	<p>Submitting..</p>\n\n	<div class="progress-bar-container">\n		<div class="progress-bar"></div>\n	</div>\n</div>',
		onLoad: function() {
			util.startUpload();
		}
	});

	var util = (function() {
		var sendToHubspot = function() {
			$.post('http://forms.hubspot.com/uploads/form/v2/' + core.config.hubspotPortal + '/' + core.config.hubspotForm + '?firstname=Phil&lastname=Chan&email=phillipchan1@gmail.com&redirectUrl=www.google.com&pageUrl=liferay.com', function(data) {
				console.log(data);
			});	
		}

		var startUpload = function() {
			var i = 1;
			var noOfEntries = core.data.step1.json.length;
			function timer() {	
			    setTimeout(function () {
			 
			    	// 1) upload to hubspot
			    	// 2) update UI

			        if (i < noOfEntries) {
			        	timer();
			        	i++	
			        }
			    }, config.cycle_duration);
			}
			timer();
		}
			
		return {
			startUpload: startUpload
		}
		
	})();

	var ui = (function() {


	})();

})(steps);