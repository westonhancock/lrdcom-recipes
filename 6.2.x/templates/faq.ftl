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
<#elseif request.lifecycle == "RESOURCE_PHASE">
	<#include "${templatesPath}/885932" />
</#if>