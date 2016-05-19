<a href="${cta_link.data}">
	<div class="card block-container no-padding align-center justify-center ${card_class.data}">
		<div class="icon standard-padding">
			<#if svg_icon.data?has_content>
				${svg_icon.data}
			</#if>
		</div>
		<div class="content small-padding">
			<#if card_title.data?has_content || card_content.data?has_content>
				<h5>${card_title.data}</h5>
					<p>${card_content.data}</p>
				<div class="cta">
					${cta_text.data}
				</div>
			</#if>
		</div>
	</div>
</a>

<#-- should be abstracted to theme -->
<#-- need variables for colors -->
<style>
	.cards h2 {
		border-bottom: 1px solid #CCC;
		margin: .25em 0;
	}

	.cards a {
		color: inherit;
	}

	.cards a:hover {
		text-decoration: none;
	}

	.cards svg {
		max-width: 100%;
	}

	.cards .portlet-column-content.empty {
		padding: 0;
	}

	.cards.green h2 {
		color: #1f7f44;
	}

	.cards.red h2 {
		color: #911f2d;
	}

	.cards.orange h2 {
		color: #f1aa49;
	}

	.cards.blue h2 {
		color: #1d76b9;
	}

	.cards.green .card:hover {
		border: 1px solid #1f7f44;
	}

	.cards.green .card svg .st0 {
		fill: #1f7f44;
	}

	.cards.green .card h5 {
		color: #1f7f44;
	}

	.cards.orange .card:hover {
		border: 1px solid #f1aa49;
	}

	.cards.orange .card svg .st0 {
		fill: #f1aa49;
	}

	.cards.orange .card h5 {
		color: #f1aa49;
	}

	.cards.red .card:hover {
		border: 1px solid #911f2d;
	}

	.cards.red .card svg .st0 {
		fill: #911f2d;
	}

	.cards.red .card h5 {
		color: #911f2d;
	}

	.cards.blue .card:hover {
		border: 1px solid #1d76b9;
	}

	.cards.blue .card svg .st0 {
		fill: #1d76b9;
	}

	.cards.blue .card h5 {
		color: #1d76b9;
	}

	.card {
		border: 1px solid #CCC;
		box-sizing: border-box;
		margin-bottom: 15px;
		margin-right: 15px;
		min-height: 145px;
		padding: 15px 15px 0 15px;
		transition: padding .2s ease-in-out;
	}

	.card:hover {
		padding-bottom: 15px;
		transition: all .2s ease-in-out;
	}

	.card .cta {
		opacity: 0;
		transition: opacity .3s,visibility .3s;
		visibility: hidden;
	}

	.card:hover .cta {
		opacity: 1;
		transition: opacity .3s,visibility .3s;
		visibility: visible;
	}

	.card > div {
		flex: 1;
	}

	.card .icon {
		flex: 0 0 80px;
	}

	.card h5 {
		font-size: 1em;
		font-weight: bold;
		margin: 12px 0;
	}

	@media (max-width:550px) {
		.card .icon {
			flex-basis: 40%;
			align-items: center;
		}

		.card .content {
			flex-basis: 100%;
			text-align: center;
		}
	}
</style>