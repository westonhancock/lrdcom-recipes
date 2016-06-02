var step3 = (function() {

	steps.initStep(
		{
			html: step3view['view.html'],
			onComplete: function() {
				ui.doneUploading();
			},
			onLoad: function() {
				core.ui.changeNavigationState('block');
				util.initUploader();
				setTimeout(
					function() {
						util.startUpload();
					},
					500
				);
			}
		}
	);

	var util = (
		function() {

			var initUploader = function() {
				var entries = data.json;
				var noOfEntries = entries.length;

				ui.updateProgress(entries[0], -1, noOfEntries);
			};

			var startUpload = function() {
				var entries = data.json;
				var i = 0;
				var noOfEntries = entries.length;

				// our recursive timer for loop
				function timer() {
					setTimeout(
						function() {

							var entry = entries[i];

							hubspot.sendToHubspot('https://forms.hubspot.com/uploads/form/v2', {
								email: entry["Email Address"],
								hs_context: encodeURIComponent(JSON.stringify({
									sfdcCampaignId: data.campaign,
									"ipAddress": ""
								})),
								recent_interaction: entry["Interaction"],
								recent_interaction_detail: entry["Interaction Detail"],
								recent_interaction_date: entry["Interaction Date"],
								recent_interaction_type: entry["Interaction Type"],
								recent_interaction_campaign: data.campaign,
							});

							// 2) update UI
							ui.updateProgress(entries[i], i, noOfEntries);

							if (i < noOfEntries - 1) {
								timer();
								i++;
							}

							else if (i === noOfEntries - 1) {
								steps.completeStep(3);
							}
						},
						config.cycle_duration
					);
				}

				timer();
			};

			return {
				initUploader: initUploader,
				startUpload: startUpload
			};
		}
	)();

	var ui = (function() {
		var entriesLeftDescription = document.querySelector('.entries-left > .value');
		var pageSubitle = document.querySelector('.step3 .page-description');
		var pageTitle = document.querySelector('.step3 h1');
		var progressBar = document.querySelector('.progress-bar');
		var progressBarDescription = document.querySelector('.progress-bar-description');
		var progressBarPercentage = document.querySelector('.progress-bar > .percentage');
		var timeleftDescription = document.querySelector('.time-left > .value');

		// higher function to update all the different UI
		var updateProgress = function(entry, current, total) {
			// update percentage bar
			updateBar(current + 1, total);

			// update progress info
			updateProgressInfo(entry, current + 1, total);
		};

		var updateBar = function(current, total) {
			var percentage = (current / total) * 100;

			progressBar.style.width = percentage + '%';
			progressBarPercentage.innerHTML = Math.round(percentage) + '%';

			if (current === total) {
				progressBar.style.width = '100%';
			}
		};

		function startTimer(duration, display) {
			var diff;
			var minutes;
			var seconds;
			var start = Date.now();

			function timer() {

				// get the number of seconds that have elapsed since
				// startTimer() was called
				diff = duration - (((Date.now() - start) / 1000) | 0);

				// does the same job as parseInt truncates the float
				minutes = (diff / 60) | 0;
				seconds = (diff % 60) | 0;

				minutes = minutes < 10 ? '0' + minutes : minutes;
				seconds = seconds < 10 ? '0' + seconds : seconds;

				display.textContent = minutes + ':' + seconds;

				if (diff <= 0) {

					// add one second so that the count down starts at the full duration
					// example 05:00 not 04:59
					start = Date.now() + 1000;
				}
			}

			// we don't want to wait a full second before the timer starts
			timer();
			setInterval(timer, 1000);
		}

		var updateProgressInfo = function(entry, current, total) {
			var currentEntryEmail = entry["Email Address"];
			var entriesLeft = total - current;
			var timeLeftinSeconds = ((total * config.cycle_duration) - (current * config.cycle_duration)) / 1000;

			progressBarDescription.innerHTML = 'Current Entry: ' + currentEntryEmail;
			entriesLeftDescription.innerHTML = entriesLeft;
			startTimer(timeLeftinSeconds, timeleftDescription);
		};

		var doneUploading = function() {
			progressBarDescription.innerHTML = '';
			progressBar.addClass('complete');
			pageTitle.innerHTML = 'We\'re done, skipper!';
			pageSubitle.innerHTML = 'Form data successfully uploaded to <a href="https://app.hubspot.com/forms/' + config.hubspotPortalID + '/' + config.hubspotFormID + '/submissions" target="_blank">Hubspot.</a> Or you can <a onclick="location.reload();" href="#">Submit another form</a>';
		};

		return {
			doneUploading: doneUploading,
			updateProgress: updateProgress
		};
	})();
})(hubspot, steps);