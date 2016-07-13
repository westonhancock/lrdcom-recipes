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
	<#assign article = journal_article_local_service.fetchArticleByUrlTitle(groupId, title) />
<#elseif template_article_id?has_content>
	<#assign article = journal_article_local_service.getLatestArticle(groupId, template_article_id)! />
</#if>

<#if updateURL && article??>
	<#assign article_url = stringUtil.replace(article.getTitle(), " ", "-") />

	<#assign article = journal_article_local_service.updateStatus(permissionChecker.getUserId(), article, 0, stringUtil.lowerCase(article_url), null, service_context)! />
</#if>

<#if title?has_content && article??>
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
				<a href="/resources/l?title=${article.getUrlTitle()}&updateURL=1" class="btn">
					<span class="taglib-text ">Update URL</span>
				</a>
			</div>
		</span>
	</#if>
<#elseif template_article_id?has_content>
	<#assign new_article = journal_article_local_service.copyArticle(permissionChecker.getUserId(), groupId, article.getArticleId(), "", true, article.getVersion())! />

	<#assign document = saxReaderUtil.read(new_article.getContent()) />

	<#assign dynamic_elements = document.selectNodes("/root/dynamic-element[@name=\"article_ids\"]/dynamic-content") />

	<#assign ddm_structure_local_service = serviceLocator.findService("com.liferay.portlet.dynamicdatamapping.service.DDMStructureLocalService") />  
	<#assign journal_converter_util = staticUtil["com.liferay.portlet.journal.util.JournalConverterUtil"]>

	<#assign class_name_id = portalUtil.getClassNameId("com.liferay.portlet.journal.model.JournalArticle") />

	<#list dynamic_elements as dynamic_element>
	<!-- create a macro that takes the embedded_article_id, copy the article, update new_article's embedded article_ids -->

		<#assign embedded_article_id = dynamic_element.getText() />
	
		<#assign embedded_article = journal_article_local_service.getLatestArticle(groupId, embedded_article_id)! />

		<#assign new_embedded_article = journal_article_local_service.copyArticle(permissionChecker.getUserId(), groupId, embedded_article.getArticleId(), "", true, embedded_article.getVersion())! />
		
		<#assign ddm_structure = ddm_structure_local_service.fetchStructure(groupId, class_name_id, article.getStructureId())! />

		<#assign ddm_structure_fields = journal_converter_util.getDDMFields(ddm_structure, new_embedded_article.getContent()) />


		<!-- update field value for article_ids -->

	</#list>
	
	<!-- update new_article with new_content -->
	<#assign void = journal_article_service.updateArticle(new_article.getGroupId(), new_article.getFolderId(), new_article.getArticleId(), new_article.getVersion(), document.asXML(), service_context) />

</#if>