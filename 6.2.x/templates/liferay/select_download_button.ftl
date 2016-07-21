<#include "${templatesPath}/1561886" />

<#assign reserved_article_id = .vars["reserved-article-id"].data />

<div id="select-${reserved_article_id}" class="small-padding ${form_class.data}">
	<select
		onchange="AUI().one('#select-${reserved_article_id} a').set('href', this.value);"
		onkeypress="if (event.keyCode == 13) window.location = this.value;">

		<#list link_url.getSiblings() as cur_link>
			<option value="${cur_link.data}">${cur_link.link_description.data}</option>
		</#list>
	</select>

	<a href="${link_url.data}" class="${form_class.data}" target="_blank" type=""><@liferay.language key="download" /></a>
</div>

<style>
	#select-${reserved_article_id} {
		display: inline-block;
		border: 1px solid ;
		border-radius: 2px;
	}

	#select-${reserved_article_id} a {
		border-left: 1px solid;
		display: inline-block;
		margin: 5px;
		padding-left: 20px;
		padding-right: 10px;
		text-decoration: none;
		text-transform: capitalize;
	}

	.mobile #select-${reserved_article_id} a {
		border-left: 0;
	}

	#select-${reserved_article_id} a, #select-${reserved_article_id} select {
		background: transparent;
	}

	#select-${reserved_article_id} select {
		background: url(osb-community-theme/images/custom/form_dropdowns.svg) no-repeat right 50%;
		border: none;
		cursor: pointer;
		padding-left: 10px;
		padding-top: 0;

		-webkit-appearance: none;
	}

	#select-${reserved_article_id} select:focus {
		outline: none;
	}
</style>