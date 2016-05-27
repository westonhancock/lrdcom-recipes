
	AUI().use(
		'node',
		function(A) {
			var WIN = A.getWin();

			var nav = A.one('nav#navigation');
			var startPosition;

			var fixNav = function() {
				var currentScrollPos = WIN.get('docScrollY');

				if (currentScrollPos > startPosition) {
					if(!nav.hasClass('sticky')) {
						nav.addClass('sticky');
					}
				} else {
					if(nav.hasClass('sticky')) {
						nav.removeClass('sticky');
					}
				}
			};

			A.on('load', function() {
				startPosition = nav.getY();
				fixNav
			});

			A.on('resize', fixNav);
			A.on('scroll', fixNav);
		}
	);
	
	window.addEventListener("load", function() {
            var nav = document.getElementById("navigation");
			document.querySelector("#navigation .parent-title").addEventListener("click", function(event) {
                    if (nav) {
                        var state = nav.getAttribute("data-state");
                        if (state === null || state == "closed") { state = "open";}
                        else {state = "closed"; }
                        nav.setAttribute("data-state", state);
                    }
           });
	});
