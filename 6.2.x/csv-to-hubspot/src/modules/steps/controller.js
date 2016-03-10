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