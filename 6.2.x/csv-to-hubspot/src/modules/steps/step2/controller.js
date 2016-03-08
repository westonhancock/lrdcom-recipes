var step2 = (function() {

	steps.initStep({
		html: '<div class="page" data-step="2">\n	<h3>Step 2</h3>\n	<p>Classify the interaction you\'re tracking by filling out the following form</p>\n	<label>\n		Interaction Type\n		<select id="interaction-type">\n			<option disabled="disabled" selected="selected">Select an option.</option>\n			<option value="interaction1">Interaction 1</option>\n			<option value="interaction2">Interaction 2</option>\n		</select>\n	</label>\n\n	<div>\n		<label>\n			Campaign\n			<input type="text" id="campaign-id" />\n		</label>\n	</div>\n\n</div>',
		onComplete: function() {
			core.ui.changeNavigationState('proceed');
		}
	});

	var tests = (function() {
		var validateAll = function() {
			var allAnswers = core.data.step2;
			var errors = 0;

			for (key in allAnswers) {
				if (!allAnswers[key]) {
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
				core.data.step2.interactionType = interactionType.options[interactionType.selectedIndex].value;
				tests.validateAll();
			}, false);

			campaign.addEventListener('keyup', function() {
				core.data.step2.campaign = campaign.value;
				tests.validateAll();
			}, false);

		})();

	})();
	
})(steps);