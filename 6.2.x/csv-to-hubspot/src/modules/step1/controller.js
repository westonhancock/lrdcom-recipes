var step1 = (function() {

	// taken from view.js
	var view = '<div class="page page-current" data-step="1">\n	<h1>Interactions Import Tool</h1>\n	<h3>Step 1</h3>\n	<p>Format your data with the following header</p>\n	<ul>\n		<li>Email</li>\n		<li>Interaction</li>\n		<li>Interaction Detail</li>\n		<li>Interaction Date</li>\n	</ul>\n	\n	<p>Save as a CSV (comma delimited) and upload here:</p>\n	\n	CSV File:\n	<div class="file-drag">Drop Files Here</div>\n\n	<div class="file-info"></div>\n	\n</div>';

	// render HTML first
	var init = (function() {
		core.templateRender(core.config.stepsContainerClass, view);
	})();

	var util = (function() {

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

			return JSON.stringify(result); 
		}

		var testFile = function(file) {

		}

		var readFile = function(file) {
			 var textType = "text/csv";

	        if (file.type === textType) {
	            var reader = new FileReader();
	            var content = reader.readAsText(file);

	            reader.onload = function(e) {
	                var json = csvToJSON(reader.result);
	                console.log(json);
	            }
	        } else {
	            // wrong file type
	            console.error("Wrong file type");
	        }
		}

		return {
			readFile : readFile,
			csvToJSON: csvToJSON
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
	    		util.readFile(files[0]);
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

	})(util);

    // document.querySelector('#' + config.uploadID).addEventListener('change', function() {
    //     var file = this.files[0];
       

    // }, false);

})(core)