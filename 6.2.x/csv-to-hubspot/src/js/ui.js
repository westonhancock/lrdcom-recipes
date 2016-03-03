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