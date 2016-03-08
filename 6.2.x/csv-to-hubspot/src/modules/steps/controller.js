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