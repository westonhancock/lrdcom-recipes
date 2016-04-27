<#assign localization_json_object = jsonFactoryUtil.createJSONObject("
	{
		back: {
			en_US: 'Back'
		},

		best_for: {
			en_US: 'Best For'
		},

		company: {
			de_DE: 'Unternehmen',
			en_US: 'Company',
			es_ES: 'Empresa',
			fr_FR: 'Société',
			it_IT: 'Azienda',
			ja_JP: '会社名',
			pt_BR: 'Empresa',
			zh_CN: '公司'
		},

		country: {
			de_DE: 'Land',
			en_US: 'Country',
			es_ES: 'País',
			fr_FR: 'Pays',
			it_IT: 'Paese',
			ja_JP: '国',
			pt_BR: 'País',
			zh_CN: '国家'
		},

		department: {
			de_DE: 'Abteilung',
			en_US: 'Department',
			es_ES: 'Departamento',
			fr_FR: 'Département',
			it_IT: 'Reparto',
			ja_JP: '部署',
			pt_BR: 'Departamento',
			zh_CN: '部门'
		},

		email: {
			de_DE: 'E-Mail',
			en_US: 'Email',
			es_ES: 'Email',
			fr_FR: 'Email',
			it_IT: 'E-mail',
			ja_JP: 'メールアドレス',
			pt_BR: 'Email',
			zh_CN: '邮箱'
		},

		fax: {
			de_DE: 'Fax',
			en_US: 'Fax',
			es_ES: 'Fax',
			fr_FR: 'Fax',
			it_IT: 'Fax',
			ja_JP: 'Fax',
			pt_BR: 'Fax',
			zh_CN: '传真'
		},

		firstname: {
			de_DE: 'Vorname',
			en_US: 'First Name',
			es_ES: 'Nombre',
			fr_FR: 'Prénom',
			it_IT: 'Nome',
			ja_JP: '名',
			pt_BR: 'Primeiro Nome',
			zh_CN: '名'
		},

		job_role__c: {
			de_DE: 'Funktionsbezeichnung',
			en_US: 'Job Role',
			es_ES: 'Job Role',
			fr_FR: 'Fonction',
			it_IT: 'Ruolo professionale',
			ja_JP: '役割',
			pt_BR: 'Posição',
			zh_CN: '职位'
		},

		lastname: {
			de_DE: 'Nachname',
			en_US: 'Last Name',
			es_ES: 'Apellido',
			fr_FR: 'Nom',
			it_IT: 'Cognome',
			ja_JP: '姓',
			pt_BR: 'Último Nome',
			zh_CN: '姓'
		},

		phone: {
			de_DE: 'Telefon',
			en_US: 'Phone',
			es_ES: 'Teléfono',
			fr_FR: 'Téléphone',
			it_IT: 'Telefono',
			ja_JP: '電話番号',
			pt_BR: 'Telefone',
			zh_CN: '联系电话'
		},

		press-releases: {
			de_DE: 'Presse',
			en_US: 'Press Releases',
			es_ES: 'Notas de Prensa',
			fr_FR: 'Communiqués de presse',
			it_IT: 'Comunicati stampa',
			ja_JP: 'プレスリリース',
			pt_BR: 'Press Releases',
			zh_CN: '新闻发布'
		},

		project_use_case: {
			de_DE: 'Anwendungsfall',
			en_US: 'Project Use Case',
			es_ES: 'Caso de Uso del Proyecto',
			ja_JP: '利用されるプロジェクト',
			pt_BR: 'Projeto do Caso de Sucesso',
			zh_CN: '项目使用案例'
		},

		show_me_liferay: {
			de_DE: 'Ich möchte Liferay kennen lernen',
			en_US: 'Show Me Liferay',
			es_ES: 'Muéstrame Liferay',
			fr_FR: 'Je veux découvrir Liferay',
			it_IT: 'Mostrami Liferay',
			ja_JP: 'デモを希望',
			pt_BR: 'Mostre-me a Liferay',
			zh_CN: '了解并体验'
		},

		solution_interest: {
			de_DE: 'Wofür möchten Sie Liferay nutzen?',
			en_US: 'What are you building?',
			es_ES: '¿Qué proyectos estás construyendo?',
			fr_FR: 'Projet en cours',
			it_IT: 'Che cosa sta costruendo',
			ja_JP: '構築するサイト',
			pt_BR: 'Qual o seu projeto com Liferay?'
		},

		state: {
			de_DE: 'Region',
			en_US: 'State/Province *',
			es_ES: 'Región *',
			fr_FR: 'Région *',
			it_IT: 'Stato/Regione',
			ja_JP: '県/州 *',
			pt_BR: 'Estado/Região *',
			zh_CN: '省份 *'
		},

		tel: {
			de_DE: 'Tel',
			en_US: 'Tel',
			es_ES: 'Tel',
			fr_FR: 'Tel',
			it_IT: 'Tel',
			ja_JP: 'Tel',
			pt_BR: 'Tel',
			zh_CN: '电话'
		},

		x-is-required: {
			en_US: '{0} is required',
			zh_CN: 'China requires {0}'
		},

		your_request_completed_successfully: {
			en_US: 'Your request completed successfully.'
		},

		your_request_failed_to_complete: {
			en_US: 'Your request failed to complete.'
		}
	}
") />

<#function localize key default_value vars...>
	<#assign localized_key = key />

	<#if localization_json_object.getJSONObject(key)?? && localization_json_object.getJSONObject(key).getString(locale)?has_content>
		<#assign localized_key = localization_json_object.getJSONObject(key).getString(locale) />
	<#elseif localization_json_object.getJSONObject(key)?? && localization_json_object.getJSONObject(key).getString("en_US")?has_content>
		<#assign localized_key = localization_json_object.getJSONObject(key).getString("en_US") />
	<#elseif default_value?has_content>
		<#assign localized_key = default_value />
	</#if>

	<#list vars as var>
		<#assign localized_key = stringUtil.replace(localized_key, "{" + var_index + "}", var) />
	</#list>

	<#return localized_key>
</#function>
