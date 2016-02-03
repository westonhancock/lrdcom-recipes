<#if request.lifecycle == "RENDER_PHASE">
	<#assign css_class = ""/>

	<#if heading.heading_type.data == "page-heading">
		<#assign css_class = "block-container page-heading" />
		<#assign tag = "h1"/>
	<#elseif heading.heading_type.data == "section-heading">
		<#assign css_class = "section-heading" />
		<#assign tag = "h2" />
	<#else>
		<#assign tag = heading.heading_type.data />
	</#if>

	<div class="${css_class} ${heading.heading_alignment.data}" id="heading-${.vars['reserved-article-id'].data}">
		<#if heading.data?has_content>
			<${tag}
				class="live-edit ${heading.heading_color.data}"
				data-article-id='${.vars["reserved-article-id"].data}'
				data-field-name="${heading.name}"
				data-level-path="0"
				data-namespace='${request["portlet-namespace"]}'
				data-resource-url='${request["resource-url"]}'
			>
				${heading.data}
			</${tag}>
		</#if>

		<#if subheading.data?has_content>
			<p
				class="live-edit ${subheading.subheading_color.data} ${subheading.subheading_alignment.data}"
				data-article-id='${.vars["reserved-article-id"].data}'
				data-field-name="${subheading.name}"
				data-level-path="0"
				data-namespace='${request["portlet-namespace"]}'
				data-resource-url='${request["resource-url"]}'
			>
				${subheading.data}
			</p>
		</#if>
	</div>

<#-- This to go in theme -->
	<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
	<#assign theme_display = request["theme-display"] />
	<#assign plid = theme_display["plid"] />
	<#assign layout = layout_service.getLayout(plid?number) />

	<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
	<style>
		.controls-visible .live-edit {
			-moz-user-modify: read-write;
			-webkit-user-modify: read-write;
		}
	</style>

	<script text="text/javascript">
		AUI().ready(
				'aui-io-request',
				function(A) {
					var body = A.getBody();

					var saveInfo = function(levelPath, fieldName, value, resourceUrl, namespace, articleId) {
						var data = {};

						data[namespace + 'articleId'] = articleId;
						data[namespace + 'levelPath'] = levelPath;
						data[namespace + 'fieldName'] = fieldName;
						data[namespace + 'languageId'] = themeDisplay.getLanguageId();
						data[namespace + 'value'] = value;

						A.io.request(
								resourceUrl,
								{
									data: data,
									on: {
										success: function(event, id, obj) {
											console.log('Changed', obj);
										},
										failure: function(event, id, obj) {
											console.log('Failed', obj);
										}
									}
								}
						);
					};

					A.one('#heading-${.vars['reserved-article-id'].data}').delegate(
						'click',
						function(event) {
							var node = event.currentTarget;

							var editNode = node;

							var initialContent = node.getContent();

							editNode.on(
									'blur',
									function(event) {
										node.detach('blur');

										var content = editNode.getContent();

										if (!body.hasClass('controls-visible') || (initialContent == content)) {
											return;
										}

										var articleId = node.attr('data-article-id');
										var fieldName = node.attr('data-field-name');
										var levelPath = node.attr('data-level-path');
										var namespace = node.attr('data-namespace');
										var resourceUrl = node.attr('data-resource-url');

										saveInfo(levelPath, fieldName, content, resourceUrl, namespace, articleId);
									}
							);
						},
						'.live-edit'
					);
				}
		);
	</script>
	</#if>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>