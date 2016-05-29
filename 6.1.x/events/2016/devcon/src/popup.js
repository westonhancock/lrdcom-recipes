<style type="text/css">
.pop-up-content {
	display: none;
}

.pop-up-content .btn {
	font-size: 1em;
	margin-top: 20px;
}

#pagePopUp {
	background: rgba(255,255,255,.95);
	border: 1px solid #CCC;
	position: absolute;
	width: 100%;
	z-index: 100;
}

#pagePopUp .pop-up-content {
	display: block;
	padding: 50px 35px 30px;
}

#pagePopUp .pop-up-content .speaker-company, #pagePopUp .pop-up-content .speaker-name, #pagePopUp .pop-up-content .speaker-title {
	display: block;
}

#pagePopUp .speaker-title, #pagePopUp .speaker-company {
	font-weight: bold;
}

#pagePopUp .speaker-name {
	color: #3AA0D5;
	font-size: 1.2em;
	margin: 5px 0;
}

#pagePopUp .speaker-company {
	font-style: italic;
}

#closePopUp {
	background: url(/documents/35935946/36204257/close-pop-up.png/98401a14-9fcf-4f9a-8f1d-4fdcb7ff0207?t=1392924953000?t=1392924953000?t=1392924953590) no-repeat;
	cursor: pointer;
	float: right;
	height: 60px;
	width: 60px;
}

.ie8 #heading .company-title .logo {
background-color: #F5FAFD;
}

.ie8.show-nav #navigation {
background: #F5FAFD;
}

#mainCarousel .aui-carousel-item {
position: static;
z-index: 20;
}

#mainCarousel menu {
z-index: auto;
}

@media all and (min-width: 720px) {
	#pagePopUp {
		width: 440px;
	}
}</style>
<script>
AUI().ready(
	'node',
	function(A) {
		var pagePopUp = A.one('#pagePopUp');

		if (!pagePopUp) {
			A.one('#wrapper').append('<div class="aui-helper-hidden" id="pagePopUp"><div id="closePopUp"></div></div>')

			pagePopUp = A.one('#pagePopUp');
		};

		var copyToPopUp = function(event) {
			var newPopUpContent = event.currentTarget.one('.pop-up-content');

			var oldPopUpContent = pagePopUp.one('.pop-up-content');

			if (!newPopUpContent) {
				return
			}

			if (oldPopUpContent) {
				oldPopUpContent.remove();
			}

			event.stopPropagation();

			pagePopUp.append(newPopUpContent.cloneNode(true));

			pagePopUp.removeClass('aui-helper-hidden');

			var popUpContent = pagePopUp.one('.pop-up-content')

			popUpContent.on(
				'clickoutside',
				function(event) {
					pagePopUp.addClass('aui-helper-hidden');

					popUpContent.detach('clickoutside');
				}
			);
		};

		var WIN = A.getWin();

		var centerOnPage = function(node) {
			var currentScrollPos = WIN.get('docScrollY');

			var winHeight = WIN.get('innerHeight');

			if (winHeight == undefined) {
				winHeight = document.documentElement.clientHeight;
			}

			var contentWidth = A.one('#content').get('clientWidth');

			var nodeHeight = node.get('clientHeight');
			var nodeWidth = node.get('clientWidth');

			xCenter = (contentWidth / 2) - (nodeWidth / 2);
			yCenter = ((winHeight / 2) - (nodeHeight / 2)) + currentScrollPos;

			node.setStyle('right', xCenter);
			node.setStyle('top', yCenter);
		};

		A.all('.pop-up').on(
			'click',
			function(event) {
				copyToPopUp(event);

				centerOnPage(pagePopUp);
			}
		);
	}
);
</script>