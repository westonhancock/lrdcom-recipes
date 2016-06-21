<#include "${templatesPath}/1561886" />

<div class="align-center block-container justify-center large-padding training-banner">
	<article class="block text-center w40">
		${general_course_info.course_svg.data}
	</article>
	<article class="block w60">
		<h1>${general_course_info.course_title.data}</h1>
		<h2>${general_course_info.course_quick_description.data}</h2>

		<p>
			Length: <strong>${general_course_info.length_of_course.data}</strong> <br />
			Formats: <strong>${general_course_info.course_formats.data}</strong> <br />
			Liferay Version: <strong>${general_course_info.liferay_version.data}</strong> <br />
			<#if general_course_info.prerequisites.data?has_content>
				Prerequisites: ${general_course_info.prerequisites.data}
			</#if>
		</p>

		<div class="small-padding-vertical">
			<p class="disclaimer">${general_course_info.course_disclaimer.data}</p>
		</div>
	</article>
</div>

<div class="block-container no-padding">
	<article class="align-center block block-container large-padding points-section w50">

		<#list course_details.feature_point.siblings as point>
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
				<#list stringUtil.splitLines(course_details.laptop_requirements.data) as line>
					<#if line?has_content>
						${line} <br />
					</#if>
				</#list>
			</p>

			<p class="disclaimer">${course_details.laptop_disclaimer.data}</p>
		</aside>
	</article>

	<article class="block block-container large-padding w50">
		<#if course_details.classes_article_id.data?has_content>
			${journalContentUtil.getContent(groupId, course_details.classes_article_id.data, "", locale, xmlRequest)}
		</#if>
	</article>
</div>

<div class="block-container border-blocks no-padding">
	<article class="align-center block block-container justify-center no-padding target-positions w33">
		<article class="small-padding">
			<svg height="80" viewBox="0 0 80 80" width="80" xmlns="http://www.w3.org/2000/svg" ><path fill="#F5A11D" d="M40 12c15.4 0 28 12.6 28 28S55.4 68 40 68 12 55.4 12 40s12.6-28 28-28m0-8C20.1 4 4 20.1 4 40s16.1 36 36 36 36-16.1 36-36S59.9 4 40 4z"/><path fill="#F5A11D" d="M40 28c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12m0-8c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"/><path fill="#F5A11D" d="M40 36c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></svg>
		</article>
		<article class="standard-padding">
			<h3>${localize("best_for", "Best For:")}</h3>
			<ul class="no-margin">
				<#list course_details.target_positions.position.siblings as position>
					<li>${position.data}</li>
				</#list>
			</ul>
		</article>
	</article>

	<article class="block block-container w33">
		<#if course_details.advertisement_article_id.data?has_content>
			${journalContentUtil.getContent(groupId, course_details.advertisement_article_id.data, "", locale, xmlRequest)!}
		</#if>
	</article>

	<article class="block block-container large-padding quote-section text-center w33">
		<#if course_details.quote_article_id.data?has_content>
			${journalContentUtil.getContent(groupId, course_details.quote_article_id.data, "", locale, xmlRequest)!}
		</#if>
	</article>

</div>
<div class="large-padding-vertical text-center w100">
	<h1>Agenda</h1>
</div>

<#assign numOfDays = course_agenda.day.siblings?size>
<#if numOfDays == 1>
	<#assign agendaClass = "one">
<#elseif numOfDays == 2>
	<#assign agendaClass = "two">
<#elseif numOfDays == 3>
	<#assign agendaClass = "three">
</#if>

