<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />
<#assign journal_structure_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalStructureLocalServiceUtil"]>

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

<style>
.osb-www-asset-publisher-portlet .group-container {
	margin: 3em;
	border: 1px solid #E3E4E5;
}

.osb-www-asset-publisher-portlet .group-title {
	display: none;
}

.osb-www-asset-publisher-portlet .journal-content-article {
	width: 33%;
}

@media all and (max-width: 767px) {
	.osb-www-asset-publisher-portlet .journal-content-article {
		width: 100%;
	}
}
</style>