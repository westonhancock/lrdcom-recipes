<div class="class-toggle-carousel faq-wrapper standard-padding-vertical" id="togglerDisplayWrapper">
	<#if faqs.data?has_content>
		<div class="mobile-only mobile-title">
			${faqs.data}
		</div>
	</#if>

	<div class="questions-container w50">
		<#list question.getSiblings() as question>
			<div class="selection class-toggle question question-${question_index + 1}" data-target-class="wrap-question-${question_index + 1}" data-target-nodes="#togglerDisplayWrapper" data-value="question-${question_index + 1}" data-toggle-type="carousel">
				${question.data}
			</div>
			<div class="mobile-only">
				<span class="answer answer-${question_index + 1}">
					${question.answer.data}
				</span>
			</div>
		</#list>
	</div>

	<div class="answers-container w50">
		<#list question.getSiblings() as item>
			<div class="answer answer-${item_index + 1}">
				${item.answer.data}
			</div>
		</#list>
		<div class="answer default">
			<span>
				${faqs.data}
			</span>
		</div>
	</div>
</div>

<style>
<#if custom_css.data?has_content>
	${custom_css.data}
</#if>

.answer {
	opacity: 0;
	position: absolute;
	transform: translate(200px, 0px);
	z-index: -1;
}

.answers-container, .questions-container {
	box-sizing: border-box;
	float: left;
	padding: 20px;
	position: relative;
}

/*.answers-container .answer {
	opacity: 1;
	transform: translate(0px, 0px);
	transition: all 0.8s ease-in-out 0s;
}*/

.answer.default {
	text-align: center;
	margin-top: 60px;
	font-size: 3em;
}

.class-toggle-carousel .answer.default {
	opacity: 1;
	display: block;
	left: 0px;
	transform: translate(0px, 0px);
	right: 0px;
	z-index: 2;
}

<#list question.getSiblings() as style_item>
	.class-toggle-carousel.wrap-question-${style_item_index + 1} .question.question-${style_item_index + 1} {
		font-weight: normal;
	}

	.class-toggle-carousel.wrap-question-${style_item_index + 1} .answer.answer-${style_item_index + 1} {
		display: block;
		opacity: 1;
		transform: translate(0px, 0px);
		transition: all 0.8s ease-in-out 0s;
		z-index: 3;
	}

	.class-toggle-carousel.wrap-question-${style_item_index + 1} .answer.default {
		opacity: 0;
	}
</#list>

.faq-wrapper {
	margin: auto;
	max-width: 960px;
	overflow: hidden;
}

.mobile-only {
	display: none;
}

.mobile-title {
	font-size: 2em;
	text-align: center;
}

.mobile-only .answer {
	display: none;
	padding: 10px;
	position: relative;
}

.question {
	cursor: pointer;
	font-size: 1.3em;
	line-height: 1.2em;
	padding: 5px 0px;
}

@media all and (max-width: 720px) {
	.answers-container {
		display: none;
	}

	.mobile-only {
		display: block;
	}

	.questions-container {
		width: 100%;
	}
}
</style>