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


