// module with functionalities for handling CSV's
var CSV = (function() {

	// convert csv to JSON object
	var csvToJSON = function(csv) {
		var lines = csv.split('\n');
		var result = [];

		var headers = lines[0].split(',');

		for (var i = 1; i < lines.length; i++) {
			var currentline = lines[i].split(',');
			var obj = {};

			for (var j = 0; j < headers.length; j++) {
				var currentHeader = headers[j];
				var currentLine = currentline[j];

				// data integrity by removing special characters
				currentHeader = currentHeader.replace(/[^a-zA-Z ]/g, "");
				currentLine = currentLine.replace(/[^a-zA-Z ]/g, "")

				obj[currentHeader] = currentLine;
			}

			result.push(obj);
		}

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
	var getFileInformation = function(JSON) {
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
		csvToJSON: csvToJSON,
		getFileType: getFileType,
		readFile: readFile,
		getFileInformation: getFileInformation,
		checkCSV: checkCSV,
		checkJSON: checkJSON
	}
})();