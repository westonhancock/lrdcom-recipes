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
	<article class="align-center block block-container large-padding points-section w50 ">

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
				${class_details.laptop_requirements.data}
			</p>

			<p class="disclaimer">${class_details.laptop_disclaimer.data}</p>
		</aside>

	</article>

	<article class="block block-container large-padding w50">
		<h2>Find a Class Template</h2>
	</article>
</div>

<div class="block-container border-blocks no-padding">
	<article class="align-center block block-container justify-center target-positions w33">
		<article class="standard-padding">
			<svg height="80" viewBox="0 0 80 80" width="80" xmlns="http://www.w3.org/2000/svg" ><path fill="#F5A11D" d="M40 12c15.4 0 28 12.6 28 28S55.4 68 40 68 12 55.4 12 40s12.6-28 28-28m0-8C20.1 4 4 20.1 4 40s16.1 36 36 36 36-16.1 36-36S59.9 4 40 4z"/><path fill="#F5A11D" d="M40 28c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12m0-8c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"/><path fill="#F5A11D" d="M40 36c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></svg>
		</article>
		<article class="standard-padding">
			<p>Best For:</p>
			<ul class="no-margin">
				<#list class_details.target_positions.position.siblings as position>
					<li>${position.data}</li>
				</#list>
			</ul>
		</article>
	</article>

	<article class="align-center block block-container justify-center large-padding-vertical small-padding-horizontal  w33">
		<h3>Teams that have taken training:</h3>
		<div class="block-container justify-center">
			<figure class="no-margin">
				<svg height="70" id="svg3168" viewBox="0 0 192 70" width="192" xmlns="http://www.w3.org/2000/svg" ><style>.st0{fill:#909295;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#909295;}</style><path d="M66.1 21.6v26.6h13.6c4 0 8.3-2.8 8.3-7.4 0-4.3-3.3-5.9-4.7-6.3-.1 0-.1 0-.1-.1v-.1s3.6-1.3 3.6-5.4c0-4.6-3.1-7.3-8.2-7.3H66.1zm6.4 10.5v-5s0-.1.1-.1h4.9c1.6 0 2.6 1 2.6 2.6 0 1.2-1 2.5-2.7 2.5h-4.9zm0 10.6v-5.2s0-.1.1-.1h4.8c2.3 0 3.6 1 3.6 2.7 0 1.8-1.2 2.7-3.5 2.7l-5-.1zM89.9 34.9c0 8.3 4.9 13.9 12.2 13.9 7.3 0 12.2-5.6 12.2-13.9S109.4 21 102.1 21c-7.3-.1-12.2 5.5-12.2 13.9zm6.5 0c0-4.6 2.2-7.6 5.7-7.6s5.8 3 5.8 7.6c0 4.7-2.3 7.7-5.8 7.7-3.5-.1-5.7-3-5.7-7.7zM116.7 29.3c0 4.1 2.7 7 7.6 8l.9.2c3.6.8 4.8 1.3 4.8 3 0 1.6-1.5 2.7-3.7 2.7-2.7 0-5-1.2-6.8-3.4-.1.1-4.1 4-4.2 4.1 2.1 2.5 5 4.9 11 4.9 5.1 0 10.3-3 10.3-8.7 0-6.3-5-7.4-8.4-8.1l-.9-.2c-2.1-.4-4.1-1-4.1-2.7 0-1.8 1.7-2.5 3.3-2.5 2 0 4 .9 5.5 2.5.1-.1 4-3.9 4.1-4-1.7-1.9-4.7-4.1-9.6-4.1-5.9-.1-9.8 3.3-9.8 8.3zM138.7 34.7c0 8.3 5.1 14.1 12.3 14.1 5.4 0 7.9-2 10.5-5.7-.1-.1-5.2-3.5-5.3-3.6-1.1 1.9-2.4 3.1-4.8 3.1-2.9 0-6.1-2.4-6.1-7.8 0-4.9 3-7.5 5.9-7.5 2.2 0 3.7.9 4.9 3 .1-.1 5.2-3.5 5.3-3.5-2.6-4-5.8-5.7-10.2-5.7-8.6-.1-12.5 6.8-12.5 13.6zM179.1 21.6v9.8s0 .1-.1.1h-8.1s-.1 0-.1-.1v-9.8h-6.9v26.6h6.9V37.7s0-.1.1-.1h8.1s.1 0 .1.1v10.5h6.9V21.6h-6.9z" class="st1"/><path d="M6 35c0 11 8.9 19.9 19.9 19.9 11 0 19.9-8.9 19.9-19.9 0-11-8.9-19.9-19.9-19.9C14.9 15.1 6 24 6 35zm2.5 0c0-9.6 7.8-17.4 17.4-17.4 9.6 0 17.4 7.8 17.4 17.4 0 9.6-7.8 17.4-17.4 17.4-9.6 0-17.4-7.8-17.4-17.4zm24.1-12.2v6.1c0 .1 0 .1-.1.1H19.4c-.1 0-.1 0-.1-.1v-6.1c0-.4-.3-.7-.7-.7-.1 0-.3 0-.4.1C13.7 24.9 11 29.7 11 35c0 5.3 2.7 10.1 7.2 12.8.1.1.2.1.4.1.4 0 .7-.3.7-.7v-6.1c0-.1 0-.1.1-.1h13.1c.1 0 .1 0 .1.1v6.1c0 .4.3.7.7.7.1 0 .3 0 .4-.1 4.5-2.7 7.2-7.5 7.2-12.8 0-5.3-2.7-10.1-7.2-12.8-.1-.1-.2-.1-.4-.1-.4 0-.7.3-.7.7zM16.3 42.4c-1.6-2.1-2.5-4.8-2.5-7.4 0-2.7.9-5.3 2.5-7.4l.1-.1v.1c0 .6-.1 1.1-.1 1.6v13.2zm3-4.5V32c0-.1 0-.1.1-.1h13.1c.1 0 .1 0 .1.1v5.9c0 .1 0 .1-.1.1l-13.2-.1c0 .1 0 .1 0 0zm16.1 4.5c0-.6.1-1.1.1-1.6V29.2c0-.5 0-1-.1-1.6v-.1l.1.1c1.6 2.1 2.5 4.8 2.5 7.4 0 2.7-.9 5.3-2.6 7.4v.1-.1z" class="st0"/><g><path d="M80.8 40c0-1.5-1.1-2.6-3.5-2.6h-4.8v5.2h4.9c2 0 3.4-.7 3.4-2.6zm-.9-10.4c0-1.5-1-2.5-2.5-2.5h-4.9v5h4.8c1.7-.1 2.6-1.4 2.6-2.5zm8 11.1c0 4.5-4.1 7.4-8.3 7.4H65.9V21.5h12.5c4.8 0 8.3 2.4 8.3 7.3 0 4.2-3.7 5.5-3.7 5.5.1 0 4.9 1.1 4.9 6.4zM107.8 34.8c0-4.2-1.9-7.6-5.7-7.6-3.8 0-5.7 3.4-5.7 7.6 0 4.2 1.9 7.6 5.7 7.6 3.8 0 5.7-3.4 5.7-7.6zm6.5 0c0 7.8-4.5 14-12.3 14-7.7 0-12.3-6.1-12.3-14 0-7.8 4.5-14 12.3-14 7.8 0 12.3 6.2 12.3 14zM136.7 40.1c0 5.9-5.3 8.7-10.3 8.7-5.8 0-8.8-2.2-11.1-5l4.3-4.2c1.8 2.3 4.1 3.4 6.8 3.4 2.1 0 3.6-1.1 3.6-2.6 0-1.7-1.3-2.2-4.8-3l-.9-.2c-4.2-.9-7.7-3.3-7.7-8 0-5.2 4.3-8.4 9.9-8.4 4.8 0 7.9 2 9.7 4.2l-4.1 4.1c-1.3-1.4-3.2-2.5-5.5-2.5-1.5 0-3.2.7-3.2 2.5 0 1.6 1.8 2.2 4.1 2.7l.9.2c3.7.8 8.3 1.9 8.3 8.1zM161.5 43c-2.7 3.9-5.3 5.8-10.5 5.8-7.5 0-12.3-6.2-12.3-14.1 0-7.5 4.4-13.8 12.4-13.8 4.4 0 7.6 1.7 10.3 5.8l-5.4 3.6c-1.1-1.9-2.5-3-4.8-3-3 0-5.8 2.7-5.8 7.4 0 5.3 3.1 7.8 6 7.8 2.5 0 3.7-1.3 4.8-3.1l5.3 3.6zM186 48.2h-7V37.6h-8.1v10.6h-7V21.5h7v9.8h8.1v-9.8h7z" class="st1"/></g></svg>
			</figure>
			<figure class="no-margin">
				<svg height="70" id="svg3168" viewBox="0 0 192 70" width="192" xmlns="http://www.w3.org/2000/svg"><style>.st0{fill:#909295;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#909295;}</style><path class="st0" d="M83.9 59.2v4.2l.3.1c1 .2 2 .3 2.9.4.9.1 1.8.1 2.6.1.8-.1 1.6-.2 2.4-.5.9-.3 1.8-.7 2.5-1.3.7-.6 1.2-1.3 1.5-2.1.5-1.4.5-2.9 0-4.3-.3-.7-.7-1.3-1.3-1.8-.6-.5-1.2-.9-1.9-1.1l-3.2-1.2c-.4-.2-.7-.5-.9-.8-.1-.3-.1-.7 0-1 .1-.1.1-.2.2-.3l.3-.3.1-.1c.4-.2.7-.3 1.1-.3.7-.1 1.4-.1 2 0 .8.1 1.6.2 2.4.4h.2v-3.9l-.3-.1c-.8-.2-1.6-.3-2.4-.4-1-.1-2.1-.1-3.2 0-1.3.1-2.6.6-3.6 1.5-.7.6-1.2 1.3-1.6 2.1-.5 1.3-.5 2.7 0 4 .2.6.6 1.2 1.1 1.7.4.4.9.8 1.4 1 .7.4 1.4.7 2.2.9.3.1.5.2.8.2l.4.1h.1c.4.1.7.3 1 .6.2.2.4.4.4.7.1.2.1.5 0 .7-.1.4-.4.7-.7.9-.4.2-.8.3-1.2.4-.6.1-1.3.1-1.9.1-.8-.1-1.6-.2-2.5-.3-.4-.1-.8-.2-1.3-.3h.1M66.5 63.3v-4.9h-.1c-1.1.5-2.3.8-3.5.9-1.3.1-2.5-.3-3.6-1.1-.7-.6-1.3-1.3-1.6-2.2-.3-1-.3-2-.1-2.9.2-1 .8-1.9 1.6-2.5.7-.6 1.6-1 2.5-1.1 1.6-.2 3.3.1 4.7.9l.1.1v-4.9l-.2-.1c-1.4-.5-3-.7-4.5-.6-1.4 0-2.7.3-4 .9-1.3.6-2.4 1.4-3.3 2.5-2.8 3.5-2.8 8.4-.2 12 1.3 1.7 3.1 2.9 5.2 3.3 2.2.5 4.5.4 6.6-.2l.4-.1M77.6 63.7V45.2h-4.7v18.5h4.7M146.4 61.5v-.3h-1.9v.3h.8v2.2h.3v-2.2h.8M146.6 63.7h.3v-2h.1l.7 2h.3l.8-2.1v2.1h.3v-2.5h-.5l-.7 2-.8-2h-.5v2.5M42.9 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5v-5.1c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6v5.1M55.6 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5V18.9c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6v11.5M68.3 35c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5V10.2c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6V35M81 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5V18.9c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6v11.5M93.7 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5v-5.1c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6s-1.2.2-1.6.6c-.4.4-.7 1-.7 1.6v5.1M106.4 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5V18.9c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6v11.5M119.1 35c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5V10.2c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6V35M131.8 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5V18.9c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6v11.5M144.5 30.4c0 .6.3 1.1.7 1.5.4.4 1 .6 1.6.6.6 0 1.1-.2 1.6-.6.4-.4.7-.9.7-1.5v-5.1c0-.6-.3-1.2-.7-1.6-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6-.4.4-.7 1-.7 1.6v5.1M115.1 63.3v-4.9h-.1c-1.1.5-2.3.8-3.5.9-1.3.1-2.5-.3-3.6-1.1-.7-.6-1.3-1.3-1.6-2.2-.3-1-.3-2-.1-2.9.2-1 .8-1.9 1.6-2.5.7-.6 1.6-1 2.5-1.1 1.6-.2 3.3.1 4.7.9l.1.1v-4.9l-.2-.1c-1.4-.5-3-.7-4.5-.6-1.4 0-2.7.3-4 .9-1.3.6-2.4 1.4-3.3 2.5-2.8 3.5-2.8 8.4-.2 12 1.3 1.7 3.1 2.9 5.2 3.3 2.2.5 4.5.4 6.6-.2l.4-.1M120 54.4c0 2.9 1.4 5.7 3.7 7.5 2.3 1.8 5.3 2.5 8.1 1.9 3.9-.7 6.9-3.8 7.6-7.6.7-3.9-1.1-7.8-4.5-9.8-3-1.8-6.7-2-9.8-.3-3.1 1.6-5 4.8-5.1 8.3m6.8-3.7c1-.8 2.3-1.2 3.6-1 1.3.1 2.4.8 3.2 1.8.8 1 1.2 2.3 1 3.6-.1 1.3-.8 2.4-1.8 3.2-1 .8-2.3 1.2-3.6 1-1.3-.1-2.4-.8-3.2-1.8-.8-1-1.2-2.3-1-3.6.1-1.3.8-2.4 1.8-3.2"/></svg>
			</figure>
			<figure class="no-margin">
				<svg height="70" id="svg3168" viewBox="0 0 192 70" width="192" xmlns="http://www.w3.org/2000/svg" ><style>.st0{fill:#909295;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#909295;}</style><g id="layer1"><g id="g3271"><g id="g3087"><g id="g3114"><path id="path3057" d="M50.85 32.552c-.292 0-.583.292-.583.583v21.278c0 .29.333.583.582.583h10.2c6.622 0 11.702-4.33 11.702-11.243 0-5.538-3.706-11.242-12.284-11.242h-9.62zm6.162 5.996h3.58c2.708 0 5.164 1.666 5.164 5.247 0 2.873-2.248 5.413-5.163 5.413h-3.58v-10.66z" class="st0"/><path id="path3059" d="M82.495 38.298c-4.663 0-8.62 3.915-8.62 8.412 0 5.33 4.207 8.786 8.62 8.786 4.83 0 8.62-3.79 8.62-8.537 0-4.54-3.33-8.662-8.62-8.662zm.042 5.622c1.79 0 2.915 1.374 2.915 2.915 0 1.623-1.29 2.914-2.915 2.914-1.5 0-2.915-1.167-2.915-2.957-.04-1.582 1.333-2.873 2.915-2.873z" class="st0"/><path id="path3061" d="M93.613 55.038c-.29 0-.583-.292-.583-.583v-14.99c0-.292.292-.584.583-.584h4.79c.29 0 .582.293.582.584v1.208s1.957-2.25 5.538-2.25c2.915 0 4.04 1.334 4.663 2.833.916-1.333 2.75-2.832 5.705-2.832 3.665 0 5.08 2.082 5.08 5.247v10.785c0 .29-.29.583-.582.583h-4.955c-.292 0-.583-.292-.583-.583V45.46c0-1.04-.833-1.665-1.79-1.665-1.583 0-2.54 1.207-2.54 1.207v9.453c0 .29-.292.583-.583.583h-4.956c-.29 0-.582-.292-.582-.583V45.46c0-.874-.5-1.665-1.79-1.665-1.582 0-2.54 1.29-2.54 1.29v9.37c0 .29-.292.583-.583.583h-4.872z" class="st0"/><path id="path3063" d="M158.696 38.298c-4.664 0-8.62 3.915-8.62 8.412 0 5.33 4.206 8.786 8.62 8.786 4.83 0 8.62-3.79 8.62-8.537 0-4.54-3.374-8.662-8.62-8.662zm0 5.622c1.79 0 2.914 1.374 2.914 2.915 0 1.623-1.29 2.914-2.914 2.914-1.5 0-2.915-1.167-2.915-2.957 0-1.582 1.333-2.873 2.916-2.873z" class="st0"/><path id="path3065" d="M131.713 55.038c-.29 0-.583-.292-.583-.583v-14.99c0-.292.292-.584.583-.584h4.955c.292 0 .583.293.583.584v1.125s1.667-2.167 5.54-2.167c4.08 0 5.537 2.415 5.537 5.538v10.495c0 .29-.29.583-.582.583h-4.956c-.292 0-.584-.292-.584-.583v-8.412c0-.957-.416-2.248-2.415-2.248-1.664 0-2.54 1.207-2.54 1.207v9.453c0 .29-.29.583-.582.583h-4.955z" class="st0"/><path id="path3067" d="M123.01 55.038c-.29 0-.582-.292-.582-.583v-14.99c0-.292.29-.584.583-.584h4.956c.29 0 .583.293.583.584v14.99c0 .29-.293.583-.584.583h-4.955z" class="st0"/><path id="path3069" d="M129.09 34.176c0 1.874-1.54 3.415-3.456 3.415-1.915 0-3.456-1.54-3.456-3.414s1.54-3.414 3.456-3.414c1.915 0 3.456 1.5 3.456 3.414z" class="st0"/><path id="path3071" d="M165.275 34.176c0-1.79 1.457-3.33 3.456-3.33 2.166 0 3.5 1.748 3.5 3.58 0 2.915-2.25 4.497-4 5.33-.25.125-.374.208-.79-.333-.54-.625-.29-.667 0-1 .208-.208.416-.374.708-.666 0 0 .208-.208.208-.583-1.457.042-3.08-1.124-3.08-2.998z" class="st0"/><path id="path3073" d="M170.688 43.545c0-3.706 3.58-5.122 7.328-5.122 3.665 0 5.58 1.083 6.913 1.832.373.167.373.542.207.833l-1.666 2.832c-.207.375-.498.416-.957.125-.874-.542-2.04-1.29-4.122-1.29-.998 0-1.79.25-1.79.873 0 1.666 9.453-.458 9.453 6.288 0 3.83-3.498 5.62-7.912 5.62-4.537 0-7.535-2.08-7.535-2.08-.375-.25-.292-.542 0-.96l1.79-2.997c.208-.417.625-.417 1-.167 0 0 2.664 1.707 5.163 1.707 1.665 0 2.248-.583 2.248-.874-.083-2.082-10.118 0-10.118-6.62z" class="st0"/></g></g><path d="M44.2 27.892l-11.032-11.03c-.25-.25-.583-.376-.958-.376-.374 0-.708.125-.957.375L19.513 28.6l13.072 13.07L44.2 30.057c.54-.5.54-1.624 0-2.165zm-11.907 4.204c-1.748 0-3.205-1.415-3.205-3.205s1.415-3.204 3.205-3.204c1.75 0 3.206 1.415 3.206 3.205s-1.458 3.206-3.207 3.206zM6.36 41.754c-.458.458-.458 1.415 0 1.914l11.114 11.115c.458.458 1.582.458 2.04 0l.458-.458 12.113-12.113-13.07-13.07L6.36 41.753zm7.243 3.746c-1.748 0-3.205-1.415-3.205-3.205s1.415-3.205 3.205-3.205 3.205 1.415 3.205 3.205-1.415 3.205-3.205 3.205zm9.7-5.744c1.747 0 3.204 1.415 3.204 3.205s-1.415 3.206-3.205 3.206-3.205-1.415-3.205-3.205 1.457-3.204 3.205-3.204z" class="st0"/></g></g></svg>
			</figure>
		</div>
		<button class="btn btn-accent">Learn About Private Training</button>
	</article>

	<article class="block block-container large-padding quote-section text-center w33">
		${journalContentUtil.getContent(groupId, class_details.quote_article_id.data, "", locale, xmlRequest)}
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

<div class="text-center">
	<a href="${general_class_info.course_pdf.data}" class="btn btn-accent">Download Course PDF</a>
</div>

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

	.target-positions p {
		font-size: 1.5em;
		margin: 0;
	}

	.target-positions li {
		font-size: 2em;
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