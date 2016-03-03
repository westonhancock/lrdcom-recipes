var core = (function() {

	var util = (function() {
		var templateRender = function(parentClass, view) {
			var container = document.querySelector('.' + parentClass);
			container.insertAdjacentHTML('beforeend', view)
		}
		
	    return {
	    	templateRender: templateRender
	    }
	})();

	return {
		config: config,
		data: data,
		util: util
	}

})(data, config);


