var steps = (function() {

	var initStep = function(config) {
		stepsData.createStep(config);
		// renderHTML();
	};

	return {
		initStep : initStep
	}

})(core, stepsData);