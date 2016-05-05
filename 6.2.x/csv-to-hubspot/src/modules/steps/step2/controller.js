var step2 = (
	function() {
		steps.initStep(
			{
				html: '<div class="page step2" data-step="2">\n	<div class="centered">\n		<h2>Step 2</h2>\n		<p>Tell me about the event and campaign.</p>\n		<form>\n			<div class="form-group">\n				<label>Campaign</label>	\n				<input class="form-control" id="campaign-id" type="text"/>\n			</div>\n		</form>\n		\n	</div>\n</div>',
				onComplete: function() {
					core.ui.changeNavigationState('begin');
				},
				onLoad: function() {
					core.ui.changeNavigationState('block');
				}
			}
		);

		var tests = (
			function() {
				var validateAll = function() {
					var allAnswers = [data.campaign];
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
			}
		)();

		// UI for our step
		var ui = (
			function() {

				// controls when form changes
				var form = (
					function() {
						var campaign = document.querySelector('#campaign-id');
						var formID = document.querySelector('#form-id');
						var interactionType = document.querySelector('#interaction-type');

						campaign.addEventListener(
							'keyup',
							function() {
								core.data.updateData('campaign', campaign.value);
								tests.validateAll();
							},
							false
						);
					}
				)();
			}
		)();
	}
)(steps);