var step1 = (function() {

	steps.initStep(
		{
			html: step1view['view.html'],
			onComplete: function() {
				core.changeState('navigation', 'begin');
			}
		}
	);

	var controller = (function() {
		
		// higher order function to manage the processing
		var processFile = function(file) {

			CSV.readFile(file)

				// when file is done being read, test csv
				.then(function(csv) {
					step1Data.csv = csv;
					
					return csv;
				})
				// if there's an error with csv
				.catch(function(e) {
					UI.fileGrade('fail', 'Wrong file type. Upload CSV File');
					data.incompleteStep(1);
				})
				// additional tests on csv
				.then(function(csv) {
					if (!CSV.checkCSV(csv)) {
						throw "CSV is no good";
					}

					return csv;
				})
				// if file is checked, parse to JSON
				.then(function(csv) {
					if (csv) {
						var json = CSV.csvToJSON(csv);

						data.updateData('json', json);
					}

					return json;
				})
				// if we pass the JSON testing, we should complete the step
				.then(function(json) {
					if (CSV.checkJSON(data.json)) {
						steps.completeStep(1);
					}
				})
		};

		return {
			processFile: processFile
		};
	})();

	var UI = (function() {
		var checkSVGContainer = document.querySelector('.check-icon-container');
		var dropContainerText = document.querySelector('.file-drop-text');
		var errorSVGContainer = document.querySelector('.error-icon-container');
		var fileInfoContainer = document.querySelector('.file-info');
		var uploadSVGContainer = document.querySelector('.upload-icon-container');

		// controls drag and upload UI
		var fileDrop = (function() {
			var filedrag = document.querySelector('.file-drag');

			function fileDragHover(e) {
				e.stopPropagation();
				e.preventDefault();
				filedrag.className = (e.type == 'dragover') ? 'file-drag hover' : 'file-drag';
			}

			function fileSelectHandler(e) {
				fileDragHover(e);
				var files = e.dataTransfer.files;

				controller.processFile(files[0]);
				fileChanged(files[0].name);
			}

			filedrag.addEventListener(
				'dragover',
				function(e) {
					fileDragHover(e);
				},
				false
			);

			filedrag.addEventListener(
				'dragleave',
				function(e) {
					fileDragHover(e);
				},
				false
			);

			filedrag.addEventListener(
				'drop',
				function(e) {
					fileSelectHandler(e);
				},
				false
			);

		})();

		var fileChanged = function(text) {
			dropContainerText.innerHTML = text;
		};

		var fileGrade = function(result, message) {
			if (result === 'fail') {
				uploadSVGContainer.style.opacity = 0;
				checkSVGContainer.style.opacity = 0;
				errorSVGContainer.style.opacity = 1;
				ui.newMessage(message, "error");
			}
			else {
				uploadSVGContainer.style.opacity = 0;
				checkSVGContainer.style.opacity = 1;
				errorSVGContainer.style.opacity = 0;
				ui.closeMessage();
			}
		};

		return {
			fileChanged: fileChanged,
			fileGrade: fileGrade
		};
	})(controller);
})(CSV, hubspot, steps, step1Data);