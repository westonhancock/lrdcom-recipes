<style>
	.portlet-asset-publisher .portlet-body {
		display: flex;
	}
</style>

<#assign liferay_ui = taglibLiferayHash["/WEB-INF/tld/liferay-ui.tld"] />

<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />
<#assign asset_entry_local_service = serviceLocator.findService("com.liferay.portlet.asset.service.AssetEntryLocalService")>
<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>
<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />

<#list entries as entry>
	<#assign assetRenderer = entry.getAssetRenderer() />

	<#if assetRenderer.getClassName() == "com.liferay.portlet.documentlibrary.model.DLFileEntry">
		<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntryByUuidAndGroupId(assetRenderer.getUuid(), assetRenderer.getGroupId()) >

		<#assign resource_id = dl_file_entry.getFileEntryId() />
	</#if>

	<#if assetRenderer.getClassName() == "com.liferay.portlet.journal.model.JournalArticle">
		<#assign article = journal_article_local_service_util.fetchJournalArticleByUuidAndGroupId(assetRenderer.getUuid(), assetRenderer.getGroupId()) >

		<#assign resource_id = article.getArticleId() />
	</#if>

	<#assign viewURL = "/resource" />

	<#if resource_id??>
		<#assign viewURL = "${viewURL}?resource_id=" + resource_id />
	</#if>

	<div class="link-tile standard-padding w33">
		<a href="${viewURL}" >
			<div class="link-tile-content">
				<h3 class="asset-entry-title">${htmlUtil.escape(assetRenderer.getTitle(locale))}</h3>

				<p class="asset-entry-summary">${htmlUtil.escape(assetRenderer.getSummary(locale))}</p>

				<div class="asset-entry-categories">
					<#list entry.getCategoryIds() as category_id >
						<#assign category = asset_category_local_service_util.fetchAssetCategory(category_id) />

						<span class="asset-entry-category">${category.getName()}</span>
					</#list>
				</div>
			</div>
		</a>
	</div>
</#list>