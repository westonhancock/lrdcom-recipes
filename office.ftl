<#attempt>
	<#include "${templatesPath}/43374" />
<#recover>
	<script type="text/javascript" xmlns="http://www.w3.org/1999/html">console.log("Error in Localization Template")</script>
</#attempt>

<div class="office">
	${flag.data}

	<h2>${office_title.data}</h2>
	<div>${company_title.data}</div>

	<address class="vcard">
		<div class="adr">
			<div>${address.data}</div>

			<#list address.additional_line.siblings as line>
				<div>${line.data}</div>
			</#list>
		</div>

		<#list phone.getSiblings() as cur_phone>
			<div class="tel">
				<#if getterUtil.getBoolean(cur_phone.fax.data)>
					<span class="fax">${localize("fax")}: ${cur_phone.data}</span>
				<#else>
					${localize("tel")}: ${cur_phone.data}
				</#if>
			</div>
		</#list>
	</address>

	<#if office_hours?has_content>
		<div>${localize("office-hours")}: ${office_hours.data}</div>
	</#if>

	<#if additional_details?has_content>
		<#list additional_details.siblings as detail>
			<div>${detail.data}</div>
		</#list>
	</#if>
</div>
