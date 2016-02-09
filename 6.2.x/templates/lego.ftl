<#if request.lifecycle == "RENDER_PHASE">
	<#assign journal_article_local_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleLocalService") />
	<#assign journal_content_util = staticUtil["com.liferay.portlet.journalcontent.util.JournalContentUtil"] />

	<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
	<#assign theme_display = request["theme-display"] />
	<#assign plid = theme_display["plid"] />
	<#assign layout = layout_service.getLayout(plid?number) />

	<div class="lego-article ${article_class.data}" id="article-${.vars['reserved-article-id'].data}">
		<#list section.siblings as cur_section>
			<section class="block-container lego-section section-${cur_section_index + 1} ${cur_section.section_class.data}" ${cur_section.data}>
				<#list cur_section.block.siblings as cur_block>
					<div class="block block-${cur_block_index + 1} content-column lego-block w${cur_block.width.data} ${cur_block.block_class.data}" ${cur_block.data}>
						<#list cur_block.element.siblings as cur_element>
							<#assign cur_element_tag = cur_element.tag.data>

							<#if !cur_element_tag?has_content>
								<#assign cur_element_tag = "div">
							</#if>

							<${cur_element_tag}
								class="live-edit lego-element ${cur_element.element_class.data}"
								data-article-id='${.vars["reserved-article-id"].data}'
								data-field-name="${cur_element.content.name}"
								data-level-path="${cur_section_index},${cur_block_index},${cur_element_index},0"
								data-namespace='${request["portlet-namespace"]}'
								data-resource-url='${request["resource-url"]}'
								${cur_element.data}
							>
								${cur_element.content.data}
							</${cur_element_tag}>
						</#list>

						<#if cur_block.article_id?? && cur_block.article_id.data?has_content>
							<#list cur_block.article_id.siblings as article_id>
								<#if article_id.data?has_content && journal_article_local_service.hasArticle(groupId, article_id.data)>
									${journal_content_util.getContent(groupId, article_id.data, "", locale, xmlRequest)!}

									<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
										<#assign service_context = staticUtil["com.liferay.portal.service.ServiceContextThreadLocal"].getServiceContext() />
										<#assign http_servlet_request = service_context.getRequest() />

										<#assign current_url = request.attributes.CURRENT_COMPLETE_URL! />

										<#assign edit_url = portletURLFactory.create(http_servlet_request, "15", theme_display["plid"]?number, "0") />
										<#assign VOID = edit_url.setParameter("p_p_state", "maximized") />
										<#assign VOID = edit_url.setParameter("p_p_lifecycle", "0") />
										<#assign VOID = edit_url.setParameter("groupId", "${groupId}") />
										<#assign VOID = edit_url.setParameter("struts_action", "/journal/edit_article") />
										<#assign VOID = edit_url.setParameter("redirect", "${current_url}") />
										<#assign VOID = edit_url.setParameter("articleId", "${article_id.data}") />

										<span class="lfr-icon-action lfr-icon-action-edit lfr-meta-actions pull-right">
											<a href="${edit_url}" class="taglib-icon">
												<img src="/osb-community-theme/images/spacer.png" alt="Edit" style="background-image: url('/osb-community-theme/sprite/images/common/_sprite.png'); background-position: 50% -608px; background-repeat: no-repeat; height: 16px; width: 16px;">
												<span class="taglib-text ">Edit</span>
											</a>
										</span>
									</#if>
								</#if>
							</#list>
						</#if>
					</div>
				</#list>
			</section>
		</#list>
	</div>

	<#if css.data?has_content>
		<style type="text/css">
			${css.data}
		</style>
	</#if>

	<#if javascript?? && javascript.data?has_content>
		<script type="text/javascript">
			${javascript.data}
		</script>
	</#if>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>