var ui = (function() {

	var prevBtn = document.querySelector('.steps-navigation .prev');
	var nextBtn = document.querySelector('.steps-navigation .next');
	
	// controls navigation controls
	var navigate = (function() {	
		var currentPage = 0;

		var movePage = function(direction) {
			var pages = document.querySelectorAll('.page');
		    var noOfPages = pages.length;
		    var isAnimating = false;
		    var animationDuration = 700;

	    	// don't move if page is currently animating and if reached end/beginning
	    	if (isAnimating || ((direction === 'back') && currentPage === 0) || ((direction === 'forward') && currentPage + 1 === noOfPages )) {
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

			// lastly tell application that page has been moved
			core.publisher.fire("pageMoved", currentPage + 1);
	    }

	    prevBtn.addEventListener('click', function() {
	    	movePage('back');
	    });
	    nextBtn.addEventListener('click', function() {
	    	movePage('forward');
	    });

	})();

	var changeNavigationState = function(state) {
		if (state === "begin") {
			prevBtn.style.display = 'none';
			nextBtn.style.display = 'block';
		}

		else if (state === "block") {
			prevBtn.style.display = 'none';
			nextBtn.style.display = 'none';
		}

		else if (state === "proceed") {
			prevBtn.style.display = 'block';
			nextBtn.style.display = 'block';
		}

		else {
			prevBtn.style.display = 'block';
			nextBtn.style.display = 'none';
		}
	}

	return {
		changeNavigationState: changeNavigationState
	}

})();