<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />
<#assign journal_structure_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalStructureLocalServiceUtil"]>

<div class="">
	<#if entries?has_content>
		<#list entries as curEntry>
			<#assign asset_renderer = curEntry.getAssetRenderer() />
			<#assign article = asset_renderer.getArticle() />

			<#assign structure = journal_structure_local_service_util.getStructure(article.getGroupId(), article.getStructureId())>

			<#assign path = asset_renderer.render(renderRequest, renderResponse, "full_content") />

			<#assign liferay_util = taglibLiferayHash["/WEB-INF/tld/liferay-util.tld"] />

				<@liferay_util.include
					page="${path}"
					portletId="${asset_renderer.getPortletId()}"
				/>
		</#list>
	</#if>
</div>