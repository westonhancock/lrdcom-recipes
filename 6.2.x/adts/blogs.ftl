<#assign aui = taglibLiferayHash["/WEB-INF/tld/aui.tld"] />
<#assign liferay_portlet = taglibLiferayHash["/WEB-INF/tld/liferay-portlet.tld"] />
<#assign liferay_ui = taglibLiferayHash["/WEB-INF/tld/liferay-ui.tld"] />

<#assign asset_category_local_service = serviceLocator.findService("com.liferay.portlet.asset.service.AssetCategoryLocalService")>
<#assign asset_entry_local_service = serviceLocator.findService("com.liferay.portlet.asset.service.AssetEntryLocalService")>
<#assign blogs_entry_local_service = serviceLocator.findService("com.liferay.portlet.blogs.service.BlogsEntryLocalService")>

<#assign portlet_URL_util = objectUtil("com.liferay.portlet.PortletURLUtil") />

<#assign order_by_comparator_factory_util = staticUtil["com.liferay.portal.kernel.util.OrderByComparatorFactoryUtil"]>

<#assign portlet_namespace = renderResponse.getNamespace()>

<#assign blogs_vocabulary_id = getterUtil.getLong(166994) />
<#assign highlighted_category_id = getterUtil.getLong(211321) />
<#assign asset_category_id = paramUtil.getLong(request, "assetCategoryId") />
<#assign asset_entry_id = paramUtil.getLong(request, "assetEntryId") />

<#assign default_end_count = getterUtil.getInteger(10) />
<#assign default_start_count = getterUtil.getInteger(0) />

<div id="blogs">
	<div class=" block-container nav-container no-padding">
		<div id="categoriesNav">
			<div class="blogs-menu">
				<h3>
					<@liferay_ui.message key="categories" />
				</h3>
			</div>

			<ul class="categories-content">
				<#assign categories_order_by = order_by_comparator_factory_util.create("AssetCategory", ["name", false])>
				<#assign asset_categories = asset_category_local_service.getVocabularyRootCategories(blogs_vocabulary_id, -1, -1, categories_order_by) />

				<#list asset_categories as asset_category>
					<#if asset_category.categoryId == 167001>
						<#assign category_name = "tech">
					<#elseif asset_category.categoryId == 166998>
						<#assign category_name = "liferay">
					<#elseif asset_category.categoryId == 166999>
						<#assign category_name = "business">
					<#else>
						<#assign category_name = "trending">
					</#if>

					<#if category_name != "trending">
						<li class="category parent-category">
							<a class="${category_name}" href="javascript:;" data-category-id="${asset_category.getCategoryId()}" onclick="${portlet_namespace}getBlogEntries('${asset_category.getCategoryId()}');">
								<h4>
									<svg class="svg-align" id="${category_name}"><use xlink:href="#blogs-${category_name}" /></svg>
									${asset_category.getName()}
								</h4>
							</a>

							<ul>
								<#list asset_category_local_service.getChildCategories(asset_category.getCategoryId()) as child_asset_category>
									<li class="category child-category">
										<a href="javascript:;" data-category-id="${child_asset_category.getCategoryId()}" onclick="${portlet_namespace}getBlogEntries('${child_asset_category.getCategoryId()}');">${child_asset_category.getName()}</a>
									</li>
								</#list>
							</ul>
						</li>
					</#if>
				</#list>
			</ul>

			<div class="block-container justify-space-around social-nav">
				<a href="">
					<svg><use xlink:href="#blogs-fb" /></svg>
				</a>
				<a href="">
					<svg><use xlink:href="#blogs-linkedin" /></svg>
				</a>
				<a href="">
					<svg><use xlink:href="#blogs-rss" /></svg>
				</a>
				<a href="">
					<svg><use xlink:href="#blogs-twitter" /></svg>
				</a>
				<a href="">
					<svg><use xlink:href="#blogs-youtube" /></svg>
				</a>
			</div>
		</div>

		<div id="blogsList">
			<div class="block-container blogs-menu justify-center">
				<a href="javascript:;" class="class-toggle" data-target-class="show-blogs-nav" data-target-nodes="#wrapper">
					<svg class="svg-align"><use xlink:href="#blogs-hamburger" /></svg>
				</a>

				<a href="javascript:;" onclick="${portlet_namespace}getBlogEntries(${highlighted_category_id});">
					<svg class="svg-align"><use xlink:href="#blogs-trending" /></svg>
					<@liferay_ui.message key="highlighted" />
				</a>

				<a href="javascript:;" onclick="${portlet_namespace}getBlogEntries(0);">
					<svg class="svg-align"><use xlink:href="#blogs-latest" /></svg>
					<@liferay_ui.message key="latest" />
				</a>
			</div>

			<div class="blogs-list-container">
				<ul class="blogs-list-content">
					<#-- <#if asset_category_id != 0 > -->
						<#assign asset_entries = asset_entry_local_service.getAssetCategoryAssetEntries(asset_category_id, default_start_count, default_end_count) />
					<#-- <#else> -->
