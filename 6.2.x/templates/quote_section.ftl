<#if request.lifecycle == "RENDER_PHASE">
	<div class="quote-section ${text_color.data}">
		<#if quote.data?has_content>
			<div class="max-med quote">
				<span >${quote.data}</span>

				<div class="triangle upper-left ${quote_color.data}"></div>
				<div class="triangle upper-left second-triangle ${quote_color.data}"></div>
				<div class="lower-right triangle ${quote_color.data}"></div>
				<div class="lower-right triangle second-triangle ${quote_color.data}"></div>
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

	<style type="text/css">
		.quote, .quote-wrapper {
			font-size: 1.25em;
			position: relative;
		}

		.quote, .quote-source {
			position: relative;
			z-index: 5;
		}

		.quote-wrapper {
			padding: 70px 20px;
		}

		.quote-wrapper .quote {
			padding: 1em 3em;
		}

		.quote-wrapper .quote-author {
			font-size: 1.5em;
		}

		.triangle {
			border: 16px solid transparent;
			content: "";
			position: absolute;
		}

		.quote .triangle.second-triangle.lower-right {
			right: 32px;
		}

		.quote .triangle.second-triangle.upper-left {
			left: 32px;
		}

		.triangle.upper-right {
			border-bottom-color: transparent !important;
			border-left-color: transparent !important;
			right: 0;
			top: 0;
		}

		.triangle.lower-right {
			border-left-color: transparent !important;
			border-top-color: transparent !important;
			bottom: 0;
			right: 0;
		}

		.triangle.lower-left {
			border-right-color: transparent !important;
			border-top-color: transparent !important;
			bottom: 0;
			left: 0;
		}

		.triangle.upper-left {
			border-bottom-color: transparent !important;
			border-right-color: transparent !important;
			left: 0;
			top: 0;
		}

		@media all and (max-width: 720px) {
			.quote-wrapper .quote {
				padding: 2em 1em;
			}

			.triangle {
				display: none;
			}

			.quote .triangle {
				display: block;
			}
		}
	</style>
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>