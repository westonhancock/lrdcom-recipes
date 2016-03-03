var config = {
	formID : "hubspot-app",
	uploadID : "upload-file",
	cycle_duration : 1500,
	hubspotPortal : undefined,
	hubspotForm  : undefined
}
// our steps prototype
var steps = {
	data : undefined,
	complete : false,
	onComplete : undefined,
}

var data = {
	steps : [],
	submissionData: {
		fieldData: {},
		interactionType: undefined,
		campaign: undefined
	},
	createStep : function() {

	}
}


var parseCSV = (function() {
	var parse = function(csv) {
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

	return {
		parse : parse
	}

})();

var sendToHubspot = (function() {
	var send = function() {
		$.post("http://forms.hubspot.com/uploads/form/v2/299703/5109c074-942c-49a6-929b-91b3441a9c3d?firstname=Phil&lastname=Chan&email=phillipchan1@gmail.com&redirectUrl=www.google.com&pageUrl=liferay.com", function(data) {
			console.log(data);
		});	
	}
	
	return {
		send: send
	}

})();
var UI = (function() {

	// controls navigation UI
    var Navigate = (function() {
        var pages = document.querySelectorAll('.page');
        var noOfPages = pages.length;
        var prevBtn = document.querySelector('.steps-navigation .prev');
        var nextBtn = document.querySelector('.steps-navigation .next');
        var currentPage = 0;
        var isAnimating = false;
        var animationDuration = 700;

		function movePage(direction) {

        	// don't move if page is currently animating and if reached end/beginning
        	if (isAnimating || ((direction === 'back') && currentPage === 0) || ((direction === 'forward') && currentPage + 1 === noOfPages )) {
        		console.error("Erorr: Reached end of page or currently animating");
        		return false;
        	}

        	isAnimating = true;

        	var thisPage = pages[currentPage];
        	var nextPage = pages[currentPage + 1];
        	var exitAnimation = 'pt-page-moveToLeftFade';
        	var enterAnimationClass = 'pt-page-movefromRightFade';

        	if (direction === 'back') {
        		nextPage = pages[currentPage - 1];
        		exitAnimation = 'pt-page-moveToRightFade';
        		enterAnimationClass = 'pt-page-moveFromLeftFade';
        	}

        	thisPage.classList.add(exitAnimation);
    		nextPage.classList.add(enterAnimationClass);
    		nextPage.classList.add('page-current');

        		thisPage.classList.remove('page-current');
    		setTimeout(function() {
        		nextPage.classList.remove(enterAnimationClass);
        		thisPage.classList.remove(exitAnimation);
        		isAnimating = false;
        	}, animationDuration)

    		if (direction === 'back') {
    			currentPage--
    		} else { currentPage++}
        }

        prevBtn.addEventListener('click', function() {
        	movePage('back');
        });
        nextBtn.addEventListener('click', function() {
        	movePage('forward');
        });
       
    })();

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
    	}

    	filedrag.addEventListener("dragover", fileDragHover, false);
		filedrag.addEventListener("dragleave", fileDragHover, false);
		filedrag.addEventListener("drop", fileSelectHandler, false);

    })();

    // document.querySelector('#' + config.uploadID).addEventListener('change', function() {
    //     var file = this.files[0];
    //     var textType = "text/csv";

    //     if (file.type === textType) {
    //         var reader = new FileReader();
    //         var content = reader.readAsText(file);

    //         reader.onload = function(e) {
    //             var json = csvJSON(reader.result);
    //             console.log(json);
    //         }
    //     } else {
    //         // wrong file type
    //         console.error("Wrong file type");
    //     }

    // }, false);


})();
'use strict';

var APP = (function() {
	var shout = function() {
		console.log('shouting');
	}

	return {
		shout : shout
	}
})();


