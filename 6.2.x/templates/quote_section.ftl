<#if request.lifecycle == "RENDER_PHASE">
	<div class="quote-section ${text_color.data}">
		<#if quote.data?has_content>
			<div class="large-padding max-med quote">
				<span >${quote.data}</span>

				<div class="triangle upper-left"></div>
				<div class="triangle upper-left second-triangle"></div>
				<div class="lower-right triangle"></div>
				<div class="lower-right triangle second-triangle"></div>
			</div>
		</#if>

		<div class="max-sm quote-source">
			<#if author.data?has_content>
				<div class="quote-author">
					${author.data}
				</div>
			</#if>

			<#if author.author_title.data?has_content || author.author_company?has_content>
				<div class="author-info">
					<#if author.author_title.data?has_content>
						<div class="author-title">
							${author.author_title.data}
						</div>
					</#if>

					<#if author.author_company.data?has_content>
						<div class="author-company">
							${author.author_company.data}
						</div>
					</#if>
				</div>
			</#if>
		</div>
	</div>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>