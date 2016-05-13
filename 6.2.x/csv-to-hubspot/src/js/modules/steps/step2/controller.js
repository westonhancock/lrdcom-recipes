var step2 = (
	function() {
		steps.initStep(
			{
				html: step2view['view.html'],
				onComplete: function() {
					core.ui.changeNavigationState('begin');
				},
				onLoad: function() {
					core.ui.changeNavigationState('block');
					ui.renderDropdown();
					steps.completeStep(2);
				}
			}
		);

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
						dropdownHTML = '<option selected="true" value="">No Campaign</option>';
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