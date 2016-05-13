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