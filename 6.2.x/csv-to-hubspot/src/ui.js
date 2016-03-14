var ui = (
	function() {

		var nextBtn = document.querySelector('.steps-navigation .next');
		var prevBtn = document.querySelector('.steps-navigation .prev');

		// controls navigation controls
		var navigate = (
			function() {
				var currentPage = 0;

				var movePage = function(direction) {
					var animating = false;
					var animationDuration = 700;
					var pages = document.querySelectorAll('.page');

					// don't move if page is currently animating and if reached end/beginning
					if (animating || ((direction === 'back') && currentPage === 0) || ((direction === 'forward') && currentPage + 1 === pages.length)) {
						return false;
					}

					animating = true;

					var enterAnimationClass = 'pt-page-movefromRightFade';
					var exitAnimation = 'pt-page-moveToLeftFade';
					var nextPage = pages[currentPage + 1];
					var thisPage = pages[currentPage];

					if (direction === 'back') {
						enterAnimationClass = 'pt-page-moveFromLeftFade';
						exitAnimation = 'pt-page-moveToRightFade';
						nextPage = pages[currentPage - 1];
					}

					thisPage.classList.add(exitAnimation);
					nextPage.classList.add(enterAnimationClass);
					nextPage.classList.add('page-current');

					thisPage.classList.remove('page-current');

					setTimeout(
						function() {
							nextPage.classList.remove(enterAnimationClass);
							thisPage.classList.remove(exitAnimation);

							animating = false;
						},
						animationDuration
					);

					if (direction === 'back') {
						currentPage--;
					}
					else {
						currentPage++;
					}

					// lastly tell application that page has been moved
					core.publisher.fire('pageMoved', currentPage + 1);
				};

				prevBtn.addEventListener(
					'click',
					function() {
						movePage('back');
					}
				);

				nextBtn.addEventListener(
					'click',
					function() {
						movePage('forward');
					}
				);
			}
		)();

		var changeNavigationState = function(state) {
			if (state === 'begin') {
				prevBtn.style.display = 'none';
				nextBtn.style.display = 'block';
			}

			else if (state === 'block') {
				prevBtn.style.display = 'none';
				nextBtn.style.display = 'none';
			}

			else if (state === 'proceed') {
				prevBtn.style.display = 'block';
				nextBtn.style.display = 'block';
			}

			else {
				prevBtn.style.display = 'block';
				nextBtn.style.display = 'none';
			}
		};

		return {
			changeNavigationState: changeNavigationState
		};

	}
)();