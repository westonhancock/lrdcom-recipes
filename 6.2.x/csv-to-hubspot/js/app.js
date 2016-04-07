var config = (
	function() {
		return {
			cycle_duration: 1500,
			hubspotForm: 'b67bd247-5a86-4a35-a2ca-43552e3d5c21',
			hubspotPortal: '299703',
			hubspotAPIKey: 'cb8584d4-f2e9-4b2f-bd5d-1ca9a032bcc2',
			stepsContainerClass: 'steps-container',
			uploadContainerClass: 'file-drag',
			updateConfig: function(key, value) {
				this[key] = value;
			}
		};
	}
)();
var data = (
	function() {

		// our step prototype
		var stepObject = {
			// individual data received from each step
			step: 0,
			// determines whether user has completed the requirements of step
			completed: false,
			// functions to run when user completes
			onComplete: undefined,
			// function to run when a step is in view
			onLoad: undefined
		};

		return {
			allSteps: [],
			campaign: undefined,

			// creates new step object
			completeStep: function(step) {
				var currentStep = this.allSteps[step - 1];

				currentStep.completed = true;
				if (currentStep.onComplete) {
					currentStep.onComplete();
				}
			},
			createStep: function(config) {
				var currentStep = Object.create(stepObject);

				this.numberOfSteps++;

				// create our step object
				currentStep.step = this.numberOfSteps;
				currentStep.html = config.html || currentStep.html;
				currentStep.completed = config.completed || currentStep.completed;
				currentStep.onComplete = config.onComplete || currentStep.onComplete;
				currentStep.onLoad = config.onLoad || currentStep.onLoad;

				// push it to master object
				this.allSteps.push(currentStep);

				// render HTML
				this.renderStep(this.numberOfSteps);

				return currentStep;
			},
			incompleteStep: function(step) {
				var currentStep = this.allSteps[step - 1];

				currentStep.completed = false;
			},
			interactionType: undefined,
			json: undefined,
			loadStep: function(step) {
				var currentStep = this.allSteps[step - 1];

				if (currentStep.onLoad) {
					currentStep.onLoad();
				}
			},
			numberOfSteps: 0,
			renderStep: function(step) {
				core.templateRender(core.config.stepsContainerClass, this.allSteps[step - 1].html);
			},
			state: {
				navigation: 'begin'
			},
			updateData: function(key, value) {
				this[key] = value;
			}
		};
	}
)();
var ui = (
	function() {

		var nextBtn = document.querySelector('.steps-navigation .next');
		var prevBtn = document.querySelector('.steps-navigation .prev');
		var messageContainer = document.querySelector('.app-messaging');

		// controls navigation controls
		var navigate = (
			function() {
				var currentPage = 0;

				var movePage = function(direction) {
					var animating = false;
					var animationDuration = 700;
					var pages = document.querySelectorAll('.page');

					// don't move if page is currently animating and if reached end/beginning
					if (animating || ((direction === 'back') && currentPage === 0) || ((direction === 'forward') && currentPage + 1 === pages.length)) {
						return false;
					}

					animating = true;

					var enterAnimationClass = 'pt-page-movefromRightFade';
					var exitAnimation = 'pt-page-moveToLeftFade';
					var nextPage = pages[currentPage + 1];
					var thisPage = pages[currentPage];

					if (direction === 'back') {
						enterAnimationClass = 'pt-page-moveFromLeftFade';
						exitAnimation = 'pt-page-moveToRightFade';
						nextPage = pages[currentPage - 1];
					}

					thisPage.classList.add(exitAnimation);
					nextPage.classList.add(enterAnimationClass);
					nextPage.classList.add('page-current');

					thisPage.classList.remove('page-current');

					setTimeout(
						function() {
							nextPage.classList.remove(enterAnimationClass);
							thisPage.classList.remove(exitAnimation);

							animating = false;
						},
						animationDuration
					);

					if (direction === 'back') {
						currentPage--;
					}
					else {
						currentPage++;
					}

					// lastly tell application that page has been moved
					core.publisher.fire('pageMoved', currentPage + 1);
				};

				prevBtn.addEventListener(
					'click',
					function() {
						movePage('back');
					}
				);

				nextBtn.addEventListener(
					'click',
					function() {
						movePage('forward');
					}
				);
			}
		)();

		var changeNavigationState = function(state) {
			if (state === 'begin') {
				prevBtn.style.display = 'none';
				nextBtn.style.display = 'block';
			}

			else if (state === 'block') {
				prevBtn.style.display = 'none';
				nextBtn.style.display = 'none';
			}

			else if (state === 'proceed') {
				prevBtn.style.display = 'block';
				nextBtn.style.display = 'block';
			}

			else {
				prevBtn.style.display = 'block';
				nextBtn.style.display = 'none';
			}
		};

		var newMessage = function(message, type, action, callback) {
			// change message
			messageContainer.style.display = "block";
			messageContainer.innerHTML = message;

			if (type === "error") {
				messageContainer.style.backgroundColor = "#cc0000";
			}

			// if a message is set to timer
			var timerMessage = function() {
				setTimeout(function() {
					messageContainer.style.display = "none";
					if (callback) {
						callback()
					};
				}, 5000)
			}

			if (action === "flash") {
				timerMessage();
			}
		};

		var closeMessage = function() {
			messageContainer.style.display = "none";
		}

		return {
			changeNavigationState: changeNavigationState,
			newMessage: newMessage

		};

	}
)();
var core = (
	function() {

		// renders HTML onto a template
		var templateRender = function(parentClass, view) {
			var container = document.querySelector('.' + parentClass);

			container.insertAdjacentHTML('beforeend', view);
		};

		// our application observer
		var publisher = {
			fire: function(type, publication) {
				this.visitSubscribers('publish', type, publication);
			},
			on: function(type, fn, context) {
				fn = typeof fn === 'function' ? fn : context[fn];
				type = type || 'any';

				if (typeof this.subscribers[type] === 'undefined') {
					this.subscribers[type] = [];
				}

				this.subscribers[type].push(
					{
						context: context || this,
						fn: fn
					}
				);
			},
			remove: function(type, fn, context) {
				this.visitSubscribers('unsubscribe', type, fn, context);
			},
			subscribers: {
				any: []
			},
			visitSubscribers: function(action, type, arg, context) {
				var pubtype = type || 'any';
				var subscribers = this.subscribers[pubtype];

				var max = subscribers ? subscribers.length : 0;

				for (var i = 0; i < max; i += 1) {
					if (action === 'publish') {
						// Call our observers, passing along arguments
						subscribers[i].fn.call(subscribers[i].context, arg);
					}
					else if (subscribers[i].fn === arg && subscribers[i].context === context) {
						subscribers.splice(i, 1);
					}
				}
			}
		};

		// use this to change state of application
		var changeState = function(stateName, state) {
			data['state'][stateName] = state;
			publisher.fire('stateChange', state);
		};

		// internally registering handling of
		publisher.on('stateChange', ui.changeNavigationState);

		return {
			// other modules
			config: config,
			data: data,
			ui: ui,

			// utility functions
			changeState: changeState,
			publisher: publisher,
			templateRender: templateRender
		};

	}
)(data, config, ui);
var steps = (function() {

	var completeStep = function(step) {
		data.completeStep(step);
	};

	var initStep = function(config) {
		data.createStep(config);
	};

	// listen for when the page moves
	core.publisher.on('pageMoved', data.loadStep, data);

	return {
		completeStep: completeStep,
		initStep: initStep
	};

})(core);
var step1Data = {
	csv: {},
	ui: {
		defaultDropText: "Drop Files Here"
	}
}
var step1 = (function() {

	steps.initStep(
		{
			html: '<div class="page step1 page-current" data-step="1">\n	<div class="centered">\n		<h1>Hubspot Interactions Import Tool</h1>\n		<p>A way to make uploading to Hubspot without filling out a form easier</p>\n		<div class="file-drag">\n			<div class="icons-container">\n				<article class="upload-icon-container">\n					<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M16 16l-3.25 3.25-.75-.75 4.5-4.5 4.5 4.5-.75.75L17 16v11h-1V16zm-1 5H8.003C5.798 21 4 19.21 4 17c0-1.895 1.325-3.488 3.1-3.898-.065-.357-.1-.726-.1-1.102 0-3.314 2.686-6 6-6 2.615 0 4.84 1.673 5.66 4.008C19.437 9.378 20.425 9 21.5 9c2.358 0 4.293 1.814 4.484 4.123C27.714 13.563 29 15.133 29 17c0 2.205-1.792 4-4.003 4H18v1h7c2.762 0 5-2.244 5-5 0-2.096-1.287-3.89-3.117-4.634C26.36 9.872 24.15 8 21.5 8c-.863 0-1.68.2-2.406.553C17.89 6.43 15.614 5 13 5c-3.866 0-7 3.134-7 7 0 .138.004.275.012.412C4.24 13.182 3 14.95 3 17c0 2.76 2.232 5 5 5h7v-1z" fill="#333" fill-rule="evenodd"/></svg>\n				</article>\n				<article class="check-icon-container">\n					<svg height="128" viewBox="0 0 128 128" width="128" xmlns="http://www.w3.org/2000/svg"><path d="M85.263 46.49L54.485 77.267l-11.68-11.683c-.782-.782-2.048-.782-2.83-.002-.78.782-.78 2.048 0 2.83l14.51 14.512 33.606-33.607c.782-.78.782-2.046 0-2.827-.78-.782-2.046-.782-2.827 0zm-21.23-32.62c-27.643 0-50.13 22.49-50.13 50.127.002 27.642 22.49 50.13 50.13 50.13h.005c27.638 0 50.123-22.488 50.123-50.13 0-27.64-22.486-50.126-50.128-50.126zm.005 96.258h-.004c-25.435 0-46.13-20.694-46.13-46.13 0-25.435 20.692-46.127 46.128-46.127s46.13 20.694 46.13 46.127c0 25.437-20.69 46.13-46.124 46.13z"/></svg>\n				</article>\n				<article class="error-icon-container">\n					<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="M256 7C118.467 7 7 118.468 7 256.002 7 393.532 118.467 505 256 505s249-111.467 249-248.998C505 118.468 393.533 7 256 7zm0 478.08c-126.31 0-229.08-102.77-229.08-229.078C26.92 129.692 129.69 26.92 256 26.92c126.31 0 229.08 102.77 229.08 229.082C485.08 382.31 382.31 485.08 256 485.08z" fill="#f33"/><path fill="#f33" d="M368.545 157.073l-14.084-14.085-98.597 98.6-98.13-98.132-14.085 14.084 98.132 98.132-98.132 98.137 14.085 14.083 98.13-98.143 98.598 98.61 14.085-14.085-98.598-98.603"/></svg>\n				</article>\n			</div>\n			<div class="file-drop-text">Drop CSV Files Here!</div>\n		</div>\n		<div class="file-info"></div>\n	</div>\n</div>',
			onComplete: function() {
				core.changeState('navigation', 'begin');
			}
		}
	);

	var tests = (function() {

		// for our hubspot tests
		var hubspotTest = (function() {
			var getContacts = function() {

				var ajax = new XMLHttpRequest();

				ajax.open(
					'GET',
					'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?' + 
					'hapikey=' + config.hubspotAPIKey + 
					'&count=100' 
				)

				ajax.send();

				if (ajax.readyState === XMLHttpRequest.DONE) {
					if (ajax.status === 200) {
						console.log(ajax.responseText);
					} else {
						console.error('There was a problem with the request.');
					}
				}
			}

			return {
				getContacts: getContacts
			}
		})();

		// run tests for csv file
		var checkCSV = function(csv) {
			hubspotTest.getContacts();

			var hasCSV = false;

			// run our tests
			if (csv) {
				hasCSV = true;
			}

			return hasCSV;
		};

		var checkJSON = function(json) {
			// run tests for json file
			if (json) {
				return true;
			}
		};

		return {
			checkCSV: checkCSV,
			checkJSON: checkJSON
		};
	})();

	var util = (function() {
		// convert csv to JSON object
		var csvToJSON = function(csv) {
			var lines = csv.split('\n');
			var result = [];

			var headers = lines[0].split(',');

			for (var i = 1; i < lines.length; i++) {
				var currentline = lines[i].split(',');
				var obj = {};

				for (var j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j];
				}

				result.push(obj);
			}

			core.publisher.fire('JSONcreated', result);
			return result;
		};

		var getFileType = function(filename) {
			var parts = filename.split('/');

			return parts[parts.length - 1];
		};

		// read file in browser
		var readFile = function(file) {

			return new Promise(function(resolve, reject) {
				var textType = 'csv';
				var windowsTextType = 'vnd.ms-excel';
				var fileType = getFileType(file.type);

				if (fileType === textType || fileType === windowsTextType) {
					var reader = new FileReader();
					var content = reader.readAsText(file);

					step1Data.csvDone = false;

					reader.onload = function() {
						resolve(reader.result);
					}
				}
				else {
					reject(Error('Wrong File Type'));
				}
			});
		};

		// get information file
		var GetFileInformation = function(JSON) {
			var entries = 0;

			for (var key in JSON) {
				if (JSON.hasOwnProperty(key)) {
					entries++;
				}
			}

			return {
				entries: entries
			};
		};

		// higher order function to manage the processing
		var processFile = function(file) {

			readFile(file)

				// when file is done being read, test csv
				.then(function(csv) {
					step1Data.csv = csv;
					
					return csv;
				})
				// if there's an error with csv
				.catch(function(e) {
					UI.fileGrade('fail', 'Wrong file type. Upload CSV File');
					data.incompleteStep(1);
				})
				// additional tests on csv
				.then(function(csv) {
					if (!tests.checkCSV(csv)) {
						throw "CSV is no good";
					}

					return csv;
				})
				// if file is checked, parse to JSON
				.then(function(csv) {
					if (csv) {
						var json = csvToJSON(csv);

						data.updateData('json', json);
					}

					return json;
				})
				// if we pass the JSON testing, we should complete the step
				.then(function(json) {
					if (tests.checkJSON(data.json)) {
						steps.completeStep(1);
					}
				})
		};

		return {
			processFile: processFile
		};
	})();

	var UI = (function() {
		var checkSVGContainer = document.querySelector('.check-icon-container');
		var dropContainerText = document.querySelector('.file-drop-text');
		var errorSVGContainer = document.querySelector('.error-icon-container');
		var fileInfoContainer = document.querySelector('.file-info');
		var uploadSVGContainer = document.querySelector('.upload-icon-container');

		// controls drag and upload UI
		var fileDrop = (function() {
			var filedrag = document.querySelector('.file-drag');

			function fileDragHover(e) {
				e.stopPropagation();
				e.preventDefault();
				filedrag.className = (e.type == 'dragover') ? 'file-drag hover' : 'file-drag';
			}

			function fileSelectHandler(e) {
				fileDragHover(e);
				var files = e.dataTransfer.files;

				util.processFile(files[0]);
				fileChanged(files[0].name);
			}

			filedrag.addEventListener(
				'dragover',
				function(e) {
					fileDragHover(e);
				},
				false
			);

			filedrag.addEventListener(
				'dragleave',
				function(e) {
					fileDragHover(e);
				},
				false
			);

			filedrag.addEventListener(
				'drop',
				function(e) {
					fileSelectHandler(e);
				},
				false
			);

		})();

		var fileChanged = function(text) {
			dropContainerText.innerHTML = text;
		};

		var fileGrade = function(result, message) {
			if (result === 'fail') {
				uploadSVGContainer.style.opacity = 0;
				checkSVGContainer.style.opacity = 0;
				errorSVGContainer.style.opacity = 1;
				ui.newMessage(message, "error");
			}
			else {
				uploadSVGContainer.style.opacity = 0;
				checkSVGContainer.style.opacity = 1;
				errorSVGContainer.style.opacity = 0;
				ui.closeMessage();
			}
		};

		return {
			fileChanged: fileChanged,
			fileGrade: fileGrade
		};
	})(util);
})(steps, step1Data);
var step2 = (
	function() {
		steps.initStep(
			{
				html: '<div class="page step2" data-step="2">\n	<div class="centered">\n		<h2>Step 2</h2>\n		<p>Tell me about the event and campaign.</p>\n		<form>\n			<div class="form-group">\n				<label>Recent Interaction Type</label>\n				\n				<select id="interaction-type">\n					<option disabled="disabled" selected="selected">Select an Interaction</option>\n					<option value="event-community">Event - Community</option>\n					<option value="event-industry">Event - Industry</option>\n					<option value="event-lr-conference">Event - LR Conference</option>\n					<option value="event-partner-event">Event - Partner Event</option>\n					<option value="event-roadshow">Event - Roadshow</option>\n					<option value="event-user-group">Event - User Group</option>\n					<option value="event-webinar">Event - Webinar</option>\n					<option value="marketplace">Marketplace</option>\n					<option value="personal-relationship">Personal Relationship</option>\n					<option value="purchased-list">Purchased List</option>\n					<option value="sdr">SDR</option>\n				</select>\n			</div>\n			<div class="form-group">\n				<label>Campaign</label>	\n				<input class="form-control" id="campaign-id" type="text"/>\n			</div>\n			<div class="form-group">\n				<label>Form ID</label>	\n				<input class="form-control" id="form-id" value="b67bd247-5a86-4a35-a2ca-43552e3d5c21" type="text"/>\n			</div>\n		</form>\n		\n	</div>\n</div>',
				onComplete: function() {
					core.ui.changeNavigationState('begin');
				},
				onLoad: function() {
					core.ui.changeNavigationState('block');
				}
			}
		);

		var tests = (
			function() {
				var validateAll = function() {
					var allAnswers = [data.interactionType, data.campaign, core.config.hubspotForm];
					var errors = 0;

					for (var x = 0; x < allAnswers.length; x++) {
						if (!allAnswers[x]) {
							errors++;
						}
					}

					if (errors === 0) {
						steps.completeStep(2);
						return true;
					}
				};

				return {
					validateAll: validateAll
				};
			}
		)();

		// UI for our step
		var ui = (
			function() {

				// controls when form changes
				var form = (
					function() {
						var campaign = document.querySelector('#campaign-id');
						var formID = document.querySelector('#form-id');
						var interactionType = document.querySelector('#interaction-type');

						interactionType.addEventListener(
							'change',
							function(e) {
								core.data.updateData('interactionType', interactionType.options[interactionType.selectedIndex].text);
								tests.validateAll();
							},
							false
						);

						campaign.addEventListener(
							'keyup',
							function() {
								core.data.updateData('campaign', campaign.value);
								tests.validateAll();
							},
							false
						);

						formID.addEventListener(
							'keyup',
							function() {
								core.config.updateConfig('hubspotForm', formID.value);
								tests.validateAll();
							},
							false
						);
					}
				)();
			}
		)();
	}
)(steps);
var step3 = (function() {

	steps.initStep(
		{
			html: '<div class="page step3" data-step="3">\n	<div class="centered">\n			<h1>Just a minute...</h1>\n			<p class="page-description">We\'re uploading your data to Hubspot!</p>\n			\n\n			<div class="progress-bar-container">\n				<span class="progress-bar-description">Sample description</span>\n				<div class="progress-bar">\n					<span class="percentage"></span>\n				</div>\n			</div>\n\n			<div class="progress-information-container">\n				<div class="info entries-left">\n					<span class="desc">Entries Left</span>\n					<span class="value"></span>\n				</div>\n				<div class="info time-left">\n					<span class="desc">Estimated Time Left</span>\n					<span class="value"></span>\n				</div>\n			</div>\n	</div>\n</div>',
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
			var sendToHubspot = function(entry) {
				var ajax = new XMLHttpRequest();

				ajax.open(
					'POST',
					'https://forms.hubspot.com/uploads/form/v2/' +
					core.config.hubspotPortal + '/' + core.config.hubspotForm +
					'?email=' + entry["Email Address"] +
					'&recent_interaction=' + entry["Interaction"] +
					'&recent_interaction_detail=' + entry["Interaction Detail"] +
					'&recent_interaction_date=' + entry["Interaction Date"] +
					'&recent_interaction_type=' + data.interactionType +
					'&recent_interaction_campaign=' + data.campaign
				);

				ajax.send();
			};

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

							// 1) upload to hubspot
							sendToHubspot(entries[i]);

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
			pageTitle.innerHTML = 'We\'re done, skipper!';
			pageSubitle.innerHTML = 'Form data successfully uploaded to <a href="https://app.hubspot.com/forms/' + config.hubspotPortal + '/' + config.hubspotForm + '/submissions" target="_blank">Hubspot.</a>';
		};

		return {
			doneUploading: doneUploading,
			updateProgress: updateProgress
		};
	})();
})(steps);
var init = (
	function() {

		// init application state
		core.changeState('navigation', 'block');

	}
)(core);