<#-- pull only from blogs -->
					<#-- 	<#assign asset_entries = asset_entry_local_service.getAssetEntries(default_start_count, default_end_count) />
					</#if> -->

					<#list asset_entries as asset_entry>
<#-- null check this -->
						<#assign blogs_entry = blogs_entry_local_service.getBlogsEntryByUuidAndGroupId(asset_entry.getClassUuid(), asset_entry.getGroupId()) />

						<li class="blogs-list-item">
							<a href="javascript:;" onclick="${portlet_namespace}getBlogEntryContent('${asset_entry.getEntryId()}', '${asset_category_id}')">
								<h4 class="blog-title">${htmlUtil.escape(asset_entry.getTitle())}</h4>
								<span class="blog-author">${htmlUtil.escape(asset_entry.getUserName())}</span>
								<time class="blog-date">${dateUtil.getDate(asset_entry.getPublishDate(), "MMM dd", locale)}</time>
							</a>
						</li>
					</#list>
				</ul>
			</div>
		</div>
	</div>

	<div class="block-container" id="blogsDisplay">
		<#if asset_entry_id != 0>
			<#assign asset_entry = asset_entry_local_service.getEntry(asset_entry_id) />
			<#assign blogs_entry = blogs_entry_local_service.getBlogsEntryByUuidAndGroupId(asset_entry.getClassUuid(), asset_entry.getGroupId()) />

<#-- undefined -->
<#-- 		<#assign previous_entry = asset_entry_local_service.getPreviousEntry(asset_entry_id) />
			<#assign next_entry = asset_entry_local_service.getNextEntry(asset_entry_id) /> -->

			<div class="block-container previous-next">
				<a class="element-background" href="">
					<svg class="svg-align"><use xlink:href="#blogs-previous" /></svg>
					grab previous post title
				</a>
				<a class="element-background" href="">
					grab next post title
					<svg class="svg-align"><use xlink:href="#blogs-next" /></svg>
				</a>
			</div>

			<div class="blog-entry" >
				<#if blogs_entry.smallImage == true>
					<img src="${blogs_entry.getSmallImageURL()}">
				</#if>

				<h2 class="blog-title">${htmlUtil.escape(blogs_entry.getTitle())}</h2>
				<span class="blog-author">${htmlUtil.escape(blogs_entry.getUserName())}</span>
				<time class="blog-date">${dateUtil.getDate(blogs_entry.getCreateDate(), "MMM dd", locale)}</time>
				<div class="social-media-share"><@liferay_ui.message key="share" />
					<a href="">
						<svg class="svg-align" id="shareEmail"><use xlink:href="#blogs-email" /></svg>
					</a>
					<a href="">
						<svg class="svg-align" id="shareFB"><use xlink:href="#blogs-fb" /></svg>
					</a>
					<a href="">
						<svg class="svg-align" id="shareGooglePlus"><use xlink:href="#blogs-googleplus" /></svg>
					</a>
					<a href="">
						<svg class="svg-align" id="shareLinkedIn"><use xlink:href="#blogs-linkedin" /></svg>
					</a>
					<a href="">
						<svg class="svg-align" id="shareTwitter"><use xlink:href="#blogs-twitter" /></svg>
					</a>
				</div>

				<div class="blog-content">${blogs_entry.getContent()}</div>

				</form>

				<@get_discussion />
			</div>
		<#else>
			<#assign asset_entries = asset_entry_local_service.getAssetCategoryAssetEntries(asset_category_id, default_start_count, 5) />

			<#list asset_entries as asset_entry>
				<#assign blogs_entry = blogs_entry_local_service.getBlogsEntryByUuidAndGroupId(asset_entry.getClassUuid(), asset_entry.getGroupId()) />
				<#assign summary = blogs_entry.getDescription() />

				<#if (validator.isNull(summary))>
					<#assign summary = blogs_entry.getContent() />
				</#if>

				<a class="blog-preview standard-padding" href="javascript:;" onclick="${portlet_namespace}getBlogEntryContent('${asset_entry.getEntryId()}', '${asset_category_id}')">
					<#if blogs_entry.smallImage == true>
						<img src="${blogs_entry.getSmallImageURL()}">
					</#if>

					<h2 class="blog-title">${htmlUtil.escape(blogs_entry.getTitle())}</h2>
					<span class="blog-author">${htmlUtil.escape(blogs_entry.getUserName())}</span>
					<time class="blog-date">${dateUtil.getDate(blogs_entry.getCreateDate(), "MMM dd", locale)}</time>
					<div class="blog-summary">${stringUtil.shorten(htmlUtil.stripHtml(summary), 100)}</div>
				</a>

				<div class="separator"><!-- --></div>
			</#list>
		</#if>
	</div>