<div class="agenda block-container justify-space-around ${agendaClass} no-padding standard-padding-vertical">
	<#list course_agenda.day.siblings as cur_day>

		<article class="block block-container day large-padding-horizontal">
			<h3>Day ${cur_day_index + 1}</h3>
			<ul class="category-set no-margin">
				<#list cur_day.agenda_item.siblings as item>
					<#if item.subitem?? && item.subitem.data?has_content>
						<#assign category_header_class = "">
					<#else>
						<#assign category_header_class = "no-subcontent">
					</#if>
					<li class="category-header standard-padding-vertical ${category_header_class}">

						<#-- Plus / Cross Icon -->
						<#if item.subitem?? && item.subitem.data?has_content>
							<svg class="toggle-icon" width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" id="yui_patched_v3_11_0_1_1462196000162_829"><title>Elements/toggle grey</title><g stroke="#9EA2B4" stroke-width="1.5" fill="none" fill-rule="evenodd"><ellipse cx="20" cy="20" rx="19" ry="19"></ellipse><path d="M11 19.75h17.675M19.75 28.675V11" stroke-linecap="round"></path></g></svg>
						</#if>

						${item.data}
					</li>

					<#-- Subitem -->
					<#if item.subitem??>
						<ul class="category-content toggler-content-collapsed">
							<#list item.subitem.siblings as subitem>
								<#if subitem.secondary_subitem?? && subitem.secondary_subitem.data?has_content>
									<#assign category_header_class = "">
								<#else>
									<#assign category_header_class = "no-subcontent">
								</#if>
								<li class="category-header small-padding-vertical ${category_header_class}">
									<#-- Plus / Cross Icon -->
									<#if subitem.secondary_subitem?? && subitem.secondary_subitem.data?has_content>
										<svg class="toggle-icon" width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" id="yui_patched_v3_11_0_1_1462196000162_829"><title>Elements/toggle grey</title><g stroke="#9EA2B4" stroke-width="1.5" fill="none" fill-rule="evenodd"><ellipse cx="20" cy="20" rx="19" ry="19"></ellipse><path d="M11 19.75h17.675M19.75 28.675V11" stroke-linecap="round"></path></g></svg>
									</#if>
									${subitem.data}

									<#-- Secondary Subitem -->
									<#if subitem.secondary_subitem??>
										<ul class="category-content small-padding-vertical toggler-content-collapsed">
											<#list subitem.secondary_subitem.siblings as secondary_subitem>
												<li class="small-padding-vertical">
													${secondary_subitem.data}
												</li>
											</#list>
										</ul>
									</#if>
								</li>
							</#list>
						</ul>
					</#if>
				</#list>
			</ul>
		</article>
	</#list>
</div>

<#if general_course_info.course_pdf.data?has_content>
	<div class="large-padding text-center">
		<a class="btn btn-accent" href="${general_course_info.course_pdf.data}">Download Course PDF</a>
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
		color: #FFF;
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
		font-size: 1.9em;
		line-height: 1.3em;
		list-style-type: none;
	}

	.quote-section {
		background: #EFEFEF;
	}

	.agenda.block-container {
		margin: auto;
		width: 75%;
	}

	.agenda h3 {
		font-size: 1.5em;
		font-weight: 500;
	}

	.agenda .day {
		flex-direction: column;
	}

	.agenda.two .day {
		width: 50%;
	}

	.agenda.three .day {
		width: 33%;
	}

	.agenda .day ul {
		margin-bottom: 0;
		margin-left: 10px;
	}

	.agenda .day li {
		list-style-type: none;
		position: relative;
	}

	.agenda .day li.no-subcontent:hover {
		cursor: default;
	}

	.agenda .day li.no-subcontent * {
		padding: 0;
	}

	.agenda .day li.no-subcontent + div * {
		padding: 0;
	}

	.toggle-icon {
		left: 0;
		position: absolute;
	}

	.category-set {
		position: relative;
	}

	.aui .category-header {
		padding-left: 30px;
	}

	.aui .category-header:hover {
		cursor: pointer;
	}

	.aui .category-content {
		padding-bottom: 10px;
		padding-left: 10px;
	}

	.toggler-header .toggle-icon {
		-moz-transform-origin: center 50%;
		-moz-transition: -moz-transform 1s;
		-ms-transform-origin: center 50%;
		-o-transform-origin: center 50%;
		-o-transition: -o-transform 1s;
		-webkit-transform-origin: center 50%;
		-webkit-transition: -webkit-transform 1s;
		transform-origin: center 50%;
		transition: transform 1s;
	}

	.toggler-header-expanded .toggle-icon {
		-moz-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	@media (max-width: 760px) {
		.aui .agenda .day {
			max-width: 100%;
		}
	}
</style>

<script>
	YUI().use(
		'aui-toggler',
		function(Y) {
			new Y.TogglerDelegate(
				{
					animated: true,
					closeAllOnExpand: false,
					container: '.agenda',
					content: '.category-content',
					expanded: false,
					header: '.category-header',
					transition: {
						duration: 0.6,
						easing: 'cubic-bezier(0, 0.1, 0, 1)'
					}
				}
			);
		}
	);
</script>