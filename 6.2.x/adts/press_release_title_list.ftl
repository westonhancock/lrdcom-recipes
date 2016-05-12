<#if entries?has_content >
	<div class="alt-font-border press-release-title-list standard-padding-vertical">
		<ul>
			<#list entries as curEntry>
				<#assign asset_renderer = curEntry.getAssetRenderer() />
				
			    <#assign asset_url = "/press-release?title=" + asset_renderer.getUrlTitle() />

				<li>
					${curEntry.getPublishDate()?string["MMMM dd, yyyy"]}<br />
					<a href="${asset_url}">${curEntry.getTitle(locale)}</a>
				</li>
			</#list>
		</ul>
	</div>
</#if>

<style>
	.press-release-year .group-title {
		padding-bottom: 1em;
		padding-top: 1em;
	}

	.press-release-title-list {
		border-top: 1px solid;
	}

	.press-release-title-list li {
		margin-bottom: 1em;
	}

	.press-release-title-list ul {
		list-style-type: none;
		margin-left: 0;
	}
</style>