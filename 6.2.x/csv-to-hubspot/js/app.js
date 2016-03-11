var config = (function() {
	return {
		// ui options
		stepsContainerClass: 'steps-container',
		uploadContainerClass : 'file-drag',
		cycle_duration : 1500,

		// hubspot options
		hubspotPortal : '299703',
		hubspotForm  : 'b67bd247-5a86-4a35-a2ca-43552e3d5c21'
	}
})();	
var data = (function() {

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
		json: undefined,
		interactionType: undefined,
		campaign: undefined,
		state: {
			navigation: 'begin'
		},
		currentStep: 1,
		updateData : function(key, value) {
			this[key] = value;
		},
		// holds master data
		allSteps: [],
		// default number of steps
		numberOfSteps : 0,
		// creates new step object
		createStep: function(config) {
			var currentStep = Object.create(stepObject);
			this.numberOfSteps++

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
		renderStep: function(step) {
			core.templateRender(core.config.stepsContainerClass, this.allSteps[step - 1].html);
		},
		completeStep: function(step) {
			var currentStep = this.allSteps[step - 1];
			currentStep.completed = true;
			if (currentStep.onComplete) {
				currentStep.onComplete();	
			}
		},
		incompleteStep: function(step) {
			var currentStep = this.allSteps[step - 1];
			currentStep.completed = false;
		},
		loadStep: function(step) {
			var currentStep = this.allSteps[step - 1];
			if (currentStep.onLoad) {
				currentStep.onLoad();
			}
		},
		changeStep: function(direction) {
			if (direction == 'next') {
				this.currentStep++	
			}
			else {
				this.currentStep--
			}
		}
	}


})();
var ui = (function() {

	var prevBtn = document.querySelector('.steps-navigation .prev');
	var nextBtn = document.querySelector('.steps-navigation .next');
	
	// controls navigation controls
	var navigate = (function() {	
		var currentPage = 0;

		var movePage = function(direction) {
			var pages = document.querySelectorAll('.page');
		    var noOfPages = pages.length;
		    var isAnimating = false;
		    var animationDuration = 700;

	    	// don't move if page is currently animating and if reached end/beginning
	    	if (isAnimating || ((direction === 'back') && currentPage === 0) || ((direction === 'forward') && currentPage + 1 === noOfPages )) {
	    		return false;
	    	}

	    	isAnimating = true;

	    	var thisPage = pages[currentPage];
	    	var nextPage = pages[currentPage + 1];
	    	var exitAnimation = 'pt-page-moveToLeftFade';
	    	var enterAnimationClass = 'pt-page-movefromRightFade';

	    	if (direction === 'back') {
	    		nextPage = pages[currentPage - 1];
	    		exitAnimation = 'pt-page-moveToRightFade';
	    		enterAnimationClass = 'pt-page-moveFromLeftFade';
	    	}

	    	thisPage.classList.add(exitAnimation);
			nextPage.classList.add(enterAnimationClass);
			nextPage.classList.add('page-current');

	    	thisPage.classList.remove('page-current');
			
			setTimeout(function() {
	    		nextPage.classList.remove(enterAnimationClass);
	    		thisPage.classList.remove(exitAnimation);
	    		isAnimating = false;
	    	}, animationDuration)

			if (direction === 'back') {
				currentPage--
			} else { currentPage++}

			// lastly tell application that page has been moved
			core.publisher.fire("pageMoved", currentPage + 1);
	    }

	    prevBtn.addEventListener('click', function() {
	    	movePage('back');
	    });
	    nextBtn.addEventListener('click', function() {
	    	movePage('forward');
	    });

	})();


	var assessNavigation = function() {
		var noOfPages = data.allSteps.length + 1;
		// var currentPage = 
	}

	var changeNavigationState = function(state) {
		if (state === "begin") {
			prevBtn.style.display = 'none';
			nextBtn.style.display = 'block';
		}

		else if (state === "block") {
			prevBtn.style.display = 'none';
			nextBtn.style.display = 'none';
		}

		else if (state === "proceed") {
			prevBtn.style.display = 'block';
			nextBtn.style.display = 'block';
		}

		else {
			prevBtn.style.display = 'block';
			nextBtn.style.display = 'none';
		}
	}

	return {
		changeNavigationState: changeNavigationState
	}

})();
var core = (function() {

	// renders HTML onto a template
	var templateRender = function(parentClass, view) {
		var container = document.querySelector('.' + parentClass);
		container.insertAdjacentHTML('beforeend', view)
	}

	// our application observer
	var publisher = {  
	    subscribers: {
	        any: [] // event type: subscribers
	    },
	    on: function(type, fn, context) {
	        type = type || 'any';
	        fn = typeof fn === 'function' ? fn : context[fn];
	        if (typeof this.subscribers[type] === "undefined") {
	            this.subscribers[type] = [];
	        }
	        this.subscribers[type].push({ fn: fn, context: context || this });
	    },
	    remove: function(type, fn, context) {
	        this.visitSubscribers('unsubscribe', type, fn, context);
	    },
	    fire: function(type, publication) {
	        this.visitSubscribers('publish', type, publication);
	    },
	    visitSubscribers: function(action, type, arg, context) {
	        var pubtype = type || 'any',
	            subscribers = this.subscribers[pubtype],
	            i,
	            max = subscribers ? subscribers.length : 0;

	        for (i = 0; i < max; i += 1) {
	            if (action === 'publish') {
	                // Call our observers, passing along arguments
	                 subscribers[i].fn.call(subscribers[i].context, arg);
	            } else {
	                if (subscribers[i].fn === arg && subscribers[i].context === context) {
	                    subscribers.splice(i, 1);
	                }
	            }
	        }
	    }
	};

	// use this to change state of application
	var changeState = function(stateName, state) {
		data['state'][stateName] = state;
		publisher.fire('stateChange', state)
	}

	// internally registering handling of 
	publisher.on('stateChange', ui.changeNavigationState);

	return {
		// other modules
		config: config,
		data: data,
		ui: ui,
		
		// utility functions
		templateRender: templateRender,
		publisher: publisher,
		changeState, changeState
	}

})(data, config, ui);
var steps = (function() {

	var initStep = function(config) {
		data.createStep(config);
		// renderHTML();
	};

	var completeStep = function(step) {
		data.completeStep(step);
	}

	// listen for when the page moves
	core.publisher.on("pageMoved", data.loadStep, data)

	return {
		initStep: initStep,
		completeStep: completeStep
	}

})(core);
var step1Data = {
	csv: {},
	ui: {
		defaultDropText: "Drop Files Here"
	}
}
var step1 = (function() {

	steps.initStep({
		html: '<div class="page step1 page-current" data-step="1">\n	<div class="centered">\n		<h1>Hubspot Interactions Import Tool</h1>\n		<p>A way to make uploading to Hubspot without filling out a form easier</p>\n		<div class="file-drag">\n			<div class="icons-container">\n				<article class="upload-icon-container">\n					<?xml version="1.0" ?><svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#333333" id="icon-130-cloud-upload"><path d="M16,16 L12.75,19.25 L12,18.5 L16.5,14 L21,18.5 L20.25,19.25 L17,16 L17,27 L16,27 L16,16 L16,16 Z M15,21 L8.00281647,21 C5.79793835,21 4,19.209139 4,17 C4,15.1046097 5.32460991,13.5117359 7.10100919,13.1021544 L7.10100919,13.1021544 C7.03467626,12.7448817 7,12.3764904 7,12 C7,8.68629134 9.68629134,6 13,6 C15.6154416,6 17.8400262,7.67345685 18.6614243,10.0080411 C19.435776,9.37781236 20.4237666,9 21.5,9 C23.8583427,9 25.7929639,10.814166 25.9844379,13.1230721 L25.9844379,13.1230721 C27.7144917,13.5630972 29,15.1320162 29,17 C29,19.2046438 27.207878,21 24.9971835,21 L18,21 L18,22 L25.0005601,22 C27.7616745,22 30,19.7558048 30,17 C30,14.9035809 28.7132907,13.1085075 26.8828633,12.3655101 L26.8828633,12.3655101 C26.3600217,9.87224935 24.1486546,8 21.5,8 C20.6371017,8 19.8206159,8.19871575 19.0938083,8.55288165 C17.8911816,6.43144875 15.6127573,5 13,5 C9.13400656,5 6,8.13400656 6,12 C6,12.1381509 6.00400207,12.275367 6.01189661,12.4115388 L6.01189661,12.4115388 C4.23965876,13.1816085 3,14.9491311 3,17 C3,19.7614237 5.23249418,22 7.99943992,22 L15,22 L15,21 L15,21 L15,21 Z" id="cloud-upload"/></g></g></svg>\n				</article>\n				<article class="check-icon-container">\n					<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg enable-background="new 0 0 128 128" height="128px" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="128px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M85.263,46.49L54.485,77.267L42.804,65.584c-0.781-0.782-2.047-0.782-2.828-0.002c-0.781,0.782-0.781,2.048,0,2.829    l14.51,14.513l33.605-33.607c0.781-0.779,0.781-2.046,0-2.827C87.31,45.708,86.044,45.708,85.263,46.49z M64.032,13.871    c-27.642,0-50.129,22.488-50.129,50.126c0.002,27.642,22.49,50.131,50.131,50.131h0.004c27.638,0,50.123-22.489,50.123-50.131    C114.161,36.358,91.674,13.871,64.032,13.871z M64.038,110.128h-0.004c-25.435,0-46.129-20.694-46.131-46.131    c0-25.434,20.693-46.126,46.129-46.126s46.129,20.693,46.129,46.126C110.161,89.434,89.471,110.128,64.038,110.128z"/></g></g></svg>\n				</article>\n				<article class="error-icon-container">\n					<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z" fill="#ff3333"/><polygon fill="#ff3333" points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "/></svg>\n				</article>\n			</div>\n			<div class="file-drop-text">Drop CSV Files Here!</div>\n		</div>\n		<div class="file-info"></div>\n	</div>\n</div>',
		onComplete: function() {
			core.changeState('navigation', 'begin');
		}
	})

	var tests = (function() {
		// run tests for csv file
		var checkCSV = function(csv) {
			// run our tests
			if (csv) {
				return true;
			}
			else {
				return false;
			}
		};

		var checkJSON = function(json) {
			// run tests for json file
			if (json) {
				return true;
			}
		}

		return {
			checkCSV: checkCSV,
			checkJSON: checkJSON
		}
	})();


	var util = (function() {

		// convert csv to JSON object
		var csvToJSON = function(csv) {
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
			// var json = JSON.stringify(result);

			core.publisher.fire('JSONcreated', result);
			return result;
		}

		// read file in browser
		var readFile = function(file) {
			 var textType = "text/csv";

	        if (file.type === textType) {
	            var reader = new FileReader();
	            var content = reader.readAsText(file);
	            step1Data.csvDone = false;

	            reader.onload = function(e) {
	            	core.publisher.fire('fileRead', reader.result);
	            	return reader.result;
	            }

	        } else {
	            // wrong file type
	            UI.fileGrade('fail', 'Wrong file type. Upload CSV File');
	            data.incompleteStep(1);
	        }
		}

		// get information file
		var GetFileInformation = function(JSON) {
			var key;
			var information = {
				entries: 0
			};
	
			for(key in JSON) {
				if (JSON.hasOwnProperty(key)) {
					information.entries++;
				}
			}

			return information;
		}

		// higher order function to manage the processing
		var processFile = function(file) {
			readFile(file);

			// listen for when file is done being read
			core.publisher.on('fileRead', function(csv) {
				step1Data.csv = csv;
				if (tests.checkCSV(csv)) {
					core.publisher.fire('csvChecked', step1Data.csv);
				}
			});

			// listen for when csv is being done checked to turn into a JSON
			core.publisher.on('csvChecked', function(csv) {
				data.updateData("json",csvToJSON(csv) )

				// if we pass the JSON testing, we should complete the step
				if (tests.checkJSON(data.json)) {
					UI.fileGrade('pass')
					steps.completeStep(1);
				}
				
			});
		}

		return {
			processFile: processFile
		}

	})();

	var UI = (function() {
	  	var dropContainerText = document.querySelector('.file-drop-text');
    	var uploadSVGContainer = document.querySelector('.upload-icon-container');
    	var checkSVGContainer = document.querySelector('.check-icon-container');
    	var errorSVGContainer = document.querySelector('.error-icon-container');
    	var fileInfoContainer = document.querySelector('.file-info');

	    // controls drag and upload UI
	    var fileDrop = (function() {
	    	var filedrag = document.querySelector(".file-drag");

	    	function fileDragHover(e) {
	    		e.stopPropagation();
				e.preventDefault();
	    		filedrag.className = (e.type == 'dragover') ? 'file-drag hover' : 'file-drag';
	    	}

	    	function fileSelectHandler(e) {
	    		fileDragHover(e);
	    		var files = e.dataTransfer.files;
	    		util.processFile(files[0]);
	    		fileChanged(files[0].name)
	    	}

	        filedrag.addEventListener("dragover", function(e) {
	            fileDragHover(e);
	        }, false);

	        filedrag.addEventListener("dragleave", function(e) {
	            fileDragHover(e);
	        }, false);

	        filedrag.addEventListener("drop", function(e) {
	            fileSelectHandler(e);
	        }, false);

	    })();

	    var fileChanged = function(text) {
			dropContainerText.innerHTML = text;	
	    }

	    var fileGrade = function(result, message) {
	    	if (result === "fail") {
    			uploadSVGContainer.style.opacity = 0;
    			checkSVGContainer.style.opacity = 0;
    			errorSVGContainer.style.opacity = 1;
    			fileInfoContainer.innerHTML = message;
	    	}	

	    	else {
	    		uploadSVGContainer.style.opacity = 0;
    			checkSVGContainer.style.opacity = 1;
    			errorSVGContainer.style.opacity = 0;
    			fileInfoContainer.innerHTML = "";
	    	}
	    }

	    return {
	    	fileChanged: fileChanged,
	    	fileGrade: fileGrade
	    }

	})(util);

})(steps, step1Data)
var step2 = (function() {

	steps.initStep({
		html: '<div class="page step2" data-step="2">\n	<div class="centered">\n		<h2>Step 2</h2>\n		<p>Tell me about the event and campaign.</p>\n		<form>\n			<div class="form-group">\n				<label>Recent Interaction Type</label>\n				\n				<select id="interaction-type">\n					<option disabled="disabled" selected="selected">Select an Interaction</option>\n					<option value="event-community">Event - Community</option>\n					<option value="event-industry">Event - Industry</option>\n					<option value="event-lr-conference">Event - LR Conference</option>\n					<option value="event-partner-event">Event - Partner Event</option>\n					<option value="event-roadshow">Event - Roadshow</option>\n					<option value="event-user-group">Event - User Group</option>\n					<option value="event-webinar">Event - Webinar</option>\n					<option value="marketplace">Marketplace</option>\n					<option value="personal-relationship">Personal Relationship</option>\n					<option value="purchased-list">Purchased List</option>\n					<option value="sdr">SDR</option>\n				</select>\n			</div>\n			<div class="form-group">\n				<label>Campaign</label>	\n				<input class="form-control" id="campaign-id" type="text"/>\n			</div>\n		</form>\n		\n	</div>\n</div>',
		onComplete: function() {
			core.ui.changeNavigationState('proceed');
		},
		onLoad: function() {
			core.ui.changeNavigationState();
		}
	});

	var tests = (function() {
		var validateAll = function() {
			var allAnswers = [data.interactionType, data.campaign];
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
		}
	})();

	// UI for our step
	var ui = (function() {

		//controls when form changes
		var form = (function() {
			var interactionType = document.querySelector('#interaction-type');
			var campaign = document.querySelector('#campaign-id');

			interactionType.addEventListener('change', function(e) {
				core.data.updateData("interactionType", interactionType.options[interactionType.selectedIndex].value);
				tests.validateAll();
			}, false);

			campaign.addEventListener('keyup', function() {
				core.data.updateData("campaign",campaign.value);
				tests.validateAll();
			}, false);

		})();

	})();
	
})(steps);
var step3 = (function() {

	steps.initStep({
		html: '<div class="page step3" data-step="3">\n	<div class="centered">\n			<h1>Just a minute...</h1>\n			<p class="page-description">We\'re uploading your data to Hubspot!</p>\n			\n\n			<div class="progress-bar-container">\n				<span class="progress-bar-description">Sample description</span>\n				<div class="progress-bar">\n					<span class="percentage"></span>\n				</div>\n			</div>\n\n			<div class="progress-information-container">\n				<div class="info entries-left">\n					<span class="desc">Entries Left</span>\n					<span class="value"></span>\n				</div>\n				<div class="info time-left">\n					<span class="desc">Estimated Time Left</span>\n					<span class="value"></span>\n				</div>\n			</div>\n	</div>\n</div>',
		onLoad: function() {
			core.ui.changeNavigationState('block');
			util.initUploader();
			setTimeout(function() {
				util.startUpload();	
			}, 500);

			
		},
		onComplete: function() {
			ui.doneUploading();
		}
	});

	var util = (function() {
		var sendToHubspot = function(entry) {
			var ajax = new XMLHttpRequest();

			// ajax.open(
			// 	"POST", 
			// 	'http://forms.hubspot.com/uploads/form/v2/' + 
			// 	core.config.hubspotPortal + '/' + core.config.hubspotForm + 
			// 	'?email=' + entry.email + 
			// 	'&recent_interaction=' + entry.recentInteraction +
			// 	'&recent_interaction_detail=' + entry.recentInteractionDetail +
			// 	'&recent_interaction_date=' + entry.recentInteractionDate +
			// 	'&recent_interaction_type=' + data.interactionType +
			// 	'&recent_interaction_campaign=' + data.campaign
			// );

			// ajax.send();
		}

		var initUploader = function() {
			var entries = data.json;
			var noOfEntries = entries.length;
			ui.updateProgress(entries[0], -1, noOfEntries);
		}

		var startUpload = function() {
			var i = 0;
			var entries = data.json;
			var noOfEntries = entries.length;

			// our recursive timer for loop
			function timer() {	
			    setTimeout(function () {
			    	
			    	// 1) upload to hubspot
			    	sendToHubspot(entries[i]);

			    	// 2) update UI
			    	ui.updateProgress(entries[i], i, noOfEntries);

			        if (i < noOfEntries - 1) {
			        	timer();
			        	i++	
			        }

			        else if (i === noOfEntries - 1) {
			        	steps.completeStep(3);
			        }
			    }, config.cycle_duration);
			}
			timer();
		}
			
		return {
			initUploader: initUploader,
			startUpload: startUpload
		}
		
	})();

	var ui = (function() {

		var pageTitle = document.querySelector('.step3 h1');
		var pageSubitle = document.querySelector('.step3 .page-description');
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

		function startTimer(duration, display) {
		    var start = Date.now(),
		        diff,
		        minutes,
		        seconds;
		    function timer() {
		        // get the number of seconds that have elapsed since 
		        // startTimer() was called
		        diff = duration - (((Date.now() - start) / 1000) | 0);
		        console.log(diff);

		        // does the same job as parseInt truncates the float
		        minutes = (diff / 60) | 0;
		        seconds = (diff % 60) | 0;

		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;

		        display.textContent = minutes + ":" + seconds; 

		        if (diff <= 0) {
		            // add one second so that the count down starts at the full duration
		            // example 05:00 not 04:59
		            start = Date.now() + 1000;
		        }
		    };
		    // we don't want to wait a full second before the timer starts
		    timer();
		 setInterval(timer, 1000);
		}

		var updateProgressInfo = function(entry, current, total) {
			var entriesLeft = total - current;
			var currentEntryEmail = entry.email;
			var timeLeftinSeconds = ((total * config.cycle_duration) - (current * config.cycle_duration)) / 1000;

			progressBarDescription.innerHTML = "Current Entry: " + currentEntryEmail;
			entriesLeftDescription.innerHTML = entriesLeft;
			startTimer(timeLeftinSeconds, timeleftDescription)
		}

		var doneUploading = function() {
			progressBarDescription.innerHTML = "";
			pageTitle.innerHTML = "We're done skipper!";
			pageSubitle.innerHTML = 'Form data successfully uploaded to <a href="https://app.hubspot.com/forms/' + config.hubspotPortal + '/' + config.hubspotForm + '/submissions" target="_blank">Hubspot.</a>';
		}

		return {
			updateProgress: updateProgress,
			doneUploading: doneUploading
		}

	})();

})(steps);
var init = (function() {

	// init application state
	core.changeState('navigation', 'block');

})(core);