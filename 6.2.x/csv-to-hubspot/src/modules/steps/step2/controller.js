var step2 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="2">\n	<div class="centered">\n		<h3>Step 2</h3>\n		<p>Classify the interaction you\'re tracking by filling out the following form</p>\n		<label>\n			Recent Interaction Type\n			<select id="interaction-type">\n				<option disabled="disabled" selected="selected">Select an Interaction</option>\n				<option value="event-community">Event - Community</option>\n				<option value="event-industry">Event - Industry</option>\n				<option value="event-lr-conference">Event - LR Conference</option>\n				<option value="event-partner-event">Event - Partner Event</option>\n				<option value="event-roadshow">Event - Roadshow</option>\n				<option value="event-user-group">Event - User Group</option>\n				<option value="event-webinar">Event - Webinar</option>\n				<option value="marketplace">Marketplace</option>\n				<option value="personal-relationship">Personal Relationship</option>\n				<option value="purchased-list">Purchased List</option>\n				<option value="sdr">SDR</option>\n			</select>\n		</label>\n\n		<div>\n			<label>\n				Campaign\n				<input type="text" id="campaign-id" />\n			</label>\n		</div>\n	</div>\n</div>',
		onComplete: function() {
			core.ui.changeNavigationState('proceed');
		},
		onLoad: function() {
			core.ui.changeNavigationState();
		}
	});

	var tests = (function() {
		var validateAll = function() {
			var allAnswers = [data.interactionType, data.campaign];
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
		}
	})();

	// UI for our step
	var ui = (function() {

		//controls when form changes
		var form = (function() {
			var interactionType = document.querySelector('#interaction-type');
			var campaign = document.querySelector('#campaign-id');

			interactionType.addEventListener('change', function(e) {
				core.data.updateData("interactionType", interactionType.options[interactionType.selectedIndex].value);
				tests.validateAll();
			}, false);

			campaign.addEventListener('keyup', function() {
				core.data.updateData("campaign",campaign.value);
				tests.validateAll();
			}, false);

		})();

	})();
	
})(steps);