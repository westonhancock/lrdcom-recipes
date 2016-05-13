var step2 = (
	function() {
		steps.initStep(
			{
				html: '<div class="page step2" data-step="2">\n	<div class="centered">\n		<h2>Step 2</h2>\n		<p>Tell me about the event and campaign.</p>\n		<form>\n			<div class="form-group">\n				<label>Campaign</label>	\n				<select class="campaign-list-dropdown">\n					\n				</select>\n			</div>\n		</form>\n		\n	</div>\n</div>',
				onComplete: function() {
					core.ui.changeNavigationState('begin');
				},
				onLoad: function() {
					core.ui.changeNavigationState('block');
					ui.renderDropdown();
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
						var campaignDropDown = document.querySelector('.campaign-list-dropdown');
						var formID = document.querySelector('#form-id');
						var interactionType = document.querySelector('#interaction-type');

						campaignDropDown.addEventListener(
							'change',
							function(e) {
								core.data.updateData('campaign', campaignDropDown.options[campaignDropDown.selectedIndex].value);
								tests.validateAll();
							},
							false
						);
					}
				)();

			// render our dropdown list
			var renderDropdown = function() {
				var campaignListTable = document.querySelector('.campaign-list-table');
				var campaignData = UTILS.tableToJson(campaignListTable);
				var campaignListDropdown = document.querySelector('.campaign-list-dropdown');
				var dropdownHTML = "";

				for (var p = 0; p < campaignData.length + 1; p++) {
					if (p == 0) {
						dropdownHTML = '<option selected="true" disabled="disabled">- Select a Campaign -</option>';
					} else {
						dropdownHTML += '<option value="' + campaignData[p - 1]["campaignid"] + '">' + campaignData[p - 1]["campaignname"] + '</option>';	
					}
				}

				campaignListDropdown.innerHTML = dropdownHTML;
			}

			return {
				renderDropdown: renderDropdown
			}
		}
	)();
	}
)(steps);