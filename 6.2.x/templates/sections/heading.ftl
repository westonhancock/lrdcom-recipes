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

	<#if heading.data?has_content || subheading.data?has_content>
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
	</#if>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>