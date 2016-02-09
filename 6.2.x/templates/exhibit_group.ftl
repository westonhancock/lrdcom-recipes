<#if request.lifecycle == "RENDER_PHASE">
	<div class="align-center block-container exhibit-group justify-center large-padding-vertical" id="article-${.vars['reserved-article-id'].data}">
		<#include "${templatesPath}/898140" />

		<#assign number_of_heading_fields = 2 />

		<div class="align-baseline block-container justify-center">
			<#list block_title.siblings as block>
				<#assign block_css_class = "block exhibit standard-padding w${row_percent.data}"/>

				<#if !block.block_link_text.data?has_content && !block.block_button_text.data?has_content>
					<#assign block_css_class = block_css_class + " text-center"/>
				</#if>

				<#if block.animation.data?has_content>
					<#assign block_css_class = block_css_class + " on-screen-helper slide-up" />
				</#if>

				<div class="${block_css_class}">
					<#if block.svg_code.data?has_content>
						<div class="exhibit-media">
							${block.svg_code.data}
						</div>
					</#if>

					<div class="exhibit-body">
						<#if block.data?has_content>
							<h3
								class="live-edit"
								data-article-id='${.vars["reserved-article-id"].data}'
								data-field-name="${block.name}"
								data-level-path="${block_index}"
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

						<#if block.block_link_text.data?has_content>
							<#list block.block_link_text.siblings as block_link>
								<#assign svg_item = "" />

								<#if block_link.siblings?size == 1>
									<#assign svg_item = "<svg height='10' width='8'><use xlink:href='#navCaret' /></svg>" />
								</#if>

								<a href="${block_link.block_link_url.data}">${block_link.data} ${svg_item}</a>
							</#list>
						</#if>

						<#if block.block_button_text.data?has_content>
							<div>
								<a class="btn btn-sm ${block.block_button_text.block_button_color.data}" href="${block.block_button_text.block_button_url.data}">${block.block_button_text.data}</a>
							</div>
						</#if>
					</div>
				</div>
			</#list>
		</div>

		<#if button_text.data?has_content && button_text.button_url.data?has_content>
			<a class="btn ${button_text.button_color.data}" href="${button_text.button_url.data}">
				${button_text.data}
			</a>
		</#if>
	</div>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>