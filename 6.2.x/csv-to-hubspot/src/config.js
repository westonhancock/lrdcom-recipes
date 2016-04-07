var config = (
	function() {
		return {
			cycle_duration: 1500,
			hubspotForm: 'b67bd247-5a86-4a35-a2ca-43552e3d5c21',
			hubspotPortal: '299703',
			hubspotAPIKey: 'cb8584d4-f2e9-4b2f-bd5d-1ca9a032bcc2',
			stepsContainerClass: 'steps-container',
			uploadContainerClass: 'file-drag',
			updateConfig: function(key, value) {
				this[key] = value;
			}
		};
	}
)();