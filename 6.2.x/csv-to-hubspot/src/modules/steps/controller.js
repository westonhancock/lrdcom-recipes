var steps = (function() {

	var initStep = function(config) {
		stepsData.createStep(config);
		// renderHTML();
	};

	var completeStep = function(step) {
		stepsData.completeStep(step);
	}

	return {
		initStep: initStep,
		completeStep: completeStep
	}

})(core, stepsData);