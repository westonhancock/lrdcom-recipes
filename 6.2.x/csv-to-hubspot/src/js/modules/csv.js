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
			]
		});

		// step 2: let browser read the file as string and test formatting
		csvJSONtests.newProcess({
			action: readFile,
			mode: "async",
			tests: [
				checkSpecialCharacters,
				emptyCSVFields
			]
		});

		// step 3 (incomplete): turn string into JSON
		csvJSONtests.newProcess({
			action: csvStringtoJSON,
			tests: [
				checkValidDate
			]
		});

		return csvJSONtests;
	};

	var isItCSV = function(file) {
		var fileMatches = 0;
		var acceptableFileTypes = [
			"text/csv",
			"application/vnd.ms-excel"
		];

		// test acceptable file types
		for (var p = 0; p < acceptableFileTypes.length; p++) {
			if (file.type == acceptableFileTypes[p]) {
				fileMatches++;
			}
		}

		if (fileMatches > 0) {
			return true;
		} else {
			return "Not a CSV File. File is " + file.type;
		}
	};

	var checkSpecialCharacters = function(csv) {
		var pattern = new RegExp(/[~`!#$%\^&*+=\\[\]\\';{}|\\"<>\?]/);
		var res = pattern.test(csv);

		if (res) {
			return "No special characters allowed";
		}
		else {
			return true;
		}
	};

	var emptyCSVFields = function(csv) {
		var emptyPattern = new RegExp(",,");
		var res = emptyPattern.test(csv);

		if (res) {
			return "CSV File Missing Entries";
		}
		else {
			return true;
		}
	};

	var checkValidDate = function(json) {
		var errorMessage = "";
		var errors = 0;
		var datePattern = new RegExp(/[/]/);

		for (var g = 0; g < json.length; g++) {
			var date = json[g]["Interaction Date"];

			if (datePattern.test(date)) {
				errors++;
				errorMessage += "Date improperly formatted on line " + (g + 2) + "<br />";
			}
		}

		if (errors !== 0) {
			return errorMessage;
		}
		else {
			return true;
		}
	};

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
			};
		});

	};

	return {
		csvToJSON: csvToJSON
	};

})();