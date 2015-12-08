<#include "${templatesPath}/43374" />

<div class="block link-tile standard-padding w33">
	<a class="lazy-load" href="javascript:;" label="${title.data}" style="background-image: url(${logo.data});">
		<span>
			<h3>${title.data}</h3>
		</span>
		<div class="hide pop-up-content">
			<p>${description.data}</p>
			<p>${project_summary.data}</p>
			<span class="partner">${partner_id.data}</span>
			<a href="${website.url.data}">${website.data}</a>
			<a class="btn" href="/resource?resource_id=${case_study_id.data}">${localize("view-case-study")}</a>
		</div>
	</a>
</div>