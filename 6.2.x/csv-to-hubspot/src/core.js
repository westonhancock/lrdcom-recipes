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


