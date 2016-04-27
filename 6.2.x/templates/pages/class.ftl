<#include "${templatesPath}/1561886" />

<div class="align-center block-container justify-center large-padding training-banner">
	<article class="block text-center w40">
		${general_class_info.course_svg.data}
	</article>
	<article class="block w60">
		<h1>${general_class_info.class_title.data}</h1>
		<h2>${general_class_info.class_quick_description.data}</h2>

		<p>
			Length: <strong>${general_class_info.length_of_course.data}</strong> <br />
			Formats: <strong>${general_class_info.class_formats.data}</strong> <br />
			Liferay Version: <strong>${general_class_info.liferay_version.data}</strong>
		</p>

		<div class="small-padding-vertical">
			<p class="disclaimer">${general_class_info.class_disclaimer.data}</p>
		</div>
	</article>
</div>

<div class="block-container no-padding">
	<article class="align-center block block-container large-padding points-section w50">

		<#list class_details.feature_point.siblings as point>
			<aside class="small-padding-vertical w100">
				<h3 class="small-padding-vertical">${point.point_title.data}</h3>
				<p class="point-description">
					${point.point_description.data}
				</p>
			</aside>
		</#list>

		<aside class="small-padding-vertical">
			<p>
				<strong>Laptop Requirements</strong> <br />
				<#list stringUtil.splitLines(class_details.laptop_requirements.data) as line>
					<#if line?has_content>
						${line} <br />
					</#if>
				</#list>
			</p>

			<p class="disclaimer">${class_details.laptop_disclaimer.data}</p>
		</aside>
	</article>

	<article class="block block-container large-padding w50">
		<h2>Find a Class Template</h2>
	</article>
</div>

<div class="block-container border-blocks no-padding">
	<article class="align-center block block-container justify-center no-padding target-positions w33">
		<article class="small-padding">
			<svg height="80" viewBox="0 0 80 80" width="80" xmlns="http://www.w3.org/2000/svg" ><path fill="#F5A11D" d="M40 12c15.4 0 28 12.6 28 28S55.4 68 40 68 12 55.4 12 40s12.6-28 28-28m0-8C20.1 4 4 20.1 4 40s16.1 36 36 36 36-16.1 36-36S59.9 4 40 4z"/><path fill="#F5A11D" d="M40 28c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12m0-8c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"/><path fill="#F5A11D" d="M40 36c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></svg>
		</article>
		<article class="standard-padding">
			<p>${localize("best_for", "Best For:")}</p>
			<ul class="no-margin">
				<#list class_details.target_positions.position.siblings as position>
					<li>${position.data}</li>
				</#list>
			</ul>
		</article>
	</article>

	<article class="block block-container w33">
		<#if class_details.advertisement_article_id.data?has_content>
			${journalContentUtil.getContent(groupId, class_details.advertisement_article_id.data, "", locale, xmlRequest)}
		</#if>
	</article>
	
	<article class="block block-container large-padding quote-section text-center w33">
		<#if class_details.quote_article_id.data?has_content>
			${journalContentUtil.getContent(groupId, class_details.quote_article_id.data, "", locale, xmlRequest)}
		</#if>
	</article>
	
</div>

<div class="large-padding-vertical text-center w100">
	<h1>Agenda</h1>
</div>

<div class="agenda block-container justify-center standard-padding-vertical">
	<#list class_agenda.day.siblings as cur_day>
		<article class="block block-container day large-padding-horizontal">
			<h3>Day ${cur_day_index + 1}</h3>
			<ul class="no-margin">
				<#list cur_day.agenda_item.siblings as item>
					<li class="standard-padding-vertical">${item.data}</li>
				</#list>
			</ul>
		</article>
	</#list>
</div>

<#if general_class_info.course_pdf.data?has_content>
	<div class="text-center standard-padding-horizontal">
		<a class="btn btn-accent" href="${general_class_info.course_pdf.data}">Download Course PDF</a>
	</div>
</#if>

<style>
	.disclaimer {
		font-size: 0.8em;
		font-style: italic;
	}

	.training-banner {
		background: #1C75B9;
		color: #FFF;
		min-height: 60vh;
	}

	.training-banner a {
		color: #fff;
		text-decoration: underline;
	}

	.training-banner svg {
		width: 60%;
	}

	.training-banner article:last-child {
		flex-basis: 60%;
		flex-grow: 1;
	}

	.border-blocks > article {
		border: 1px solid #EFEFEF;
	}

	.points-section {
		background: #EFEFEF;
	}

	.point-description {
		font-size: 1.3em;
	}

	.target-positions {
		align-content: center;
	}

	.target-positions p {
		font-size: 1.5em;
		margin: 0;
	}

	.target-positions li {
		font-size: 1.7em;
		line-height: 1.5em;
		list-style-type: none;
	}

	.quote-section {
		background: #EFEFEF;
	}

	.agenda h3 {
		font-size: 1.5em;
		font-weight: 500;
	}

	.agenda .day {
		flex-direction: column;
	}

	.agenda .day li {
		font-size: 1.1em;
		list-style-type: none;
	}
</style>