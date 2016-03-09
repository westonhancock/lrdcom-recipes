var step3 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="3">\n	<h1>Just a minute...</h1>\n	<p>We\'re uploading your data to Hubspot!</p>\n	\n\n	<div class="progress-bar-container">\n		<span class="progress-bar-description">Sample description</span>\n		<div class="progress-bar">\n			<span class="percentage">45%</span>\n		</div>\n	</div>\n\n	<div class="progress-information-container">\n		<div class="info entries-left">\n			<span class="desc">Entries Left</span>\n			<span class="value"></span>\n		</div>\n		<div class="info time-left">\n			<span class="desc">Estimated Time Left</span>\n			<span class="value"></span>\n		</div>\n	</div>\n</div>',
		onLoad: function() {
			util.startUpload();
		}
	});

	var util = (function() {
		var sendToHubspot = function(entry) {
			var ajax = new XMLHttpRequest();
			// ajax.open("POST", 'http://forms.hubspot.com/uploads/form/v2/' + core.config.hubspotPortal + '/' + core.config.hubspotForm + '?firstname=Phil&lastname=Chan&email=phillipchan1@gmail.com&redirectUrl=www.google.com&pageUrl=liferay.com')
		}

		var startUpload = function() {
			var i = 0;
			var entries = core.data.step1.json;
			var noOfEntries = entries.length;

			// our recursive timer for loop
			function timer() {	
			    setTimeout(function () {
			    	sendToHubspot(entries[i]);
			 
			    	// 1) upload to hubspot
			    	// sendToHubspot(entries[i]);

			    	// 2) update UI
			    	ui.updateProgress(entries[i], i, noOfEntries);

			        if (i < noOfEntries - 1) {
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

		var progressBar = document.querySelector('.progress-bar');
		var progressBarPercentage = document.querySelector('.progress-bar > .percentage');
		var progressBarDescription = document.querySelector('.progress-bar-description');
		var entriesLeftDescription = document.querySelector('.entries-left > .value');
		var timeleftDescription = document.querySelector('.time-left > .value');

		// higher function to update all the different UI
		var updateProgress = function(entry, current, total) {
			// update percentage bar
			updateBar(current + 1, total);

			// update progress info
			updateProgressInfo(entry, current + 1, total);

		}

		var updateBar = function(current, total) {
			var percentage = (current / total) * 100;

			progressBar.style.width = percentage + "%";
			progressBarPercentage.innerHTML = Math.round(percentage) + "%"

			if (current === total) {
				progressBar.style.width = "100%";		
			}
		}

		var getTimeLeft = function(current, total) {
			var timeLeftinSeconds = ((total * config.cycle_duration) - (current * config.cycle_duration)) / 1000;
			var minutes = Math.round(parseInt(timeLeftinSeconds / 60 ) % 60);
			var seconds = timeLeftinSeconds % 60;

			return minutes + ":" + seconds;
		}

		var updateProgressInfo = function(entry, current, total) {
			var entriesLeft = total - current;
			var currentEntryEmail = entry.email;
			var timeLeft = getTimeLeft(current, total);

			progressBarDescription.innerHTML = "Current Entry: " + currentEntryEmail;
			entriesLeftDescription.innerHTML = entriesLeft;
			timeleftDescription.innerHTML = timeLeft;
		}

		return {
			updateProgress: updateProgress
		}

	})();

})(steps);