var step1 = (function() {

	steps.initStep(
		{
			html: step1view['view.html'],
			onComplete: function() {
				core.changeState('navigation', 'begin');
			}
		}
	);

	var tests = (function() {

		// run tests for csv file
		var checkCSV = function(csv) {
			

			var hasCSV = false;

			// run our tests
			if (csv) {
				hasCSV = true;
			}

			return hasCSV;
		};

		var checkJSON = function(json) {
			// run tests for json file
			if (json) {
				return true;
			}
		};

		return {
			checkCSV: checkCSV,
			checkJSON: checkJSON
		};
	})();

	var util = (function() {
		// convert csv to JSON object
		var csvToJSON = function(csv) {
			var lines = csv.split('\n');
			var result = [];

			var headers = lines[0].split(',');

			for (var i = 1; i < lines.length; i++) {
				var currentline = lines[i].split(',');
				var obj = {};

				for (var j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j];
				}

				result.push(obj);
			}

			core.publisher.fire('JSONcreated', result);
			return result;
		};

		var getFileType = function(filename) {
			var parts = filename.split('/');

			return parts[parts.length - 1];
		};

		// read file in browser
		var readFile = function(file) {

			return new Promise(function(resolve, reject) {
				var textType = 'csv';
				var windowsTextType = 'vnd.ms-excel';
				var fileType = getFileType(file.type);

				if (fileType === textType || fileType === windowsTextType) {
					var reader = new FileReader();
					var content = reader.readAsText(file);

					step1Data.csvDone = false;

					reader.onload = function() {
						resolve(reader.result);
					}
				}
				else {
					reject(Error('Wrong File Type'));
				}
			});
		};

		// get information file
		var GetFileInformation = function(JSON) {
			var entries = 0;

			for (var key in JSON) {
				if (JSON.hasOwnProperty(key)) {
					entries++;
				}
			}

			return {
				entries: entries
			};
		};

		// higher order function to manage the processing
		var processFile = function(file) {

			readFile(file)

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
					if (!tests.checkCSV(csv)) {
						throw "CSV is no good";
					}

					return csv;
				})
				// if file is checked, parse to JSON
				.then(function(csv) {
					if (csv) {
						var json = csvToJSON(csv);

						data.updateData('json', json);
					}

					return json;
				})
				// if we pass the JSON testing, we should complete the step
				.then(function(json) {
					if (tests.checkJSON(data.json)) {
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

				util.processFile(files[0]);
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
	})(util);
})(hubspot, steps, step1Data);