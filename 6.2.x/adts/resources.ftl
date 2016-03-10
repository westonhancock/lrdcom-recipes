<#assign liferay_ui = taglibLiferayHash["/WEB-INF/tld/liferay-ui.tld"] />

<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />
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
			<#--<#assign view_url = "/resource/" + dl_file_entry.getFolderId() + "/" + stringUtil.replace(dl_file_entry.getTitle(), " ", "+") />-->
		<#elseif asset_renderer.getClassName() == "com.liferay.portlet.journal.model.JournalArticle">
			<#assign article = journal_article_local_service_util.fetchJournalArticleByUuidAndGroupId(asset_renderer.getUuid(), asset_renderer.getGroupId()) >

			<#assign background_image = "/html/themes/control_panel/images/file_system/large/pdf.png" />
			<#assign view_url = "/resource?title=" + article.getUrlTitle() />
			<#--<#assign view_url = "/resource/case-studies/" + article.getUrlTitle() />-->
		</#if>

		<#if view_url??>
			<div class="asset-entry block-container block resource responsive-w50 standard-padding w25">
				<a class="align-center block-container justify-center element-border text-center w100" href="${view_url}">
					<div>
						<svg width="46" height="58" viewBox="0 0 46 58" xmlns="http://www.w3.org/2000/svg">
							<g stroke-width="1.5" stroke="currentColor" fill="none" fill-rule="evenodd">
								<path d="M9.75 15.25h12M9.75 45.25h26M44.75 15.25h-14v-14"/>
								<path d="M44.75 57.25h-44v-56h30l14 14v42z"/>
								<path d="M16.918 37.364L9.75 30.196l7.168-7.167M28.582 23.03l7.168 7.167-7.168 7.167M25.024 21.76l-4.55 16.98"/>
							</g>
						</svg>

						<h3 class="asset-entry-title">${htmlUtil.escape(asset_renderer.getTitle(locale))}</h3>
					</div>
				</a>
			</div>
		</#if>
	</#list>
</div>

<style>
	.asset-entry.resource a {
		border: 1px solid;
	}

	#wrapper .asset-entry.resource a:hover {
		border-color: dodgerblue;
	}
</style>