<#assign layout_service = serviceLocator.findService("com.liferay.portal.service.LayoutLocalService") />
<#assign theme_display = request["theme-display"] />
<#assign plid = theme_display["plid"] />
<#assign layout = layout_service.getLayout(plid?number) />

<#if layoutPermission.contains(permissionChecker, layout, "UPDATE")>
	<#assign journal_article_service = serviceLocator.findService("com.liferay.portlet.journal.service.JournalArticleService") />

	<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
	<#assign http_servlet_request = service_context.getRequest() />

	<#assign article_id = paramUtil.getString(http_servlet_request, "articleId") />
	<#assign field_name = paramUtil.getString(http_servlet_request, "fieldName") />
	<#assign language_id = paramUtil.getString(http_servlet_request, "languageId") />
	<#assign level_path = paramUtil.getString(http_servlet_request, "levelPath") />
	<#assign value = paramUtil.getString(http_servlet_request, "value") />

	<#assign level_path = stringUtil.split(level_path) />

	<#assign article = journal_article_service.getArticle(groupId, article_id) />

	<#assign document = saxReaderUtil.read(article.getContent()) />

	<#assign root_element = document.getRootElement() />

	<#assign dynamic_elements = root_element.elements("dynamic-element") />

	<#list level_path as level>
		<#if level_has_next>
			<#assign current_element = dynamic_elements[getterUtil.getInteger(level)] />

			<#assign dynamic_elements = current_element.elements("dynamic-element") />
		</#if>
	</#list>

	<#assign content = "" />

	<#assign element_count = 0 />

	<#list dynamic_elements as dynamic_element>
		<#if validator.equals(dynamic_element.attributeValue("name"), field_name)>
			<#if element_count == level_path[level_path?size - 1]?number>
				<#assign content = dynamic_element />
			</#if>

			<#assign element_count = element_count + 1 />
		</#if>
	</#list>

	<#assign dynamic_content = content.elements("dynamic-content") />
	<#assign found_language_id = false />

	<#list dynamic_content as dynamic_content_element>
		<#assign content_language_id = dynamic_content_element.attributeValue("language-id") />

		<#if validator.equals(language_id, content_language_id)>
			<#assign void = dynamic_content_element.clearContent() />

			<#assign void = dynamic_content_element.addCDATA(value) />

			<#assign found_language_id = true />
		</#if>
	</#list>

	<#if !found_language_id>
		<#assign dynamic_content_element = content.addElement("dynamic-content") />

		<#assign void = dynamic_content_element.addAttribute("language-id", language_id) />

		<#assign void = dynamic_content_element.addCDATA(value) />

		<#assign available_locales = root_element.attributeValue("available-locales") />

		<#assign available_locales = stringUtil.add(available_locales, language_id) />

		<#assign void = root_element.addAttribute("available-locales", available_locales) />
	</#if>

	<#--<#assign void = journal_article_service.updateContent(article.getGroupId(), article.getArticleId(), article.getVersion(), document.formattedString("  ")) />-->

	<#assign logFactory = objectUtil('com.liferay.portal.kernel.log.LogFactoryUtil') />
	<#assign log = logFactory.getLog('com.liferay.portal.kernel.search.SearchEngineUtil') />

	<#function date_helper date unit>
		<#if date?has_content && unit?has_content>
			<#return getterUtil.getInteger(date?string(unit), -1)>
		<#else>
			<#return getterUtil.getInteger("-1")>
		</#if>
	</#function>

	<#assign articleDisplayDate = article.getDisplayDate()! />
	<#assign articleExpirationDate = article.getExpirationDate()! />
	<#assign articleReviewDate = article.getReviewDate()! />

	<#assign neverExpire = true />

	<#if articleExpirationDate?has_content>
		<#assign neverExpire = false />
	</#if>

	<#assign neverReview = true />

	<#if articleReviewDate?has_content>
		<#assign neverReview = false />
	</#if>

	<#--<#assign nullLong = staticUtil["java.lang.Long"] />-->
	<#--<#assign nullInt = staticUtil["java.lang.Integer"] />-->
	<#--<#assign nullDouble = staticUtil["java.lang.Double"] />-->
	<#--<#assign nullString = staticUtil["java.lang.String"] />-->
	<#--<#assign nullBoolean = staticUtil["java.lang.Boolean"] />-->
	<#--<#assign nullFile = staticUtil["java.io.File"] />-->
	<#--<#assign nullMap = staticUtil["java.util.Map"] />-->
	<#--<#assign nullServiceContext = staticUtil["com.liferay.portal.service.ServiceContext"] />-->

	<#--<#assign V = log.error(nullLong) />-->
	<#--<#assign V = log.error(nullInt) />-->
	<#--<#assign V = log.error(nullDouble) />-->
	<#--<#assign V = log.error(nullString) />-->
	<#--<#assign V = log.error(nullBoolean) />-->
	<#--<#assign V = log.error(nullFile) />-->
	<#--<#assign V = log.error(nullMap) />-->
	<#--<#assign V = log.error(nullServiceContext) />-->

	<#--<#assign void = journal_article_service.updateArticle(-->
		<#--nullLong, nullLong, nullString, nullDouble, nullMap, nullMap,-->
		<#--nullString, nullString, nullString, nullString, nullString,-->
		<#--nullInt, nullInt, nullInt, nullInt, nullInt,-->
		<#--nullInt, nullInt, nullInt, nullInt, nullInt, nullBoolean,-->
		<#--nullInt, nullInt, nullInt, nullInt, nullInt, nullBoolean,-->
		<#--nullBoolean, nullBoolean, nullString, nullFile, nullMap, nullString,-->
		<#--nullServiceContext)-->
	<#--/>-->

	<#--<#assign void = journal_article_service.updateArticle(-->
		<#--article.getGroupId(), article.getFolderId(), article.getArticleId(), article.getVersion(), article.getTitleMap(), article.getDescriptionMap(),-->
		<#--document.formattedString("  "), article.getType(), article.getStructureId(), article.getTemplateId(), article.getLayoutUuid(),-->
		<#--date_helper(articleDisplayDate, "MM"), date_helper(articleDisplayDate, "dd"), date_helper(articleDisplayDate, "yyyy"), date_helper(articleDisplayDate, "HH"), date_helper(articleDisplayDate, "mm"),-->
		<#--date_helper(articleExpirationDate, "MM"), date_helper(articleExpirationDate, "dd"), date_helper(articleExpirationDate, "yyyy"), date_helper(articleExpirationDate, "HH"), date_helper(articleExpirationDate, "mm"), neverExpire,-->
		<#--date_helper(articleReviewDate, "MM"), date_helper(articleReviewDate, "dd"), date_helper(articleReviewDate, "yyyy"), date_helper(articleReviewDate, "HH"), date_helper(articleReviewDate, "mm"), neverReview,-->
		<#--article.getIndexable(), article.isSmallImage(), article.getSmallImageURL(), nullFile, nullMap, nullString,-->
		<#--service_context)-->
	<#--/>-->

	<#assign V = log.error("Print out from Live Edit Resource Template") />
	<#assign V = log.error("___1___") />
	<#assign V = log.error(article.getGroupId()) />
	<#assign V = log.error(article.getFolderId()) />
	<#assign V = log.error(article.getArticleId()) />
	<#assign V = log.error(article.getVersion()) />
	<#assign V = log.error(article.getTitleMap()) />
	<#assign V = log.error(article.getDescriptionMap()) />

	<#assign V = log.error("___2___") />
	<#assign V = log.error(document.formattedString("  ")) />
	<#assign V = log.error(article.getType()) />
	<#assign V = log.error(article.getStructureId()) />
	<#assign V = log.error(article.getTemplateId()) />
	<#assign V = log.error(article.getLayoutUuid()) />

	<#assign V = log.error("___3___") />
	<#assign V = log.error(date_helper(articleDisplayDate, "MM")) />
	<#assign V = log.error(date_helper(articleDisplayDate, "dd")) />
	<#assign V = log.error(date_helper(articleDisplayDate, "yyyy")) />
	<#assign V = log.error(date_helper(articleDisplayDate, "HH")) />
	<#assign V = log.error(date_helper(articleDisplayDate, "mm")) />

	<#assign V = log.error("___4___") />
	<#assign V = log.error(date_helper(articleExpirationDate, "MM")) />
	<#assign V = log.error(date_helper(articleExpirationDate, "dd")) />
	<#assign V = log.error(date_helper(articleExpirationDate, "yyyy")) />
	<#assign V = log.error(date_helper(articleExpirationDate, "HH")) />
	<#assign V = log.error(date_helper(articleExpirationDate, "mm")) />
	<#assign V = log.error(neverExpire) />

	<#assign V = log.error("___5___") />
	<#assign V = log.error(date_helper(articleReviewDate, "MM")) />
	<#assign V = log.error(date_helper(articleReviewDate, "dd")) />
	<#assign V = log.error(date_helper(articleReviewDate, "yyyy")) />
	<#assign V = log.error(date_helper(articleReviewDate, "HH")) />
	<#assign V = log.error(date_helper(articleReviewDate, "mm")) />
	<#assign V = log.error(neverReview) />

	<#assign V = log.error("___6___") />
	<#assign V = log.error(article.getIndexable()) />
	<#assign V = log.error(article.isSmallImage()) />
	<#assign V = log.error(article.getSmallImageURL()) />
	<#assign V = log.error(null) />
	<#assign V = log.error(null) />
	<#assign V = log.error(null) />
	<#assign V = log.error(service_context) />

	<#--<#assign void = journal_article_service.updateArticle(-->
		<#--article.getGroupId(), article.getFolderId(), article.getArticleId(), article.getVersion(), article.getTitleMap(), article.getDescriptionMap(),-->
		<#--document.formattedString("  "), article.getType(), article.getStructureId(), article.getTemplateId(), article.getLayoutUuid(),-->
		<#--date_helper(articleDisplayDate, "MM"), date_helper(articleDisplayDate, "dd"), date_helper(articleDisplayDate, "yyyy"), date_helper(articleDisplayDate, "HH"), date_helper(articleDisplayDate, "mm"),-->
		<#--date_helper(articleExpirationDate, "MM"), date_helper(articleExpirationDate, "dd"), date_helper(articleExpirationDate, "yyyy"), date_helper(articleExpirationDate, "HH"), date_helper(articleExpirationDate, "mm"), neverExpire,-->
		<#--date_helper(articleReviewDate, "MM"), date_helper(articleReviewDate, "dd"), date_helper(articleReviewDate, "yyyy"), date_helper(articleReviewDate, "HH"), date_helper(articleReviewDate, "mm"), neverReview,-->
		<#--article.getIndexable(), article.isSmallImage(), article.getSmallImageURL(), null, null, null,-->
		<#--service_context)-->
	<#--/>-->
</#if>
