<#if request.lifecycle == "RENDER_PHASE">
	<div class="align-center block-container justify-center exhibit-group large-padding-vertical" id="article-${.vars['reserved-article-id'].data}">
		<#include "${templatesPath}/898140" />
		<#assign number_of_heading_fields = 2 />

		<div class="align-baseline alt-font-color block-container justify-center">
			<#if block_title.siblings?size gt 5>
				<#assign block_width = 33 />
			<#else>
				<#assign block_width = 100 / block_title.siblings?size />
			</#if>

			<#list block_title.siblings as block>
				<#assign transition_css = "on-screen-helper slide-up" />

				<div class="block exhibit standard-padding ${transition_css} ${block.animation_delay.data} w${block_width?round}">
					<#if block.svg_code.data?has_content>
						<div class="exhibit-media text-center">
							${block.svg_code.data}
						</div>
					</#if>

					<div class="exhibit-body">
						<#if block.data?has_content>
							<h3
								class="live-edit"
								data-article-id='${.vars["reserved-article-id"].data}'
								data-field-name="${block.name}"
								data-level-path="0"
								data-namespace='${request["portlet-namespace"]}'
								data-resource-url='${request["resource-url"]}'
							>
								${block.data}
							</h3>
						</#if>

						<#if block.block_content.data?has_content>
							<p
								class="live-edit"
								data-article-id='${.vars["reserved-article-id"].data}'
								data-field-name="${block.block_content.name}"
								data-level-path="${number_of_heading_fields + block_index},0"
								data-namespace='${request["portlet-namespace"]}'
								data-resource-url='${request["resource-url"]}'
							>
								${block.block_content.data}
							</p>
						</#if>
					</div>
				</div>
			</#list>
		</div>

		<#if button_text.data?has_content && button_text.button_link.data?has_content>
			<a class="btn ${button_text.button_class.data}" href="${button_text.button_link.data}">
				${button_text.data}

				${button_text.icon_svg_code.data}
			</a>
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
									data: data
								}
						);
					};

					A.one('#article-${.vars['reserved-article-id'].data}').delegate(
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