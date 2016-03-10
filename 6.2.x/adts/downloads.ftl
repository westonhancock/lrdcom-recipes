<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />

<#if entries?has_content>
	<div class="block-container">
		<#list entries as curEntry>
			<#assign entry = curEntry />
			<#assign asset_renderer = entry.getAssetRenderer() />

			<a class="w20 font-color asset-entry standard-padding download-item-container link-wrapper" href="#">
				<#list entry.getCategoryIds() as category_id >
					<#assign category = asset_category_local_service_util.fetchAssetCategory(category_id) />
		
					<span class="asset-entry-category">${category.getName()}<#if (category_id_index + 1) < entry.getCategoryIds()?size>, </#if></span>
				</#list>

				<h4>${htmlUtil.escape(asset_renderer.getTitle(locale))}</h4>
				<span class="link">Download <svg class="link" height="10" width="8"><use xlink:href="#caret" /></svg></span>
			</a>
		</#list>
	</div>
</#if>

<style>
	.aui a.link-wrapper:hover {
		text-decoration: none;
	}

	.download-item-container{
		box-sizing: border-box;
		color: #4C4C4E;
	}

	.download-item-container h4 {
		font-weight: normal;
	}

	.download-item-container span.link {
		color: #a9a9a9;
		font-weight: normal;
	}

	.download-item-container:hover .download-item, 
	.download-item-container:hover .link {
		text-decoration: none;
	}

	.download-item-container:hover h4 {
		color: #1c75b9;
	}

	.download-item-container:hover span.link {
		color: #f5a11c;
	}

	@media (max-width: 760px) {
		a.asset-entry {
			width: 100%;
		}
	}
</style>