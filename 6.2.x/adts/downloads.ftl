<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />

<#if entries?has_content>
	<div class="block-container">
		<#list entries as curEntry>
			<#assign entry = curEntry />
			<#assign asset_renderer = entry.getAssetRenderer() />

			<a class="asset-entry download-item-container link-wrapper" href="#">
				<#list entry.getCategoryIds() as category_id >
					<#assign category = asset_category_local_service_util.fetchAssetCategory(category_id) />

					<span class="asset-entry-category">${category.getName()}</span>
				</#list>

				<h3>${htmlUtil.escape(asset_renderer.getTitle(locale))}</h3>
				<span class="link">Download <svg class="link" height="10" width="8"><use xlink:href="#caret" /></svg></span>
			</a>
		</#list>
	</div>
</#if>

<style>
	.aui a.link-wrapper:hover {
		text-decoration: none;
	}

	.asset-entry-category {
		background: lightgrey;
		padding: 5px;
	}

	.download-item-container{
		box-sizing: border-box;
		color: #4C4C4E;
		padding: 12px;
	}

	.download-item-container .download-item {
		font-size: 1.4em;
		font-weight: normal;
	}

	.download-item-container:hover .download-item {
		color: #1C75B9;
	}

	.download-item-container:hover .download-item, .download-item-container:hover .link {
		text-decoration: none;
	}

	.download-item-container:hover .link {
		color: #F5A11D;
	}
</style>