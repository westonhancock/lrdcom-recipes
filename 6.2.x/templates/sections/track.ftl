<div class="track standard-padding block-container align-center justify-space-around ${Color.data}">
	<#if SVG_Icon.data?has_content>
		<figure class="small-padding">
			${SVG_Icon.data}	
		</figure>
	</#if>

	<#if Title.data?has_content>
		<h3>${Title.data}</h3>
	</#if>

	<#if Description.data?has_content>
		<p>${Description.data}</p>
	</#if>
	
	<#if Link_Href.data?has_content>
		<a href="${Link_Href.data}">${Link_Text.data}</a>
	</#if>
</div>

<style>
	.track {
		border: 1px solid #CCC;
		flex-direction: column;
		margin: 1em;
		min-height: 380px;
		text-align: center;
	}

	.track a {
		margin-top: 1em;
	}

	.track:hover {
		cursor: pointer;
	}

	.track.red:hover {
		border: 1px solid #911f2d;
	}

	.track.red h3 {
		color: ##911f2d;
	}

	.track.green:hover {
		border: 1px solid #1f7f44;
	}

	.track.green h3 {
		color: #1f7f44;
	}

	.track.orange:hover {
		border: 1px solid #f1aa49;
	}

	.track.orange h3 {
		color: #f1aa49;
	}
</style>