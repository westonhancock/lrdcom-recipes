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

<#if video_info?has_content>
	<#assign banner_css = banner_css + " video-banner" />
	<#assign banner_style = "min-height: ${min_height}" />
<#else>
	<#assign banner_style = image_info + "min-height: ${min_height}" />
</#if>

<div class="${banner_css}" id="article-${.vars['reserved-article-id'].data}" style="${banner_style}" >
	<#if video_info?has_content>
		<video autoplay loop muted style="height: 100%; min-height: ${min_height};" width="100%" >
			${video_info}
			${video_image_info}
		</video>
	</#if>

	<div class="block main-banner-content max-full w100 ${text_color.data}-color text-${position.data}">
		<#if heading.data?has_content || sub_heading.data?has_content || button_text.data?has_content >
			<div class="max-med no-margin no-padding page-heading">
				<#if heading.data?has_content>
					<h1>${heading.data}</h1>
				</#if>

				<#if sub_heading.data?has_content>
					<p class="${text_color.data}-color">${sub_heading.data}</p>
				</#if>

				<#if button_text.data?has_content && button_text.button_link.data?has_content>
					<a class="btn btn-${text_color.data}" href="${button_text.button_link.data}">${button_text.data}</a>
				</#if>
			</div>
		</#if>

		<#if article_id.data?has_content>
			<#assign journal_content_util = staticUtil["com.liferay.portlet.journalcontent.util.JournalContentUtil"] />
			<#assign content_display = journal_content_util.getDisplay(groupId, article_id.data, "", locale, xmlRequest) />

			${content_display.getContent()}
		</#if>
	</div>
</div>

<style type="text/css">
	<#if css.data?has_content>
		${css.data}
	</#if>
</style>