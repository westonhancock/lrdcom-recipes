<#assign liferay_ui = taglibLiferayHash["/WEB-INF/tld/liferay-ui.tld"] />

<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />
<#assign asset_entry_local_service = serviceLocator.findService("com.liferay.portlet.asset.service.AssetEntryLocalService")>
<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>
<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />

<div class="block-container justify-center">
	<#list entries as entry>
		<#assign asset_renderer = entry.getAssetRenderer() />
		<#assign background_image = "/html/themes/control_panel/images/file_system/large/pdf.png" />

		<#if asset_renderer.getClassName() == "com.liferay.portlet.documentlibrary.model.DLFileEntry">
			<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntryByUuidAndGroupId(asset_renderer.getUuid(), asset_renderer.getGroupId()) >

			<#assign resource_id = dl_file_entry.getFileEntryId() />
			<#assign view_url = "/resource?folderId=" + dl_file_entry.getFolderId() + "&title=" + stringUtil.replace(dl_file_entry.getTitle(), " ", "+") />
		<#elseif asset_renderer.getClassName() == "com.liferay.portlet.journal.model.JournalArticle">
			<#assign article = journal_article_local_service_util.fetchJournalArticleByUuidAndGroupId(asset_renderer.getUuid(), asset_renderer.getGroupId()) >

			<#assign background_image = "/html/themes/control_panel/images/file_system/large/pdf.png" />
			<#assign view_url = "/resource?title=" + article.getUrlTitle() />
		</#if>

		<#if view_url??>
			<div class="block link-tile responsive-w50 standard-padding w25">
				<a href="${view_url}" style="background-image: url(${background_image});">
					<div class="link-tile-content">
						<h3 class="asset-entry-title">${htmlUtil.escape(asset_renderer.getTitle(locale))}</h3>

						<p class="asset-entry-summary">${htmlUtil.escape(asset_renderer.getSummary(locale))}</p>

						<div class="asset-entry-categories">
							<#list entry.getCategoryIds() as category_id >
								<#assign category = asset_category_local_service_util.fetchAssetCategory(category_id) />

								<span class="asset-entry-category">${category.getName()}</span>
							</#list>
						</div>
					</div>
				</a>
			</div>
		</#if>
	</#list>
</div>