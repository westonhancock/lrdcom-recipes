var step2 = (function() {

	steps.initStep({
		html: '<div class="page step2" data-step="2">\n	<div class="centered">\n		<h2>Step 2</h2>\n		<p>Tell me about the event and campaign.</p>\n		<form>\n			<div class="form-group">\n				<label>Recent Interaction Type</label>\n				\n				<select id="interaction-type">\n					<option disabled="disabled" selected="selected">Select an Interaction</option>\n					<option value="event-community">Event - Community</option>\n					<option value="event-industry">Event - Industry</option>\n					<option value="event-lr-conference">Event - LR Conference</option>\n					<option value="event-partner-event">Event - Partner Event</option>\n					<option value="event-roadshow">Event - Roadshow</option>\n					<option value="event-user-group">Event - User Group</option>\n					<option value="event-webinar">Event - Webinar</option>\n					<option value="marketplace">Marketplace</option>\n					<option value="personal-relationship">Personal Relationship</option>\n					<option value="purchased-list">Purchased List</option>\n					<option value="sdr">SDR</option>\n				</select>\n			</div>\n			<div class="form-group">\n				<label>Campaign</label>	\n				<input class="form-control" id="campaign-id" type="text"/>\n			</div>\n			<div class="form-group">\n				<label>Form ID</label>	\n				<input class="form-control" id="form-id" value="b67bd247-5a86-4a35-a2ca-43552e3d5c21" type="text"/>\n			</div>\n		</form>\n		\n	</div>\n</div>',
		onComplete: function() {
			core.ui.changeNavigationState('begin');
		},
		onLoad: function() {
			core.ui.changeNavigationState('block');
		}
	});

	var tests = (function() {
		var validateAll = function() {
			var allAnswers = [data.interactionType, data.campaign, core.config.hubspotForm];
			var errors = 0;

			for (var x = 0; x < allAnswers.length; x++) {
				if (!allAnswers[x]) {
					errors++;
				}
			}

			if (errors === 0) {
				steps.completeStep(2);
				return true;
			}
		};

		return {
			validateAll: validateAll
		};
	})();

	// UI for our step
	var ui = (function() {
		// controls when form changes
		var form = (function() {
			var interactionType = document.querySelector('#interaction-type');
			var campaign = document.querySelector('#campaign-id');
			var formID = document.querySelector('#form-id');

			interactionType.addEventListener(
				'change',
				function(e) {
					core.data.updateData('interactionType', interactionType.options[interactionType.selectedIndex].value);
					tests.validateAll();
				},
				false
			);

			campaign.addEventListener(
				'keyup',
				function() {
					core.data.updateData('campaign', campaign.value);
					tests.validateAll();
				},
				false
			);

			formID.addEventListener(
				'keyup',
				function() {
					core.config.updateConfig('hubspotForm', formID.value);
					tests.validateAll();
				},
				false
			);
		})();
	})();
})(steps);