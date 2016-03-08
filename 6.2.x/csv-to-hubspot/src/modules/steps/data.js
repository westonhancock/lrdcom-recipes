// creates and holds our steps
var stepsData = (function() {

	// our step prototype
	var stepObject = {
		// individual data received from each step
		step : 0,
		// determines whether user has completed the requirements of step
		completed : false,
		// functions to run when user completes
		onComplete : undefined
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
			var step = this.allSteps[step - 1];
			step.completed = true;
			if (step.onComplete) {
				step.onComplete();	
			}
		}
	}

})();
