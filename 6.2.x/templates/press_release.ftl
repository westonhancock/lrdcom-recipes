<div class="press-release">
	<h1 class="heading">
		${heading.data}
	</h1>

	<#if subheading.data?has_content>
		<p class="subheading">
			${subheading.data}
		</p>
	</#if>

	<div class="content">
		<#list stringUtil.splitLines(content.data) as line>
			<#if line?has_content>
				<p>${line}</p>
			</#if>
		</#list>
	</div>

	<div class="about-content">
		<div class="default-about-content">
			<h4>About Liferay</h4>

			<p>
				Liferay makes software that helps companies create digital experiences on web, mobile and connected devices. Our platform is open source, which makes it more reliable, innovative and secure. We try to leave a positive mark on the world through business and technology. Companies such as Adidas, Carrefour, Cisco Systems, Danone, Fujitsu, Lufthansa Flight Training, Siemens, Société Générale and the United Nations use Liferay. Visit us at <a href="//www.liferay.com">www.liferay.com</a>.
			</p>
		</div>

		<#if additional_about_content.data?has_content>
			${additional_about_content.data}
		</#if>
	</div>

	<div class="contact-info">
		<#list stringUtil.splitLines(contact_info.data) as line>
			<#if line?has_content>
				<div>${line}</div>
			</#if>
		</#list>
	</div>
</div>