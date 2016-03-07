var step1 = (function() {

	steps.initStep({
		html: '<div class="page page-current" data-step="1">\n	<h1>Interactions Import Tool</h1>\n	<h3>Step 1</h3>\n	<p>Format your data with the following header</p>\n	<ul>\n		<li>Email</li>\n		<li>Interaction</li>\n		<li>Interaction Detail</li>\n		<li>Interaction Date</li>\n	</ul>\n	\n	<p>Save as a CSV (comma delimited) and upload here:</p>\n	\n	CSV File:\n	<div class="file-drag">Drop Files Here</div>\n\n	<div class="file-info"></div>\n	\n</div>'
	})

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
		}

		return {
			checkCSV: checkCSV,
			checkJSON: checkJSON
		}
	})();


	var util = (function() {

		// convert csv to JSON object
		var csvToJSON = function(csv) {
			var lines = csv.split("\n");
			var result = [];
			var headers = lines[0].split(",");

			for (var i = 1; i < lines.length; i++) {
				var obj = {};
				var currentline = lines[i].split(",");

				for (var j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j];
				}

				result.push(obj);
			}

			var json = JSON.stringify(result);

			core.publisher.fire('JSONcreated', json);
			return json;
		}

		// read file in browser
		var readFile = function(file) {
			 var textType = "text/csv";
			 var data;

	        if (file.type === textType) {
	            var reader = new FileReader();
	            var content = reader.readAsText(file);
	            step1Data.csvDone = false;

	            reader.onload = function(e) {
	            	core.publisher.fire('fileRead', reader.result);
	            	return reader.result;
	            }

	        } else {
	            // wrong file type
	            console.error("Wrong file type");
	        }
		}

		// get information file
		var GetFileInformation = function(JSON) {
			var key;
			var information = {
				entries: 0
			};
	
			for(key in JSON) {
				if (JSON.hasOwnProperty(key)) {
					information.entries++;
				}
			}

			return information;
		}

		// higher order function to manage the processing
		var processFile = function(file) {
			readFile(file);

			// listen for when file is done being read
			core.publisher.on('fileRead', function(csv) {
				step1Data.csv = csv;
				if (tests.checkCSV(csv)) {
					core.publisher.fire('csvChecked', step1Data.csv);
				}
			});

			// listen for when csv is being done checked to turn into a JSON
			core.publisher.on('csvChecked', function(csv) {
				step1Data.json = csvToJSON(csv);
				UI.fileInform('Currently Testing');

				// if we pass the JSON testing, we should change application state
				if (tests.checkJSON(step1Data.json)) {
					core.changeState('navigation', 'proceed')
				}
				
			});
		}

		return {
			processFile: processFile
		}

	})();

	var UI = (function() {

	    // controls drag and upload UI
	    var fileDrop = (function() {
	    	var filedrag = document.querySelector(".file-drag");

	    	function fileDragHover(e) {
	    		e.stopPropagation();
				e.preventDefault();
	    		filedrag.className = (e.type == 'dragover') ? 'file-drag hover' : 'file-drag';
	    	}

	    	function fileSelectHandler(e) {
	    		fileDragHover(e);
	    		var files = e.dataTransfer.files;
	    		util.processFile(files[0]);
	    		fileChanged('changed', files[0].name)
	    	}

	        filedrag.addEventListener("dragover", function(e) {
	            fileDragHover(e);
	        }, false);

	        filedrag.addEventListener("dragleave", function(e) {
	            fileDragHover(e);
	        }, false);

	        filedrag.addEventListener("drop", function(e) {
	            fileSelectHandler(e);
	        }, false);

	    })();

	    // displays file information
	    var fileInform = function(information) {
	    	var fileInfoContainer = document.querySelector('.file-info');
	    	fileInfoContainer.innerHTML = information;
	    };

	    var fileChanged = function(action, text) {
	    	var dropContainer = document.querySelector('.' + core.config.uploadContainerClass);
	    	
	    	if (action === "changed") {
	    		dropContainer.innerHTML = text;
	    	}
	    	else {
	    		dropContainer.innerHTML = step1Data.ui.defaultDropText;	
	    	}

	    }

	    return {
	    	fileInform: fileInform,
	    	fileChanged: fileChanged
	    }

	})(util);

})(steps, step1Data)