</div>

<#macro get_discussion>
	<#assign discussion_URL = renderResponse.createActionURL() />
	<#assign asset_renderer = asset_entry.getAssetRenderer() />

	<#if validator.isNotNull(asset_renderer.getDiscussionPath()) && (enableComments == "true")>
		<#assign void = discussion_URL.setParameter("struts_action", "/blogs/" + asset_renderer.getDiscussionPath()) />

		<div class="blogs-comments">
			<@liferay_ui["discussion"]
				className=asset_entry.getClassName()
				classPK=asset_entry.getClassPK()
				formAction=discussion_URL?string
				formName="fm2"
				ratingsEnabled=false
				redirect=themeDisplay.getURLCurrent()
				userId=asset_entry.getUserId()
			/>
		</div>
	</#if>
</#macro>

<style>
	h1 {
		font-size: 2em;
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#blogs h4 {
		font-size: 1.3em;
		font-weight: 500;
	}

	#blogs ul {
		margin: 0;
	}

	#blogs svg {
		height: 21px;
		width: 21px;
	}

	#blogs #blogsDisplay {
		box-sizing: border-box;
		margin: 0 auto;
		max-width: 720px;
		overflow: hidden;
	}

	#blogs #blogsDisplay, #blogs #blogsList {
		min-height: 500px;
	}

	#blogs #blogsDisplay .blog-preview, #blogs #blogsDisplay .previous-next {
		text-decoration: none;
	}

	#blogs #blogsDisplay .blog-preview {
		-ms-flex: 1 0 30%;
		-moz-flex: 1 0 30%;
		-webkit-flex: 1 0 30%;
		flex: 1 0 30%;
	}

	#blogs #blogsDisplay .blog-preview:first-child {
		flex-basis: 100%;
	}

	#blogs #blogsDisplay .previous-next svg {
		fill: transparent;
		stroke: #4C4C4E;
	}

	#blogs #blogsList {
		width: 300px;
	}

	#blogs #blogsList .blogs-menu {
		border-bottom: 1px solid #E3E4E5;
	}

	#blogs #blogsList .blogs-menu a {
		padding: 0 10px;
	}

	#blogs #blogsList .blogs-list-item a {
		border-bottom: 1px solid #E3E4E5;
		box-sizing: border-box;
		display: block;
		padding: 1em;
	}

	#blogs #blogsList .blogs-list-item:hover {
		background-color: #F5A11D;
	}

	#blogs #blogsList .blogs-list-item:hover .blog-author,
	#blogs #blogsList .blogs-list-item:hover .blog-date,
	#blogs #blogsList .blogs-list-item:hover .blog-title {
		color: #FFF;
	}

	#blogs #categoriesNav {
		background-color: #4C4C4E;
		box-sizing: border-box;
		color: #FFF;
		height: 100%;
		overflow-y: auto;
		width: 200px;
	}

	#blogs #categoriesNav li a {
		color: #FFF;
		display: block;
		padding: .5em 1em;
	}

	#blogs #categoriesNav #business,
	#blogs #categoriesNav #tech,
	#blogs #categoriesNav #trending {
		fill: transparent;
		stroke: #FFF;
	}

	#blogs #categoriesNav #liferay {
		fill: #FFF;
	}

	#blogs #categoriesNav .categories-content {
		bottom: 100px;
	}

	#blogs #categoriesNav .child-category:hover {
		background-color: #1C75B9;
	}

	#blogs #categoriesNav .parent-category .business:hover {
		background-color: #00B8B9;
	}

	#blogs #categoriesNav .parent-category .liferay:hover {
		background-color: #1C75B9;
	}

	#blogs #categoriesNav .parent-category .tech:hover {
		background-color: #F6AE3D;
	}

	#blogs .blog-author {
		font-weight: bold;
	}

	#blogs .blog-author,
	#blogs .blog-date,
	#blogs .blog-summary,
	#blogs .blogs-menu a {
		color: #909295;
	}

	#blogs .blog-entry .social-media-share #shareEmail {
		fill: transparent;
		stroke: #909295;
	}

	#blogs .blog-entry .social-media-share #shareEmail:hover {
		fill: transparent;
		stroke: #1C75B9;
	}

	#blogs .blog-entry .social-media-share #shareFB,
	#blogs .blog-entry .social-media-share #shareGooglePlus,
	#blogs .blog-entry .social-media-share #shareLinkedIn,
	#blogs .blog-entry .social-media-share #shareTwitter {
		fill: #909295;
	}

	#blogs .blog-entry .social-media-share #shareFB:hover,
	#blogs .blog-entry .social-media-share #shareGooglePlus:hover,
	#blogs .blog-entry .social-media-share #shareLinkedIn:hover,
	#blogs .blog-entry .social-media-share #shareTwitter:hover {
		fill: #1C75B9;
	}

	#blogs .blog-entry .social-media-share {
		display: inline;
	}

	#blogs .blog-entry .social-media-share a {
		text-decoration: none;
		padding: 0 5px;
	}

	#blogs .blogs-menu a:hover,
	#blogs .blogs-menu a:active,
	#blogs .blogs-menu a:focus {
		color: #1C75B9;
	}

	#blogs .blogs-menu a:hover svg,
	#blogs .blogs-menu a:active svg,
	#blogs .blogs-menu a:focus svg {
		stroke: #1C75B9;
	}

	#blogs .blogs-menu svg {
		stroke: #909295;
	}

	#blogs .blog-title {
		color: #4C4C4E;
	}

	#blogs .loading {
		opacity: .1;
	}

	#blogs .nav-container {
		background-color: #FFF;
		border-right: 1px solid #E3E4E5;
		bottom: 0px;
		left: -200px;
		position: fixed;
		top: 105px;
		transition: left .5s;
	}

	#blogs .nav-container a {
		text-decoration: none;
	}

	#blogs .nav-container ul {
		list-style: none;
		padding: 0;
	}

	#blogs .nav-container .blogs-menu, #blogs .nav-container .parent-category {
		text-transform: uppercase;
	}

	#blogs .nav-container .blogs-menu {
		padding: .5em 1em;
	}

	#blogs .social-nav {
		border-top: 1px solid #E3E4E5;
		margin-top: 10px;
	}

	#blogs .social-nav svg {
		fill: #909295;
		height: 40px;
		stroke: transparent;
	}

	#blogs .social-nav svg:hover {
		fill: #FFF;
	}

