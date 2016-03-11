var config = (function() {
	return {
		cycle_duration: 1500,
		hubspotForm: 'b67bd247-5a86-4a35-a2ca-43552e3d5c21',
		hubspotPortal: '299703',
		stepsContainerClass: 'steps-container',
		uploadContainerClass: 'file-drag',
		updateConfig: function(key, value) {
			this[key] = value;
		}
	};
})();