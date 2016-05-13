var config = (
	function() {
		return {
			cycle_duration: 1500,
			hubspotFormID: '231dd439-b782-4e95-9cee-776e9a29d3f2',
			hubspotPortalID: '252686',
			hubspotAPIKey: 'cb8584d4-f2e9-4b2f-bd5d-1ca9a032bcc2',
			stepsContainerClass: 'steps-container',
			uploadContainerClass: 'file-drag',
			updateConfig: function(key, value) {
				this[key] = value;
			}
		};
	}
)();

var module = {};