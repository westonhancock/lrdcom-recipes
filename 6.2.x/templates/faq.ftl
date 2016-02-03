<#if request.lifecycle == "RENDER_PHASE">
	<div class="faq-section" id="article-${.vars['reserved-article-id'].data}">
		<#include "${templatesPath}/898140" />
		<#assign number_of_heading_fields = 2 />

		<#list question.siblings as cur_question>
			<div class="question">
				<h4><strong
					class="live-edit"
					data-article-id='${.vars["reserved-article-id"].data}'
					data-field-name="${cur_question.name}"
					data-level-path="${cur_question_index}"
					data-namespace='${request["portlet-namespace"]}'
					data-resource-url='${request["resource-url"]}'
				>
					${cur_question.data}
				</strong></h4>

				<#list cur_question.answer.siblings as cur_answer>
					<p
						class="live-edit"
						data-article-id='${.vars["reserved-article-id"].data}'
						data-field-name="${cur_question.answer.name}"
						data-level-path="${number_of_heading_fields + cur_question_index},${cur_answer_index}"
						data-namespace='${request["portlet-namespace"]}'
						data-resource-url='${request["resource-url"]}'
					>
						${cur_answer.data}
					</p>
				</#list>
			</div>
		</#list>
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