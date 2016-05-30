
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
		
		zIndex: 100,
		id: "cfppanel",
		centered: true,
		modal: true,
		visible: true,
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


