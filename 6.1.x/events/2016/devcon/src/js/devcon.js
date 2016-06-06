
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
		/* hey buddy, we are going to stay in the viewport */
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

	A.one('.call-for-papers .btn').on('click', function () {
        panel.show();
    });
	
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
                action: function(e) {
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
				function() {
					hotelPanel.centered = true;
				}
			);

	A.one('#button-74666787211').on('click', function () {
        hotelPanel.show();
    });
	
	A.on('load', function () {
	/*
	
	      var successNode2 = popup2.one('.portlet-msg-success');
        var urlString = location.href;

        if (successNode2){
            successNode2.set('innerHTML', '<h2>Thank you for your submission!</h2><p>If chosen, you will be contacted through the email address provided.</p><p"><a class="btn" href="/web/events2016/northamerica/home?cfp">Submit another proposal!</a></p>');

	*/
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