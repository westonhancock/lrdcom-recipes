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