/*will break nav*/
	.aui img {
		width: 100%;
	}

	.aui #main-content.columns-1, .aui footer.doc-footer {
		margin-left: 300px;
		transition: margin-left .5s;
	}

	.aui .show-blogs-nav #main-content.columns-1, .aui .show-blogs-nav footer.doc-footer {
		margin-left: 500px;
	}

	.show-blogs-nav #blogs .nav-container {
		left: 0;
	}

	.svg-align {
		vertical-align: sub;
	}
</style>

<@aui.script>
	var A = AUI();

	function processAjaxData(data, url) {
		window.history.pushState(data, '', url);
	}

	window.onpopstate = function(event) {
		if (event.state) {
			${portlet_namespace}refreshPortlets(event.state);
		}
	};

	Liferay.provide(
		window,
		'${portlet_namespace}getBlogEntries',
		function(asset_category_id) {
			var data = {${portlet_namespace}assetCategoryId: asset_category_id};

			${portlet_namespace}refreshPortlets(data);
		},
		['aui-base']
	);

	Liferay.provide(
		window,
		'${portlet_namespace}getBlogEntryContent',
		function(asset_entry_id, assetCategoryId) {
			var data = {
				${portlet_namespace}assetCategoryId: assetCategoryId,
				${portlet_namespace}assetEntryId: asset_entry_id
			};

			${portlet_namespace}refreshPortlets(data);
		},
		['aui-base']
	);

	Liferay.provide(
		window,
		'${portlet_namespace}refreshPortlets',
		function(data) {
			if (!data) {
				data = {};
			}

			var params = {};

			var url = '${themeDisplay.getURLCurrent()?split("?")[0]}';

			data['url'] = url;

			var blogsListContainer = A.one('#blogsList .blogs-list-container');
			var blogsDisplay = A.one('#blogsDisplay');

			blogsListContainer.hide();
			blogsDisplay.hide();
			blogsListContainer.placeAfter(A.Node.create('<div class="loading-animation" />'));
			blogsDisplay.placeAfter(A.Node.create('<div class="loading-animation" />'));

<#-- 			blogsListContainer.remove();
			blogsDisplay.remove(); -->

			var refreshURL = '${portlet_URL_util.getRefreshURL(request, themeDisplay)}';

			Liferay.Portlet.addHTML(
				{
					data: A.mix({}, data, true),
					onComplete: function(portlet, portletId) {
						portlet.refreshURL = refreshURL;

						Liferay.fire(
							portlet.portletId + ':portletRefreshed',
							{
								portlet: portlet,
								portletId: portletId
							}
						);
					},
					placeHolder: A.one('#p_p_id${portlet_namespace}'),
					url: refreshURL
				}
			);

			processAjaxData(data, data['url']);
console.log("data: ", data);
		},
		['aui-base', 'querystring']
	);
</@aui.script>