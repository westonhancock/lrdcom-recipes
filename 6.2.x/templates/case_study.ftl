<#include "${templatesPath}/43374" />

<style>
	img {
		max-width: 100%;
	}

	.cta_button {
		background: #F49B45;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		-ms-border-radius: 2px;
		border-radius: 2px;
		border-width: 0;
		color: #FFF;
		display: inline-block;
		font-size: 12px;
		font-weight: bold;
		margin: 10px;
		padding: 5px 15px;
		text-align: center;
		text-decoration: none;
		vertical-align: top;
	}

	.cta_button:hover {
		background: #EF8131;
		color: #7D342D;
	}

	.cta-section {
		text-align: center;
	}

	.carousel menu {
		display: none;
	}

	.company-profile, .quote-section {
		margin-bottom: 15px;
	}

	.company-profile img {
		margin: 5px 0;
	}

	.company-profile a {
		text-decoration: none;
	}

	.section-heading {
		font-weight: normal;
	}

	.user-story .last.aside {
		text-align: right;
		vertical-align: middle;
	}

	.user-story .callout-content {
		padding: 0 17px;
	}

	.user-story-content {
		float: left;
	}

	.user-story-content div {
		margin-bottom: 1.5em;
		padding-right: 20px;
	}

	.user-story-extras {
		float: right;
	}

	.user-story-video {
		margin: 25px 0 30px;
	}

	.quote-section {
		border: 1px solid #CACED2;
		padding: 10px;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		-ms-border-radius: 4px;
		-o-border-radius: 4px;
		border-radius: 4px;;
	}

	.quote-source {
		color: #8E8E8E;
		font-style: italics;
		text-align: right;
	}

	@media all and (max-width: 600px) {
		.user-story-video {
			height: 300px !important;
		}
	}
</style>

<div class="user-story">
	<div class="page-heading"><h1></h1></div>

	<#--
	Change to use media element and check for video

	<#if video_id.getData()?has_content>
		<iframe class="user-story-video" allowfullscreen="true" frameborder="0" height="450" src="${video_id.getData()}?wmode=transparent" width="100%"></iframe>
	</#if>
	-->

	<#if media_element.data?has_content>
		<div class="loading" style="height: 252px; margin-bottom: 18px;">
			<img src="${getterUtil.getString(request['theme-display']['path-image'])}/progress_bar/loading_animation.gif" style="margin-top: 100px;" />
		</div>

		<div class="article aui-helper-hidden">
			<div class="carousel" id="carousel" style="height: 252px;">
				<#assign count = 1 />
				<#assign activeClass = '' />

				<#list media_element.getSiblings() as element>
					<#if count == 1>
						<#assign activeClass = 'aui-carousel-item-active' />
					</#if>

					<div class="aui-carousel_item aui-carousel-item-${count} ${activeClass}">
						<img class="display-b callout" src="${element.getData()}" />
					</div>
					<#assign activeClass = '' />

					<#assign count = count + 1 />
				</#list>
			</div>
		</div>
	</#if>

	<div class="body">
		<div class="w70 portlet-column user-story-content">
			<div class="portlet-column-content left-column">
				<#list section_heading.getSiblings() as section>
					<div>
						<h2 class="section-heading">${section.getData()}</h2>
						<div>${section.section_content.getData()}</div>
					</div>
				</#list>
			</div>
		</div>
		<div class="w30 portlet-column user-story-extras">
			<div class="portlet-column-content right-column">
				<#--
				Pull from company article

				<#if company_profile.getData()?has_content || company_profile.company_image.getData()?has_content>
					<div class="company-profile">
						<b>${company_profile.getData()}</b>
						<#if company_profile.company_image.getData()?has_content >
							<img src="${company_profile.company_image.getData()}" />
						</#if>
						<p>${company_profile.company_content.getData()}</p>
						<a href="${company_profile.link_url.getData()}">${company_profile.link_label.getData()}</a>
					</div>
				</#if>
				-->

				<#if asset.data?has_content>
					<#list asset.getSiblings() as entry>
						<#assign href = entry.external_asset_link.data />

						<#if !href?has_content>
							<#assign href = entry.data />
						</#if>

						<a class="btn" href="${href}" target="_blank">${localize("download")}</a>
					</#list>
				</#if>

				<#if quote.data?has_content >
					<div class="quote-section">
						<p class="quote">${quote.data}</p>
						<p class="quote-source">${quote.quotee.data}</p>
					</div>
				</#if>
			</div>
		</div>
	</div>
</div>

<script>
	AUI().ready(
		'aui-carousel',
		'event',
		'event-resize',
		function(A) {
			var loading = A.one(".loading");
			var win = A.one("window");

			var setCarouselHeight = function(node) {
				var imageheight = node.getComputedStyle("height");
				if (imageheight == '0px') {
					imageheight = '252px';
				}
				A.one(".aui-carousel").setStyle("height", imageheight);
			}

			//init
			var component = new A.Carousel(
				{
					intervalTime: 7,
					contentBox: '#carousel',
					activeIndex: 0,
					after: {
						render: function() {
							A.one('.aui-carousel-item-1').setStyle('opacity' , 1);
						}
					}
				}
			)
			.render();

			var articlecarouselimg = A.one(".carousel img.callout");
			var articlecarouselimgHeight = articlecarouselimg.getComputedStyle("height");
			setCarouselHeight(articlecarouselimg);

			loading.toggle();
			A.one('.article.aui-helper-hidden').toggle();

			setCarouselHeight(articlecarouselimg);

			//attach listener
			win.on("resize", function() {
				setCarouselHeight(articlecarouselimg);
			});
		}
	);
</script>