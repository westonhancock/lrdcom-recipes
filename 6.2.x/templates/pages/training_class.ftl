<#assign serviceContext = staticUtil["com.liferay.portal.service.ServiceContextThreadLocal"].getServiceContext()>
<#assign httpServletRequest = serviceContext.getRequest()>
<#assign request_url = "/osb-portlet/training/events" />

<#if course_id.data?has_content>
	<#assign request_url = request_url + "?trainingCourseId=" + course_id.data + "&" />
</#if>

<#assign request_url = request_url + "?startDate=" + .now?long />

<#assign css_padding_class = ""/>

<#if number_of_classes.data == "0">
	<#assign css_padding_class = "no-padding"/>
</#if>

<div class="training-class-container ${css_padding_class} w100">
	<#if class_section_heading.data?has_content>
		<h3 class="primary-color">${class_section_heading.data}</h3>
	</#if>

	<div class="standard-padding-vertical" id="${randomNamespace}trainingEvents"></div>

	<#if number_of_classes.data != "0">
		<#assign css_class = "cta font-color font-weight-bold link"/>

		<#if display_style.data == "2">
			<#assign css_class = "btn btn-complementary"/>
		</#if>

		<a href="/services/training/schedule" class="${css_class}">
			${languageUtil.get(locale, "see-full-schedule", "See Full Schedule")}

			<#if display_style.data == "1">
				<svg class="cta-icon" height="10" width="8"><use xlink:href="#caret" /></svg>
			</#if>
		</a>
	</#if>
</div>

<style>
.training-class-container {
	float: left;
	padding: 5% 0 0 3%;
}

.training-class-container td {
	padding: 1em 1em 0 0;
}

.training-class-container .training-class {
	float: left;
	vertical-align: top;
	width: 33%;
}

.training-class-container .training-class .registration {
	padding-top: .5em;
}

.training-class-container .training-class .title {
	width: 90%;
}

.training-class-container .training-class .date:before,
.training-class-container .training-class .location:before {
	content: " ";
	display: inline-block;
	height: 14px;
	padding-right: 3px;
	width: 14px;
}

.training-class-container .training-class .register:after {
	content: " ";
	display: inline-block;
	height: 14px;
	position: relative;
	top: 3px;
	width: 9px;
}

.training-class-container .training-class .date:before {
	background: url(//web.liferay.com/documents/14/8441624/calendar-sm.png) no-repeat center;
}

.training-class-container .training-class .location:before {
	background: url(//web.liferay.com/documents/14/8441624/location-sm.png) no-repeat center;
}
</style>

<script type="text/javascript">
	var ${randomNamespace}trainingEventsTable;

	var ${randomNamespace}trainingEvents = document.getElementById('${randomNamespace}trainingEvents');

	function ${randomNamespace}displayTrainingEvents() {
		var count = ${number_of_classes.data};

		if ((${number_of_classes.data} == "0") || (${number_of_classes.data} > ${randomNamespace}trainingEventsTable.length)) {
			count = ${randomNamespace}trainingEventsTable.length;
		}

		var html = '';

		if (${display_style.data} == "1") {
			html = '<table><tr class="header-row">';

			if (${number_of_classes.data} == "0") {
				html += '<th class="location text-left">Event</th>';
			}

			html += '<th class="col-1 date first-col text-left">Date</th>' +
					'<th class="location text-left">Location</th>';

			if (${number_of_classes.data} == "0") {
				html += '<th class="location text-left">Language</th>';
			}

			html += '<th>&nbsp;</th></tr>';

			var buttonText = '${languageUtil.get(locale, "reserve-your-spot", "Reserve Your Spot")}';

			if (count > 5) {
				buttonText = '${languageUtil.get(locale, "register", "Register")}';
			}

			for (i = 0; i < count; i++) {
				html += '<tr>';

				if (${number_of_classes.data} == "0") {
					html += '<td class="event">' + ${randomNamespace}trainingEventsTable[i].trainingCourse +'</td>';
				}

				html += '<td class="date">' + ${randomNamespace}trainingEventsTable[i].startDate +'</td>' +
					'<td class="location">' + ${randomNamespace}trainingEventsTable[i].trainingLocation + '</td>';

				if (${number_of_classes.data} == "0") {
					html += '<td class="location">' + ${randomNamespace}trainingEventsTable[i].language + '</td>';
				}

				html += '<td class="registration"><a href="' + ${randomNamespace}trainingEventsTable[i].enrollmentURL  +
						'" class="btn btn-complementary" target="_blank">' + buttonText + '</a></td></tr>';
			}

			html += ('</table>');
		}
		else {
			for (i = 0; i < count; i++) {
				html += '<div class="block small-padding-vertical training-class">' +
					'<div class="font-weight-bold title">' +
						${randomNamespace}trainingEventsTable[i].trainingCourse +
					'</div>' +
					'<div class="date">' +
						${randomNamespace}trainingEventsTable[i].startDate +
					'</div>' +
					'<div class="location">' +
						 ${randomNamespace}trainingEventsTable[i].trainingLocation +
					'</div>' +
					'<div class="registration"><a href="' + ${randomNamespace}trainingEventsTable[i].enrollmentURL + '" class="cta font-color font-weight-bold register" target="_blank">' +
						'${languageUtil.get(locale, "register", "Register")}' +
						'&nbsp;<svg class="cta-icon" height="10" width="8"><use xlink:href="#caret" /></svg></a></div>' +
				'</div>';
			}
		}

		${randomNamespace}trainingEvents.innerHTML = html;
	}

	function ${randomNamespace}getTrainingEvents() {
		AUI().use(
			"aui-base", "aui-io-plugin", "aui-io-request",
			function (A) {
				A.io.request(
					'${request_url}',
					{
						data: {},
						dataType: "json",
						on: {
							success: function (event, id, obj) {
								var responseData = this.get("responseData");

								${randomNamespace}trainingEventsTable = responseData.trainingEvents || [];
								${randomNamespace}displayTrainingEvents();
							},
							failure: function (event, id, obj) {
								console.log("fail: " + JSON.stringify(event));
							}
						}
					}
				);
			}
		);
	}

	AUI().ready(
		function() {
			${randomNamespace}getTrainingEvents();
		}
	);
</script>