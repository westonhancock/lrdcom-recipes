<style>
	.btn-wrapper {
		margin-top: 1.5em;
	}
</style>

<#assign journal_article_local_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"]?number />
<#assign layout_local_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign layout = layout_local_service.getLayout(plid)! />

<#assign template_article_id = paramUtil.getString(http_servlet_request, "articleId") />
<#assign title = paramUtil.getString(http_servlet_request, "title") />
<#assign updateURL = paramUtil.getBoolean(http_servlet_request, "updateURL") />

<#include "${templatesPath}/1561886" />

<#if title?has_content>
	<#assign article = journal_article_local_service.getLatestArticleByUrlTitle(groupId, title, 0) />
<#elseif template_article_id?has_content>
	<#assign article = journal_article_local_service.getLatestArticle(groupId, template_article_id)! />
</#if>

<#if updateURL && article??>
	<#assign structure_id = getterUtil.getLong(article.getStructureId()) - 1 />
	<#assign template_id = getterUtil.getLong(article.getTemplateId()) - 1 />

	<#assign new_article = journal_article_local_service.addArticle(getterUtil.getLong(permissionChecker.getUserId()), getterUtil.getLong(groupId), getterUtil.getLong(article.getFolderId()), article.getTitleMap(), article.getDescriptionMap(), article.getContent(), article.getStructureId(), article.getTemplateId(), service_context)! />

	new_article: ${new_article}

	<#-- <#assign VOID = journal_article_local_service.expireArticle(permissionChecker.getUserId(), groupId, article.getArticleId(), article.getUrlTitle(), service_context) /> -->

	<#-- <script type="text/javascript">
		window.location = '/resources/l?title=${new_article.getUrlTitle()}';
	</script> -->
<#elseif title?has_content && article??>
	${journalContentUtil.getContent(groupId, article.getArticleId()?string, "", locale, xmlRequest)}

	<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
		<#assign current_url = request.attributes.CURRENT_COMPLETE_URL! />

		<#assign edit_url = portletURLFactory.create(http_servlet_request, "15", plid, "0") />
		<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
		<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
		<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
		<#assign VOID = edit_url.setParameter("struts_action", "/journal/edit_article") />
		<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
		<#assign VOID = edit_url.setParameter("articleId", "${article.getArticleId()?string}") />

		<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
			<div class="edit-wrapper">
				<a href="${edit_url}" class="taglib-icon">
					<img src="/osb-community-theme/images/spacer.png" alt="Edit" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
					<span class="taglib-text ">Edit Landing Page Template</span>
				</a>
			</div>

			<div class="btn-wrapper">
				<a href="/resources/l?articleId=${article.getArticleId()}&updateURL=1" class="btn">
					<span class="taglib-text ">Update URL</span>
				</a>
			</div>
		</span>
	</#if>
<#elseif template_article_id?has_content>
	<#assign new_article = journal_article_local_service.copyArticle(permissionChecker.getUserId(), groupId, article.getArticleId(), "", true, article.getVersion())! />

	<#assign document = saxReaderUtil.read(new_article.getContent()) />

	<#assign dynamic_elements = document.selectNodes("/root/dynamic-element[@name=\"article_ids\"]/dynamic-content") />

	<#assign journal_converter_util = staticUtil["com.liferay.portlet.journal.util.JournalConverterUtil"]>

	<#assign class_name_id = portalUtil.getClassNameId("com.liferay.portlet.journal.model.JournalArticle") />

	<#list dynamic_elements as dynamic_element>
		<#assign embedded_article_id = dynamic_element.getText() />

		<#assign embedded_article = journal_article_local_service.getLatestArticle(groupId, embedded_article_id)! />

		<#assign new_embedded_article = journal_article_local_service.copyArticle(permissionChecker.getUserId(), groupId, embedded_article_id, "", true, embedded_article.getVersion())! />

		<#assign new_embedded_article_id = new_embedded_article.getArticleId() />

		<#assign VOID = dynamic_element.setText(new_embedded_article_id) />
	</#list>

	<#assign VOID = journal_article_local_service.updateArticle(new_article.getUserId(), new_article.getGroupId(), new_article.getFolderId(), new_article.getArticleId(), new_article.getVersion(), document.asXML(), service_context) />
</#if>