<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign min_height = "768px" />

<#if height.data?has_content>
	<#assign min_height = height.data />
</#if>

<#assign image_info = "" />
<#assign video_image_info = "" />
<#assign video_info = "" />

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

<#if video_info?has_content && !browserSniffer.isMobile(http_servlet_request)>
	<#assign banner_css = banner_css + " video-banner" />
	<#assign banner_style = "min-height: ${min_height}" />
<#else>
	<#assign banner_style = image_info + "min-height: ${min_height}" />
</#if>

<div class="${banner_css}" id="article-${.vars['reserved-article-id'].data}" style="${banner_style}" >
	<#if video_info?has_content && !browserSniffer.isMobile(http_servlet_request)>
		<video autoplay loop muted style="height: 100%; min-height: ${min_height};" width="100%" >
			${video_info}
			${video_image_info}
		</video>
	</#if>

	<div class="align-center block-container main-banner-content max-full no-margin w100 ${position.data}">
		<#if heading.data?has_content || sub_heading.data?has_content || button_text.data?has_content >
			<div class="max-med no-margin no-padding">
				<#include "${templatesPath}/898140" />

				<#if button_text.data?has_content>
					<div class="${button_alignment.data}">
						<#list button_text.siblings as button>
							<#if button.data?has_content && button.button_link.data?has_content>
								<a class="btn btn-${button.button_color.data}" href="${button.button_link.data}">${button.data}</a>
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
</script>