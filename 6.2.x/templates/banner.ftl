<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign min_height = "768px" />

<#if height.data?has_content>
	<#assign min_height = height.data />
</#if>

<#assign image_info = "" />
<#assign video_image_info = "" />
<#assign video_info = "" />
<#assign need_video_popup = false />

<#list media.siblings?reverse as cur_media>
	<#if cur_media.video_type.data?has_content>
		<#assign video_info = video_info + "<source src='" + cur_media.data + "' type='" + cur_media.video_type.data + "'>" />
	<#else>
		<#assign video_image_info = video_image_info + "<img src='" + cur_media.data + "' >" />
		<#assign image_info = image_info + "background-image: url(" + cur_media.data + ");" />
	</#if>
</#list>

<#assign banner_css = "align-center block-container justify-center main-banner no-padding" />
<#assign banner_style = "" />

<#if video_info?has_content && !browserSniffer.isMobile(http_servlet_request) && !browserSniffer.isIe(http_servlet_request)>
	<#assign banner_css = banner_css + " video-banner" />
	<#assign banner_style = "min-height: ${min_height}" />
<#else>
	<#assign banner_style = image_info + "min-height: ${min_height}" />
</#if>

<div class="${banner_css}" id="article-${.vars['reserved-article-id'].data}" style="${banner_style}" >
	<#if video_info?has_content && !browserSniffer.isMobile(http_servlet_request) && !browserSniffer.isIe(http_servlet_request)>
		<video autoplay loop muted style="height: 100%; min-height: ${min_height};" width="100%" >
			${video_info}
			${video_image_info}
		</video>
	</#if>

	<div class="align-center block-container main-banner-content max-full no-margin w100 ${position.data}">
		<#if heading.data?has_content || subheading.data?has_content || button_text.data?has_content >
			<div class="max-med no-margin no-padding">
				<#include "${templatesPath}/898140" />

				<#if button_text.data?has_content>
					<div class="${button_alignment.data}">
						<#list button_text.siblings as button>
							<#if button.data?has_content && button.button_link.data?has_content>
							    <#-- check if youtube field defined, don't want to rock the boat for non youtube aware articles -->
								<#if button.button_youtube_id?? && button.button_youtube_id.data?has_content>
									<#assign need_video_popup = true />
									<a class="btn btn-${button.button_color.data} pop-up-trigger" data-embed="${button.button_youtube_id.data}" href="javascript:;">${button.data}</a>
								<#else>
								<a class="btn btn-${button.button_color.data}" href="${button.button_link.data}">${button.data}</a>
								</#if>
							</#if>
						</#list>
					</div>
				</#if>
			</div>
		</#if>
	</div>
</div>

<style type="text/css">
	<#if css.data?has_content>
		${css.data}
	</#if>
</style>

<script>
	AUI().ready(
		'aui-base',
		function(A) {
			var WIN = A.getWin();
			var winHeight = WIN.get('innerHeight');

			var mainBanner = A.one('#article-${.vars['reserved-article-id'].data}');

			mainBanner.setStyle('max-height', winHeight);
		}
	);
	
	<#if need_video_popup>
		<#-- pop it UP!-->
	AUI().ready(
	'pop-up',
	function(A) {
		var activateCallback = function(classToggleInstance, node, targetNodes, targetClass) {
			if (node.attr('data-embed')) {
				var videoId = node.attr('data-embed');

				var nodeContent = '<iframe allowfullscreen="true" frameborder="0" height="450" src="//www.youtube.com/embed/' + videoId + '?wmode=transparent&autoplay=1&controls=0&showinfo=0&rel=0" width="100%"></iframe>';

				var targetNodesContent = targetNodes.one('.' + classToggleInstance.get('baseClassName') + '-content');

				if (targetNodesContent) {
					targetNodesContent.setContent(nodeContent);
				}
			}
		};

		var deactivateCallback = function(classToggleInstance, node, targetNodes, targetClass) {
				var targetNodesContent = targetNodes.one('.' + classToggleInstance.get('baseClassName') + '-content');

				if (targetNodesContent) {
					targetNodesContent.empty();
				}
		}

		new A.PopUp(
			{
				activateCallback: activateCallback,
				deactivateCallback: deactivateCallback,
				defaultCallbacks: false,
				overlayCssClass: ' video-overlay'
			}
		).render();
	}
);
	
	</#if>
</script>