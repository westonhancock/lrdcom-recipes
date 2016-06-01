
AUI().use('node', function (A) {
	//var WIN = A.getWin();

	var nav = A.one('nav#navigation');
	var startPosition;

	var fixNav = function () {
		var currentScrollPos = A.one("window").get('docScrollY');

		if (currentScrollPos > startPosition) {
			if (!nav.hasClass('sticky')) {
				nav.addClass('sticky');
			}
		} else {
			if (nav.hasClass('sticky')) {
				nav.removeClass('sticky');
			}
		}
	};

	A.on('load', function () {
		startPosition = nav.getY();
		fixNav();
	});

	A.on('resize', fixNav);
	A.on('scroll', fixNav);

	
});

window.addEventListener("load", function () {
	var nav = document.getElementById("navigation");
	document.querySelector("#navigation .parent-title").addEventListener("click", function () {
		if (nav) {
			var state = nav.getAttribute("data-state");
			if (state === null || state == "closed") { state = "open"; }
			else { state = "closed"; }
			nav.setAttribute("data-state", state);
		}
	});
});

AUI().use('tabview', function (A) {
    var tabview = new A.TabView({
		srcNode: "#cfptabs"
    });
	tabview.render();
});

AUI().use('panel', function (A) {
	var panel = new A.Panel({
		srcNode: '#cfptabs',

		zIndex: 250,
		id: "cfppanel",
		centered: true,
		constrain: true,
		modal: true,
		visible: false,
		render: true,
		/* no buttons or header */
		buttons: [],
		hideOn: [
            {
				eventName: 'clickoutside'
            },
			{
				eventName: 'click',
				node: A.one(".close-popup-content")
			}]
	});

	var openBtn = A.one('.call-for-papers .btn');

    openBtn.on('click', function () {
        panel.show();
    });
});




AUI().use(
	'anim',
	'transition',
	function (A) {
		
	/* outfit hash links with animate-scroll */
	var links = document.querySelectorAll("#navigation a");
	if (links) {
		for (var i = 0; i < links.length; i++) {
			if (links[i].hash !== "") {
				links[i].className += " animate-scroll";
				/* offset for fixed nav */
				links[i].setAttribute("data-offset", 55);
			}
		}
	}
	
       	A.all('.animate-scroll').on(
			'click',
			function (event) {
				event.preventDefault();

				var node = event.currentTarget;

				var section = A.one(node.get('hash'));

				var offset = parseInt(node.attr('data-offset'));

				var scrollTo = parseInt(section.getY());

				if (offset) {
					scrollTo -= offset;
				}

				new A.Anim(
					{
						duration: 0.5,
						easing: 'easeBoth',
						node: 'win',
						to: {
							scroll: [0, scrollTo]
						}
					}
				).run();
			}
		);
	});