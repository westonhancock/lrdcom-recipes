<#if request.lifecycle == "RENDER_PHASE">
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
								<#if article_id.data?has_content>
									<runtime-portlet name="56" instance="${article_id.data}" />
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