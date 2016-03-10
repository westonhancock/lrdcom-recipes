<#assign liferay_ui = taglibLiferayHash["/WEB-INF/tld/liferay-ui.tld"] />
<#assign journalArticleLocalService = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />
<#assign asset_category_local_service_util = objectUtil("com.liferay.portlet.asset.service.AssetCategoryLocalServiceUtil") />

<#assign portal_util = objectUtil("com.liferay.portal.util.PortalUtil") />
<#assign http_request = portal_util.getOriginalServletRequest(portal_util.getHttpServletRequest(renderRequest)) />

<#assign category_ids = paramUtil.getParameterValues(http_request, "categoryIds") />
<#assign category_ids_json = jsonFactoryUtil.createJSONObject() />

<#list category_ids as categories>
	<#assign categories_array = stringUtil.split(categories, " ") />

	<#if asset_category_local_service_util.fetchAssetCategory(getterUtil.getLong(categories_array[0]))??>
		<#assign cur_category = asset_category_local_service_util.fetchAssetCategory(getterUtil.getLong(categories_array[0])) />

		<#assign void = category_ids_json.put(cur_category.getVocabularyId()?string, categories) />
	</#if>
</#list>

<#if entries?has_content>
	<div class="block-container">
		<#list entries as curEntry>
			<#assign entry = curEntry />

			<#assign asset_entry_categories = entry.getCategoryIds() />

			<a class="link-wrapper w15" href="${getJournalArticleFieldValue(entry.getClassPK(), 'download_link')}">
				<div class="asset-entry download-item-container">
					<#list asset_entry_categories as category_id >
						<#assign category = asset_category_local_service_util.fetchAssetCategory(category_id) />

						<span class="asset-entry-category">${category.getName()}</span>
					</#list>

					<p class="download-item">${getJournalArticleFieldValue(entry.getClassPK(), 'download_label')}</p>
					<p class="link">Download <svg class="link" height="10" width="8"><use xlink:href="#caret" /></svg></p>
				</div>
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

<#function getJournalArticleFieldValue classPK value>
	<#assign article = journalArticleLocalService.getLatestArticle(classPK) />
	<#assign document = saxReaderUtil.read(article.content) />

	<#return document.selectSingleNode("//dynamic-element[@name='${value}']/dynamic-content").getText()>
</#function>