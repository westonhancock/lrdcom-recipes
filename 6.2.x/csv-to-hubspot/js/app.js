var config = (function() {
	return {
		// ui options
		stepsContainerClass: 'steps-container',
		uploadContainerClass : 'file-drag',
		cycle_duration : 1500,

		// hubspot options
		hubspotPortal : '299703',
		hubspotForm  : '5109c074-942c-49a6-929b-91b3441a9c3d'
	}
})();	
var data = {
	step1: {
		json: undefined
	},
	step2: {
		interactionType: undefined,
		campaign: undefined
	},
	state: {
		// default navigation state 
		navigation: 'block'
	}
};
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
// creates and holds our steps
var stepsData = (function() {

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
		loadStep: function(step) {
			var currentStep = this.allSteps[step - 1];
			if (currentStep.onLoad) {
				currentStep.onLoad();
			}
		}
	}

})();

var steps = (function() {

	var initStep = function(config) {
		stepsData.createStep(config);
		// renderHTML();
	};

	var completeStep = function(step) {
		stepsData.completeStep(step);
	}

	// listen for when the page moves
	core.publisher.on("pageMoved", stepsData.loadStep, stepsData)

	return {
		initStep: initStep,
		completeStep: completeStep
	}

})(core, stepsData);
var step1Data = {
	csv: {},
	ui: {
		defaultDropText: "Drop Files Here"
	}
}
var step1 = (function() {

	steps.initStep({
		html: '<div class="page page-current" data-step="1">\n	<h1>Interactions Import Tool</h1>\n	<h3>Step 1</h3>\n	<p>Format your data with the following header</p>\n	<ul>\n		<li>Email</li>\n		<li>Interaction</li>\n		<li>Interaction Detail</li>\n		<li>Interaction Date</li>\n	</ul>\n	\n	<p>Save as a CSV (comma delimited) and upload here:</p>\n	\n	CSV File:\n	<div class="file-drag">Drop Files Here</div>\n\n	<div class="file-info"></div>\n	\n</div>',
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
	            UI.fileInform('Wrong file type. Upload CSV File');
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
				core.data.step1.json = csvToJSON(csv);
				UI.fileInform('Currently Testing');

				// if we pass the JSON testing, we should complete the step
				if (tests.checkJSON(core.data.step1.json)) {
					UI.fileInform('File is good!');
					steps.completeStep(1);
				}
				
			});
		}

		return {
			processFile: processFile
		}

	})();

	var UI = (function() {

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
	    		fileChanged('changed', files[0].name)
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

	    // displays file information
	    var fileInform = function(information) {
	    	var fileInfoContainer = document.querySelector('.file-info');
	    	fileInfoContainer.innerHTML = information;
	    };

	    var fileChanged = function(action, text) {
	    	var dropContainer = document.querySelector('.' + core.config.uploadContainerClass);
	    	
	    	if (action === "changed") {
	    		dropContainer.innerHTML = text;
	    	}
	    	else {
	    		dropContainer.innerHTML = step1Data.ui.defaultDropText;	
	    	}

	    }

	    return {
	    	fileInform: fileInform,
	    	fileChanged: fileChanged
	    }

	})(util);

})(steps, step1Data)
var step2 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="2">\n	<h3>Step 2</h3>\n	<p>Classify the interaction you\'re tracking by filling out the following form</p>\n	<label>\n		Interaction Type\n		<select id="interaction-type">\n			<option disabled="disabled" selected="selected">Select an option.</option>\n			<option value="interaction1">Interaction 1</option>\n			<option value="interaction2">Interaction 2</option>\n		</select>\n	</label>\n\n	<div>\n		<label>\n			Campaign\n			<input type="text" id="campaign-id" />\n		</label>\n	</div>\n\n</div>',
		onComplete: function() {
			core.ui.changeNavigationState('proceed');
		},
		onLoad: function() {
			core.ui.changeNavigationState();
		}
	});

	var tests = (function() {
		var validateAll = function() {
			var allAnswers = core.data.step2;
			var errors = 0;

			for (key in allAnswers) {
				if (!allAnswers[key]) {
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
				core.data.step2.interactionType = interactionType.options[interactionType.selectedIndex].value;
				tests.validateAll();
			}, false);

			campaign.addEventListener('keyup', function() {
				core.data.step2.campaign = campaign.value;
				tests.validateAll();
			}, false);

		})();

	})();
	
})(steps);
var step3 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="3">\n	<p>Submitting..</p>\n\n	<div class="progress-bar-container">\n		<div class="progress-bar"></div>\n	</div>\n</div>',
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
			function timer() {	
			    setTimeout(function () {
			    	sendToHubspot(entries[i]);
			 
			    	// 1) upload to hubspot
			    	// 2) update UI

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


	})();

})(steps);
var init = (function() {

	// init application state
	core.changeState('navigation', 'block');

})(core);