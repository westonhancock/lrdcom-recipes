<#assign liferay_ui = taglibLiferayHash["/WEB-INF/tld/liferay-ui.tld"] />

<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />
<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>
<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />

<div class="block-container justify-center">
	<#list entries as entry>
		<#assign asset_renderer = entry.getAssetRenderer() />

		<#if asset_renderer.getClassName() == "com.liferay.portlet.documentlibrary.model.DLFileEntry">
			<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntryByUuidAndGroupId(asset_renderer.getUuid(), asset_renderer.getGroupId()) >

			<#assign resource_id = dl_file_entry.getFileEntryId() />
			<#assign view_url = "/resource?folderId=" + dl_file_entry.getFolderId() + "&title=" + stringUtil.replace(dl_file_entry.getTitle(), " ", "-") />
			<#--<#assign view_url = "/resource/" + dl_file_entry.getFolderId() + "/" + stringUtil.replace(dl_file_entry.getTitle(), " ", "-") />-->
		<#elseif asset_renderer.getClassName() == "com.liferay.portlet.journal.model.JournalArticle">
			<#assign article = journal_article_local_service_util.fetchJournalArticleByUuidAndGroupId(asset_renderer.getUuid(), asset_renderer.getGroupId()) >

			<#assign view_url = "/resource?title=" + article.getUrlTitle() />
			<#--<#assign view_url = "/resource/case-studies/" + article.getUrlTitle() />-->
		</#if>

		<#if view_url??>
			<div class="asset-entry block-container block resource small-padding w25">
				<a class="element-border block-container font-color justify-center no-padding text-center w100" href="${view_url}">
					<div class="resource-wrapper">
						<svg>
							<#-- pull appropriate icon here 2288397 -->
							<use xlink:href="#"></use>
						</svg>

						<h4 class="asset-entry-title">${htmlUtil.escape(asset_renderer.getTitle(locale))}</h4>
					</div>
				</a>
			</div>
		</#if>
	</#list>
</div>

<style>
	#wrapper .asset-entry.resource a:hover {
		border-color: #1C75B9;
	}

	.asset-entry.resource a {
		border-radius: 3px;
		border: 1px solid;
		display: block;
		height: 0;
		padding-bottom: 100%;
		text-decoration: none;
	}

	.resource {
		min-width: 288px;
	}

	.resource-wrapper {
		padding: 3.5em 1.5em 0;
	}

	.resource-wrapper svg {
		height: 64px;
		width: 64px;
		padding-bottom: 2em;
	}

	@media all and (max-width: 767px) and (min-width: 479px) {
		.resource.block-container.block {
			width: 50% !important;
		}
	}
</style>