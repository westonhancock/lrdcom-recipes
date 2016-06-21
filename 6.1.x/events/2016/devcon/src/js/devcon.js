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

AUI().use('panel', function (A) {

	var hotelPanel = new A.Panel({
		srcNode: '#hotelPop',
		zIndex: 250,
		id: "hotelpanel",
		centered: true,
		/* hey buddy, we are going to stay in the viewport */
		constrain: true,
		modal: true,
		visible: false,
		render: true,
		buttons: [
			{
                value: " ",
                action: function (e) {
                    e.preventDefault();
                    hotelPanel.hide();
                },
                section: A.WidgetStdMod.HEADER,
				classNames: "close-popup-content"
			}
		],
		hideOn: [
            {
				eventName: 'clickoutside'
            }]
	});
	A.one('window').on(
		'resize',
		function () {
			hotelPanel.centered = true;
		}
	);

	A.one('#button-74666787211').on('click', function () {
        hotelPanel.show();
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
				} else {
					if (links[i].innerHTML == "Recap '15") {
						links[i].target = "_blank";
					}
				}
			}
		}
		
		var nav = document.getElementById("navigation");
		A.all('.animate-scroll').on(
			'click',
			function (event) {
				nav.setAttribute("data-state", "closed");
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