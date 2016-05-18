<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"] />
<#assign layout = layout_service.getLayout(plid?number) />
<#assign hasUpdatePermissons = layoutPermission.contains(permissionChecker, layout, "UPDATE")/>

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

						<#assign cur_element_css_class = "lego-element " + cur_element.element_class.data />
						<#assign button_attrs = cur_element.data />

						<#if hasUpdatePermissons>
							<#assign cur_element_css_class = cur_element_css_class + " live-edit" />
							<#assign button_attrs = button_attrs + "
								data-article-id='${.vars[\"reserved-article-id\"].data}'
								data-level-path='${cur_section.name}::${cur_section_index},${cur_block.name}::${cur_block_index},${cur_element.name}::${cur_element_index},${cur_element.content.name}::0'
							" />
						</#if>

						<${cur_element_tag} class="${cur_element_css_class}" ${button_attrs}>
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