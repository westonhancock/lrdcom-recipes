var step1 = (function() {

	steps.initStep({
		html: '<div class="page step1 page-current" data-step="1">\n	<div class="centered">\n		<h1>Hubspot Interactions Import Tool</h1>\n		<p>A way to make uploading to Hubspot without filling out a form easier</p>\n		<div class="file-drag">\n			<div class="icons-container">\n				<article class="upload-icon-container">\n					<?xml version="1.0" ?><svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#333333" id="icon-130-cloud-upload"><path d="M16,16 L12.75,19.25 L12,18.5 L16.5,14 L21,18.5 L20.25,19.25 L17,16 L17,27 L16,27 L16,16 L16,16 Z M15,21 L8.00281647,21 C5.79793835,21 4,19.209139 4,17 C4,15.1046097 5.32460991,13.5117359 7.10100919,13.1021544 L7.10100919,13.1021544 C7.03467626,12.7448817 7,12.3764904 7,12 C7,8.68629134 9.68629134,6 13,6 C15.6154416,6 17.8400262,7.67345685 18.6614243,10.0080411 C19.435776,9.37781236 20.4237666,9 21.5,9 C23.8583427,9 25.7929639,10.814166 25.9844379,13.1230721 L25.9844379,13.1230721 C27.7144917,13.5630972 29,15.1320162 29,17 C29,19.2046438 27.207878,21 24.9971835,21 L18,21 L18,22 L25.0005601,22 C27.7616745,22 30,19.7558048 30,17 C30,14.9035809 28.7132907,13.1085075 26.8828633,12.3655101 L26.8828633,12.3655101 C26.3600217,9.87224935 24.1486546,8 21.5,8 C20.6371017,8 19.8206159,8.19871575 19.0938083,8.55288165 C17.8911816,6.43144875 15.6127573,5 13,5 C9.13400656,5 6,8.13400656 6,12 C6,12.1381509 6.00400207,12.275367 6.01189661,12.4115388 L6.01189661,12.4115388 C4.23965876,13.1816085 3,14.9491311 3,17 C3,19.7614237 5.23249418,22 7.99943992,22 L15,22 L15,21 L15,21 L15,21 Z" id="cloud-upload"/></g></g></svg>\n				</article>\n				<article class="check-icon-container">\n					<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg enable-background="new 0 0 128 128" height="128px" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="128px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M85.263,46.49L54.485,77.267L42.804,65.584c-0.781-0.782-2.047-0.782-2.828-0.002c-0.781,0.782-0.781,2.048,0,2.829    l14.51,14.513l33.605-33.607c0.781-0.779,0.781-2.046,0-2.827C87.31,45.708,86.044,45.708,85.263,46.49z M64.032,13.871    c-27.642,0-50.129,22.488-50.129,50.126c0.002,27.642,22.49,50.131,50.131,50.131h0.004c27.638,0,50.123-22.489,50.123-50.131    C114.161,36.358,91.674,13.871,64.032,13.871z M64.038,110.128h-0.004c-25.435,0-46.129-20.694-46.131-46.131    c0-25.434,20.693-46.126,46.129-46.126s46.129,20.693,46.129,46.126C110.161,89.434,89.471,110.128,64.038,110.128z"/></g></g></svg>\n				</article>\n				<article class="error-icon-container">\n					<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z" fill="#ff3333"/><polygon fill="#ff3333" points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "/></svg>\n				</article>\n			</div>\n			<div class="file-drop-text">Drop CSV Files Here!</div>\n		</div>\n		<div class="file-info"></div>\n	</div>\n</div>',
		onComplete: function() {
			core.changeState('navigation', 'begin');
		}
	});

	var tests = (function() {
		// run tests for csv file
		var checkCSV = function(csv) {
			// run our tests
			if (csv) {
				return true;
			}
			else {
				return false;
			}
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
				var obj = {};
				var currentline = lines[i].split(',');

				for (var j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j];
				}

				result.push(obj);
			}

			core.publisher.fire('JSONcreated', result);
			return result;
		};

		// read file in browser
		var readFile = function(file) {
			var textType = 'text/csv';

			if (file.type === textType) {
				var reader = new FileReader();
				var content = reader.readAsText(file);

				step1Data.csvDone = false;

				reader.onload = function(e) {
					core.publisher.fire('fileRead', reader.result);
					return reader.result;
				};
			}
			else {
				// wrong file type
				UI.fileGrade('fail', 'Wrong file type. Upload CSV File');
				data.incompleteStep(1);
			}
		};

		// get information file
		var GetFileInformation = function(JSON) {
			var key;
			var information = {
				entries: 0
			};

			for (key in JSON) {
				if (JSON.hasOwnProperty(key)) {
					information.entries++;
				}
			}

			return information;
		};

		// higher order function to manage the processing
		var processFile = function(file) {
			readFile(file);

			// listen for when file is done being read
			core.publisher.on(
				'fileRead',
				function(csv) {
					step1Data.csv = csv;
					if (tests.checkCSV(csv)) {
						core.publisher.fire('csvChecked', step1Data.csv);
					}
				}
			);

			// listen for when csv is being done checked to turn into a JSON
			core.publisher.on(
				'csvChecked',
				function(csv) {
					data.updateData('json', csvToJSON(csv));

					// if we pass the JSON testing, we should complete the step
					if (tests.checkJSON(data.json)) {
						UI.fileGrade('pass');
						steps.completeStep(1);
					}
				}
			);
		};

		return {
			processFile: processFile
		};
	})();

	var UI = (function() {
		var dropContainerText = document.querySelector('.file-drop-text');
		var uploadSVGContainer = document.querySelector('.upload-icon-container');
		var checkSVGContainer = document.querySelector('.check-icon-container');
		var errorSVGContainer = document.querySelector('.error-icon-container');
		var fileInfoContainer = document.querySelector('.file-info');

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
				fileInfoContainer.innerHTML = message;
			}
			else {
				uploadSVGContainer.style.opacity = 0;
				checkSVGContainer.style.opacity = 1;
				errorSVGContainer.style.opacity = 0;
				fileInfoContainer.innerHTML = '';
			}
		};

		return {
			fileChanged: fileChanged,
			fileGrade: fileGrade
		};
	})(util);
})(steps, step1Data);