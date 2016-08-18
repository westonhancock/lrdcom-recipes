<script>
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
	
	window.addEventListener("load", function(event) {
			document.getElementById("navigation").addEventListener("click", function(event) {
				if (window.innerWidth < 1010) {
					//event.preventDefault();
					var state = this.getAttribute("data-state");
					if (state == null || state == "closed") { state = "open";}
					else {state = "closed"; }
					this.setAttribute("data-state", state);
				}
			});
	});
	
</script>