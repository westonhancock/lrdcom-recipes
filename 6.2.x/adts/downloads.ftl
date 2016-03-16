<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />
<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>

<#include "${templatesPath}/1561886" />

<#if entries?has_content>
	<div class="block-container justify-center">
		<#list entries as curEntry>
			<#assign entry = curEntry />
			<#assign asset_renderer = entry.getAssetRenderer() />

			<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntryByUuidAndGroupId(asset_renderer.getUuid(), asset_renderer.getGroupId()) />
			<#assign fieldsMap = dl_file_entry.getFieldsMap(dl_file_entry.getFileVersion().getFileVersionId()) />

			<#list fieldsMap.values() as field>
				<#assign download_link = field.get("download_link") />
				<#assign value = download_link.getRenderedValue(locale) />

				<#break>
			</#list>

			<a class="asset-entry cta font-color download-item-container link-wrapper standard-padding" href="${value!}" target="_blank">
				<#list entry.getCategoryIds() as category_id >
					<#assign category = asset_category_local_service_util.fetchAssetCategory(category_id) />

					<span class="alt-font-color asset-entry-category">${category.getName()}<#if (category_id_index + 1) < entry.getCategoryIds()?size>, </#if></span>
				</#list>

				<h4>${htmlUtil.escape(asset_renderer.getTitle(locale))}</h4>
				<span class="alt-font-color link">${localize("download", "Download")} <svg class="cta-icon link" height="10" width="8"><use xlink:href="#caret" /></svg></span>
			</a>
		</#list>
	</div>
</#if>

<style>
	.aui a.link-wrapper,
	.download-item-container .download-item,
	.download-item-container .link {
		text-decoration: none;
	}

	.download-item-container {
		box-sizing: border-box;
		flex-basis: 200px;
		flex-grow: 1;
	}

	.download-item-container .asset-entry-category {
		font-size: 12px;
	}

	.download-item-container h4 {
		font-weight: normal;
	}

	.download-item-container span.link {
		color: #a9a9a9;
		font-weight: normal;
	}

	.download-item-container:hover h4 {
		color: #1c75b9;
	}

	#wrapper .download-item-container:hover span.link {
		color: #f5a11c;
	}
</style>