<#assign portalUtil = staticUtil["com.liferay.portal.util.PortalUtil"] />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#-- <#assign path_values = stringUtil.split(currentURL, "/") />
<#assign current_article = path_values?last /> -->

<#assign current_url = htmlUtil.escapeJS(portalUtil.getCurrentCompleteURL(http_servlet_request)) />
<div class="nav-wrapper">
	<nav class="side-nav standard-padding static-top">
		<h4 class="standard-padding-vertical">Defining Digital</h4>

		<#if categories.data?has_content>
			<#list categories.siblings as category>
				<h5 class="small-caps alt-font-color">${category.data}</h5>

				<#if category.articles.data?has_content>
					<ul class="nav unstyled">
						<#list category.articles.siblings as article>
							<#assign active = "" />

							<#-- <#if article.data == current_article.getTitle()>
								<#assign active = "active" />
							</#if> -->

							<#assign url_title = stringUtil.replace(article.data?lower_case, " ", "-") />

							<li class="small-padding-vertical">
								<a class="${active}" href="/resources/l?title=${url_title}">${article.data}</a>
							</li>
						</#list>
					</ul>
				</#if>
			</#list>
		</#if>

		<#assign twitter_text = "" />
		<#assign hashtags = "" />

		<h5 class="small-caps alt-font-color">Share This Article</h5>

		<ul class="inline social-icons unstyled">
			<li class="social-icon">
				<a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${current_url}&src=sdkpreparse"><span class="icon icon-facebook"></span></a>
			</li>
			<li class="social-icon">
				<a class="" target="_blank" href="https://www.linkedin.com/cws/share?url=${current_url}&token=&lang=en_US"><span class="icon icon-linkedin"></span></a>
			</li>
			<li class="social-icon">
				<a class="" target="_blank" href="https://twitter.com/intent/tweet?hashtags=${hashtags}&text=${twitter_text}&url=${current_url}"><span class="icon icon-twitter"></span></a>
			</li>
		</ul>

		<#if nav_ad.data?has_content>
			<h5 class="small-caps alt-font-color">Upcoming Webinar</h5>

			<a class="cta cta-light" href="${nav_ad.url.data}">
				<div class="block-container micro-banner" style="background-image: url(${nav_ad.data?string})">
					<div class="text">
						${nav_ad.text.data}
					</div>

					<span href="${nav_ad.url.data}">
						${nav_ad.cta.data} <svg class="cta-icon" height="10" width="8"><use xlink:href="#caret"></use></svg>
					</span>
				</div>
			</a>
		</#if>
	</nav>
</div>

<style type="text/css">
	.content-wrapper {
		position: relative;
	}

	.affix {
		transition: top .2s linear;
	}

	.aui .content-wrapper .max-med:not(.quote), .aui .article-wrapper.max-med {
		max-width: 1200px;
		padding-left: 208px;
		padding-right: 320px;
	}

	.nav-wrapper {
		position: absolute !important;
		top: 0;
		right: 0;
		bottom: 0;
		width: 304px;
	}

	.static-top {
		position: absolute;
		top: 3em;
	}

	.static-bottom {
		bottom: 0;
		position: absolute;
	}

	.side-nav {
		background: #FFF;
		width: 304px;
		z-index: 99;
		box-sizing: border-box;
	}

	.aui .content-hub .social-icons {
		display: flex;
	}

	.aui .content-hub .social-icons .social-icon {
		align-items: center;
		background: #aaa;
		border-radius: 32px;
		display: flex;
		height: 32px;
		justify-content: center;
		margin-right: 1em;
		padding: 0 !important;
		width: 32px;
	}

	.aui .content-hub .quote-section, .aui .content-hub .top-curve, .aui .content-hub .bottom-curve {
		transform: translateX(-82px);
		margin-right: -82px;
		margin-left: -82px;
	}

	.aui .content-hub .social-icons .social-icon a {
		color: white;
	}

	.aui .content-hub .micro-banner {
		background-size: cover;
		width: 272px;
		height: 136px;
	}

</style>
<script type="text/javascript">
	AUI().ready(
		'node',
		function(A) {
			var STR_AFFIX = 'affix';
			var STR_CLIENT_HEIGHT = 'clientHeight';
			var STR_TOP = 'top';

			var INT_3EM = 48;

			var headerHeight = 768;
			var windowHeight = window.innerHeight;
			var winPosStart = 0;

			var content = A.one('.content-wrapper');
			var sideNav = A.one('.side-nav');
			var WIN = A.getWin();

			var contentEndY,
				contentHeight,
				navHeight;

			if (content) {
				headerHeight = content.getY();
				contentHeight = content.get(STR_CLIENT_HEIGHT);
				contentEndY = contentHeight + headerHeight;
			}

			if (sideNav) {
				navHeight = sideNav.get(STR_CLIENT_HEIGHT);
			}

			var navOffset = windowHeight - navHeight;

			var lastWinScrollY = headerHeight + Math.abs(navOffset);

			var getScrollDirection = function() {
				var scrollDirection = 0;

				var winScrollY = WIN.get('scrollY');

				if (winScrollY >= winPosStart) {
					scrollDirection = 1;
				}

				winPosStart = winScrollY;

				return scrollDirection;
			};

			var setNavbarScroll = function(event) {
				var sideNav = A.one('.side-nav');

				if (sideNav) {
					var winScrollY = WIN.get('scrollY');

					var scrollDirection = getScrollDirection();

					// var scrollPosIsBottom = winScrollY >= contentEndY - windowHeight;
					var scrollPosIsMiddle = contentEndY - windowHeight > winScrollY && winScrollY >= headerHeight;
					var scrollPosIsTop = winScrollY < headerHeight;

					if (scrollPosIsMiddle) {
						sideNav.addClass(STR_AFFIX);

						if (scrollDirection) {
							var top = headerHeight - winScrollY + INT_3EM;

							if (top >= navOffset) {
								sideNav.setStyle(STR_TOP, top);
							}
							else if (winScrollY >= headerHeight - navOffset) {
								sideNav.setStyle(STR_TOP, navOffset);
							}
						}
						else {
							sideNav.setStyle(STR_TOP, INT_3EM);
						}
					}
					else {
						sideNav.removeClass(STR_AFFIX);

						if (scrollPosIsTop) {
							sideNav.setStyle(STR_TOP, INT_3EM);
						}
						else {
							sideNav.setStyle(STR_TOP, contentHeight - navHeight);
						}
					}
				}
			};

			var setNavbarScrollController = function() {
				var winScrollY = WIN.get('scrollY');

				if (winScrollY <= headerHeight + Math.abs(navOffset) || winScrollY > contentEndY - windowHeight) {
					setNavbarScroll()
				}
				else if (winScrollY > headerHeight + Math.abs(navOffset) && Math.abs(winScrollY - lastWinScrollY) > 200) {
					lastWinScrollY = winScrollY;
					setNavbarScroll();
				}
			}

			var setWindowHeight = function(event) {
				windowHeight = window.innerHeight;

				navOffset = windowHeight - navHeight;
				setNavbarScroll();
			}

			setNavbarScroll()

			WIN.on(
				['mousewheel', 'scroll'],
				A.throttle(
					setNavbarScrollController,
					40
				)
			);

			WIN.on(
				'resize',
				A.debounce(
					setWindowHeight,
					100
				)
			);
		}
	);
</script>