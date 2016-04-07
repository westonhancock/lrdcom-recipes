<style>
.about-content, .additional-about-content, .contact-info, .content, .default-about-content {
	padding-top: .5em;
}
</style>

<div class="press-release">
	<h1 class="primary-color small-padding-vertical">
		${heading.data}
	</h1>

	<#if subheading.data?has_content>
		<h2>
			${subheading.data}
		</h2>
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
			<#if locale.getLanguage() == "de" >
				<h3>Über Liferay</h3>

				<p>
					<a href="http://www.liferay.com" target="_blank">Liferay</a> entwickelt Software, mit der Unternehmen aller Größenordnungen für das Web, für mobile Endgeräte und für das Internet der Dinge ein durchgängiges digitales Erlebnis gestalten können. Als Open-Source-Plattform bietet Liferay innovative, zukunftsfähige, flexible und sichere Funktionalitäten zur Umsetzung einer digitalen Business-Strategie, die das Intranet, Extranet sowie den Webauftritt einschließen. Die Software wird bereits über 5 Millionen Mal weltweit eingesetzt. Zu den Kunden zählen&nbsp;Kleinunternehmen, Mittelständler und auch Großunternehmen&nbsp; wie Allianz, Carrefour, Cisco Systems, Danone, Fujitsu, Lufthansa Flight Training, Siemens, Société Générale, Toyota und die Vereinten Nationen. Mit 18 Büros und einem internationalen Partnernetzwerk ist Liferay auf allen Kontinenten vertreten. Mehr als 140.000 registrierte Mitglieder der Liferay-Community begleiten die Entwicklung. Die europäische Zentrale sowie die Geschäftsleitung für die DACH Region befinden sich am Standort Eschborn bei Frankfurt am Main. Weitere Informationen finden sich unter <a href="http://www.liferay.com/de" target="_blan">www.liferay.com</a>
				</p>
			<#elseif locale.getLanguage() == "es">
				<h3>Acerca de Liferay, Inc</h3>

				<p>
					Liferay desarrolla software que ayuda a las organizaciones a crear experiencias digitales en la web, el móvil y en todo tipo de dispositivos conectados. Nuestra plataforma es de código abierto, lo que hace posible una mayor fiabilidad, innovación y seguridad. La empresa intenta dejar una impronta positiva en el mundo, a través de los negocios y de la tecnología. Compañías como Allianz, Carrefour, Cisco Systems, Danone, Fujitsu, Lufthansa Flight Training, Siemens, Société Générale, Toyota y Naciones Unidas utilizan Liferay. Visítenos en <a href="/es/home" target="_blank">www.liferay.com.</a>
				</p>
			<#elseif locale.getLanguage() == "fr">
				<h3>A propos de Liferay</h3>

				<p>
					Liferay est un éditeur de solution de portail d'entreprise open source. A travers une plate-forme fiable et évolutive ainsi qu'un support multicanal, Liferay permet aux grandes entreprises de concevoir des solutions web innovantes au service de l'expérience client. Parmi ses clients&nbsp;: Allianz, Carrefour, Cisco Systems, Danone, Fujitsu, Lufthansa Flight Training, Siemens, Société Générale, Toyota et les Nations-Unies. Pour plus d'infos: <a href="/fr/home" target="_blank">www.liferay.com.</a>
				</p>
			<#elseif locale.getLanguage() == "it">
				<h3>Informazioni su Liferay</h3></p>

				<p>
					Liferay produce software che aiuta le aziende a creare esperienze digitali su web, dispositivi mobile e collegati. La nostra è una piattaforma open source, caratteristica che la rende più affidabile, innovativa e sicura. Auspichiamo di lasciare un segno positivo nel mondo attraverso il business e la tecnologia. Tra le aziende che utilizzano i prodotti Liferay annoveriamo: Allianz, Carrefour, Cisco Systems, Danone, Fujitsu, Lufthansa Flight Training, Siemens, Société Générale, Toyota e le Nazioni Unite. Visitaci sul sito <a href="/home" target="_blank">www.liferay.com.</a>
				</p>
			<#elseif locale.getLanguage() == "ja">
				<h3>About Liferay</h3>

				<p>
					<span style="font-style: normal;">Liferay</span>は、様々なデバイスを通して<span style="font-style: normal;">Web</span>のデジタル体験を創造するソフトウェアを提供しています。<span style="font-style: normal;">Liferay</span>のプラットフォームはオープンソースがもたらす革新性と合わせ、高い信頼性とセキュリティを兼ね備えています。我々はビジネスとテクノロジーによって、世界に優れた足跡を残すことを目指し日々活動しています。<span style="font-style: normal;">Liferay</span>の製品は世界中の有力企業に採用されており、お客様には、アリアンツ保険、カルフール、シスコシステムズ、ダノン、富士通、ルフトハンザ、シーメンズ、ソシエテ・ジェネラル、トヨタ、国連などが含まれます。より詳しい情報は <a href="http://www.liferay.com/ja" target="_blank">www.liferay.com/ja</a> をご覧ください。
				</p>

			<#elseif locale.getLanguage() == "pt">
				<h3>Sobre Liferay, Inc.</h3></p>

				<p>
					Liferay, Liferay Portal, e o logotipo da Liferay são marcas registradas da Liferay, Inc., nos Estados Unidos e em outros países.
				</p>
			<#elseif locale.getLanguage() == "zh">
				<h3>关于Liferay, Inc.</h3></p>

				<p>
					Liferay 开发可以帮助公司在 Web、移动端以及连接的设备上创建数字化体验的软件。Liferay平台是开源的，正因为如此它是更加可靠的、 创新的和安全的。Liferay努力通过商业和技术领域为世界带来积极的影响。客户群包括安联、 家乐福、 Cisco 系统、达能、 富士通、 汉莎航空飞行训练、 西门子、法国兴业银行、 丰田和联合国等。请访问<a href="/zh/home" target="_blank">www.liferay.com</a> 获取更多信息。
				</p>
			<#else>
				<h3>About Liferay</h3>

				<p>
					Liferay makes software that helps companies create digital experiences on web, mobile and connected devices. Our platform is open source, which makes it more reliable, innovative and secure. We try to leave a positive mark on the world through business and technology. Companies such as Adidas, Carrefour, Cisco Systems, Danone, Fujitsu, Lufthansa Flight Training, Siemens, Société Générale and the United Nations use Liferay. Visit us at <a href="//www.liferay.com">www.liferay.com</a>.
				</p>
			</#if>
		</div>

		<div class="additional-about-content">
			<#if additional_about_content.data?has_content>
				${additional_about_content.data}
			</#if>
		</div>
	</div>

	<div class="contact-info">
		<h3>${languageUtil.get(locale, "contact")}</h3>

		<#if !contact_info.data?has_content >
			Liferay, Inc.<br />
			Rebecca Shin<br />
			1-877-LIFERAY<br />
			pr@liferay.com<br />
			Twitter: <a href="http://www.twitter.com/liferay">Liferay</a></p>
		<#else>
			<#list stringUtil.splitLines(contact_info.data) as line>
				<#if line?has_content>
					${line}<br />
				</#if>
			</#list>
		</#if>
	</div>
</div>