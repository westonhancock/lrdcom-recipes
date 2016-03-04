var config = (function() {
	return {
		// ui options
		stepsContainerClass: 'steps-container',
		uploadID : 'upload-file',
		cycle_duration : 1500,

		// hubspot options
		hubspotPortal : '299703',
		hubspotForm  : '5109c074-942c-49a6-929b-91b3441a9c3d'
	}
})();

// creates and holds our steps
var steps = (function() {

	// our master steps object
	var steps = {
		allSteps: [],
		// default number of steps
		numberOfSteps : 0,
		// pushes all steps into our object
		initSteps: function() {},
		testStep: function(step) {},
		testAll: function() {}
	};

	// our prototype step object
	var stepObject = {
		// individual data received from each step
		data : {},
		step : 0,
		// determines whether user has completed the requirements of step
		complete : false,
		// functions to run when user completes
		onComplete : undefined
	};

	var createStep = function(config) {
		var currentStep = Object.create(stepObject);
		steps.numberOfSteps++

		currentStep.data = config.data || currentStep.data;
		currentStep.step = steps.numberOfSteps;
		currentStep.html = config.html || currentStep.html;
		currentStep.complete = config.complete || currentStep.complete;
		currentStep.onComplete = config.onComplete || currentStep.onComplete;
		
		steps.allSteps.push(currentStep);
	}

	return {
		createStep : createStep
	}

})();

var data = function() {

	return {
		submissionData: {
			fieldData: {},
			interactionType: undefined,
			campaign: undefined
		},
		updateData: function() {

		}
	}

}();



var ui = (function() {
	// controls navigation
	var Navigate = (function() {

		var prevBtn = document.querySelector('.steps-navigation .prev');
		var nextBtn = document.querySelector('.steps-navigation .next');

		function movePage(direction) {
			var pages = document.querySelectorAll('.page');
		    var noOfPages = pages.length;
		    var currentPage = 0;
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
	    }

	    prevBtn.addEventListener('click', function() {
	    	movePage('back');
	    });
	    nextBtn.addEventListener('click', function() {
	    	movePage('forward');
	    });
	   
	})();
})();


var core = (function() {

	// renders HTML onto a template
	var templateRender = function(parentClass, view) {
		var container = document.querySelector('.' + parentClass);
		container.insertAdjacentHTML('beforeend', view)
	}

	return {
		// other modules
		config: config,
		data: data,
		ui: ui,
		
		// utility functions
		templateRender: templateRender
	}

})(data, config, ui);



var step1 = (function() {

	// taken from view.js
	var view = '<div class="page page-current" data-step="1">\n	<h1>Interactions Import Tool</h1>\n	<h3>Step 1</h3>\n	<p>Format your data with the following header</p>\n	<ul>\n		<li>Email</li>\n		<li>Interaction</li>\n		<li>Interaction Detail</li>\n		<li>Interaction Date</li>\n	</ul>\n	\n	<p>Save as a CSV (comma delimited) and upload here:</p>\n	\n	CSV File:\n	<div class="file-drag">Drop Files Here</div>\n\n	<div class="file-info"></div>\n	\n</div>';

	// render HTML first
	var init = (function() {
		core.templateRender(core.config.stepsContainerClass, view);
	})();

	var util = (function() {

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

			return JSON.stringify(result); 
		}

		var testFile = function(file) {

		}

		var readFile = function(file) {
			 var textType = "text/csv";

	        if (file.type === textType) {
	            var reader = new FileReader();
	            var content = reader.readAsText(file);

	            reader.onload = function(e) {
	                var json = csvToJSON(reader.result);
	                console.log(json);
	            }
	        } else {
	            // wrong file type
	            console.error("Wrong file type");
	        }
		}

		return {
			readFile : readFile,
			csvToJSON: csvToJSON
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
	    		util.readFile(files[0]);
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

	})(util);

    // document.querySelector('#' + config.uploadID).addEventListener('change', function() {
    //     var file = this.files[0];
       

    // }, false);

})(core)
var step2 = (function() {

	var view = '<div class="page" data-step="2">\n	<h3>Step 2</h3>\n	<p>Classify the interaction you\'re tracking by filling out the following form</p>\n	<label>\n		Interaction Type\n		<select id="interaction-type">\n			<option value="interaction1">Interaction 1</option>\n			<option value="interaction2">Interaction 2</option>\n		</select>\n	</label>\n\n	<div>\n		<label>\n			Campaign\n			<input type="text" id="interaction-type" />\n		</label>\n	</div>\n\n</div>';
	
	// render HTML first
	var init = (function() {
		core.templateRender(core.config.stepsContainerClass, view);
	})();

})(core);
var step3 = (function() {

	var view = '<div class="page" data-step="3">\n	<p>Submitting</p>\n</div>'
	
	// render HTML first
	var init = (function() {
		core.templateRender(core.config.stepsContainerClass, view);
	})();

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

})(core);
var app = (function() {
// might not need app if this remains empty
})(core, step1, step2, step3);