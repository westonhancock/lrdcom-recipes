<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"]?number />
<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layout = layout_service.getLayout(plid)! />

<#assign title = paramUtil.getString(http_servlet_request, "title", "") />

<#include "${templatesPath}/1561886" />

<div class="press-release-display">
	<a class="cta" href="/press-releases">${languageUtil.format(locale, "back-to-x", localize("press-releases", "Press Releases"))}</a>

	<#assign journal_article_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService")>

	<#assign article = journal_article_service.fetchLatestArticleByUrlTitle(scopeGroupId, title, 0)!"">

	<div class="block-container no-padding">
		<#if article?has_content>
			${journalContentUtil.getContent(scopeGroupId, article.getArticleId(), "", locale, xmlRequest)}
		<#else>
			<p class="standard-padding-vertical">
				Press Release not found.
			</p>
		</#if>
	</div>

	<#if article?has_content && layoutPermission.contains(permissionChecker, layout, "UPDATE")>
		<#assign current_url = request.attributes.CURRENT_COMPLETE_URL! />

		<#assign edit_url = portletURLFactory.create(http_servlet_request, "15", plid, "0") />
		<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
		<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
		<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
		<#assign VOID = edit_url.setParameter("struts_action", "/journal/edit_article") />
		<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
		<#assign VOID = edit_url.setParameter("articleId", "${article.getArticleId()?string}") />

		<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
			<a class="taglib-icon" href="${edit_url}">
				<img alt="Edit" src="/osb-community-theme/images/spacer.png" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
				<span class="taglib-text ">Edit</span>
			</a>
		</span>
	</#if>
</div>