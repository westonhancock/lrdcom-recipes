// module with functionalities for handling CSV's
var CSV = (function() {

	/*  
		Turning CSV to JSON is multi-stepped needing multiple tests.
	 	We leverage the processAndTest util to accomplish this.
	*/
	var csvToJSON = function(csv) {

		var csvJSONtests = new core.processAndTest(csv);

		// step 1: check if it is a CSV file
		csvJSONtests.newProcess({
			action: function(data) {
				return data;
			},
			tests: [
				isItCSV
			],
			errorMessage: "Not a CSV File"
		});

		csvJSONtests.newProcess({
			action: function(data) {
				return data;
			},
			tests: [
				checkCSVFormatting
			],
			errorMessage: "CSV not formatted properly"
		});

		// step 2 (incomplete): let browser read the file as string
		csvJSONtests.newProcess({
			action: readFile,
			mode: "async",
			tests: [
				checkCSVFormatting
			],
			errorMessage: "Error with CSV text"
		});

		// step 3 (incomplete): turn string into JSON
		csvJSONtests.newProcess({
			action: csvStringtoJSON,
			tests: [
			],
			errorMessage: "Error with JSON"
		});

		return csvJSONtests;
	}

	var isItCSV = function(file) {
		var fileMatches = 0;
		var acceptableFileTypes = [
			"text/csv",
			"vnd.ms-excel"
		]

		// test acceptable file types
		for (var p = 0; p < acceptableFileTypes.length; p++) {
			if (file.type == acceptableFileTypes[p]) {
				fileMatches++;
			}
		}

		if (fileMatches > 0) {
			return true;
		} else {
			return false;
		}
	}

	var checkCSVFormatting = function(csv) {
		return true;
	}

	// convert csv to JSON object
	var csvStringtoJSON = function(csv) {
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
				obj[currentHeader] = currentLine;
			}

			result.push(obj);
		}

		return result;
	};

	// read file in browser
	var readFile = function(file) {
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();
			var content = reader.readAsText(file);

			reader.onload = function() {
				resolve(reader.result);
			}
		});	
		
	};

	return {
		csvToJSON: csvToJSON
	}
})();