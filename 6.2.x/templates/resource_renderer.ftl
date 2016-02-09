<#assign dl_file_entry_local_service_util = staticUtil["com.liferay.portlet.documentlibrary.service.DLFileEntryLocalServiceUtil"]>
<#assign dl_file_util = staticUtil["com.liferay.portlet.documentlibrary.util.DLUtil"]>
<#assign journal_article_local_service_util = staticUtil["com.liferay.portlet.journal.service.JournalArticleLocalServiceUtil"] />
<#assign journal_content_util = staticUtil["com.liferay.portlet.journalcontent.util.JournalContentUtil"] />

<#assign service_context = objectUtil("com.liferay.portal.service.ServiceContextThreadLocal").getServiceContext() />
<#assign http_servlet_request = service_context.getRequest() />

<#assign folder_id = paramUtil.getLong(http_servlet_request, "folderId") />
<#assign resource_id = paramUtil.getLong(http_servlet_request, "resourceId") />
<#assign title = paramUtil.getString(http_servlet_request, "title") />

<#assign hubspot_form_article_id = "691288" />

<a href="/resources">< Back</a>

<div class="resource-display">
	<#if dl_file_entry_local_service_util.fetchFileEntry(groupId, folder_id, title)??>
		<#assign dl_file_entry = dl_file_entry_local_service_util.fetchFileEntry(groupId, folder_id, title) />
	<#elseif dl_file_entry_local_service_util.fetchDLFileEntry(resource_id)??>
		<#assign dl_file_entry = dl_file_entry_local_service_util.fetchDLFileEntry(resource_id) />
	</#if>

	<#if journal_article_local_service_util.fetchArticleByUrlTitle(groupId, title)??>
		<#assign article = journal_article_local_service_util.fetchArticleByUrlTitle(groupId, title) />
	<#elseif journal_article_local_service_util.fetchArticle(groupId, resource_id?string)??>
		<#assign article = journal_article_local_service_util.fetchArticle(groupId, resource_id?string) />
	</#if>

	<#if article??>
		<div class="block-container">
		${journal_content_util.getContent(groupId, article.getArticleId()?string, "", locale, xmlRequest)}
		</div>
	<#elseif dl_file_entry??>
	<#-- <#assign dl_file_entry_url = dl_file_util.getImagePreviewURL(dl_file_entry, http_servlet_request.getAttribute("LIFERAY_SHARED_THEME_DISPLAY")) /> -->
	<#-- <#assign dl_file_entry_url = "/html/themes/control_panel/images/file_system/large/pdf.png" /> -->
		<#assign dl_file_entry_url = "/documents/" + groupId + "/" + dl_file_entry.getFolderId() + "/" + dl_file_entry.getTitle() />

		<div class="align-center block-container justify-center large-padding max-lg">
			<div class="block left-block text-center title-image w30">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 145 188">
					<style type="text/css">
						.st0{fill:#1B3A6A;}
						.st1{fill:#124680;}
						.st2{fill:#1B75BC;}
						.st3{fill:#04B7B8;}
						.st4{fill:none;stroke:#E3E4E5;stroke-miterlimit:10;}
						.st5{fill:none;}
						.st6{fill:#3E7EC0;}
						.st7{font-family:'MyriadPro-Light';}
						.st8{font-size:15px;}
						.st9{fill:#231F20;}
						.st10{fill:#929497;}
						.st11{fill:#FFFFFF;}
						.st12{fill:#051E3C;}
						.st13{fill:#1D396B;}
						.st14{fill:#79B3E1;}
					</style>
					<path class="st0" d="M144,118l-69,69h66.1c1.6,0,2.9-1.3,2.9-2.9V118z"/>
					<polygon class="st1" points="75,187 135.3,187 105.1,156.9 "/>
					<path class="st2" d="M83,1l61,61V4c0-1.7-1.3-3-3-3H83z"/>
					<polygon class="st3" points="144,62 144,25.1 125.5,43.5 "/>
					<path class="st4" d="M141.5,187.5H3.5c-1.6,0-3-1.4-3-3V3.5c0-1.6,1.4-3,3-3h138c1.6,0,3,1.4,3,3v181
							C144.5,186.1,143.1,187.5,141.5,187.5z"/>
					<rect x="15" y="72.1" class="st5" width="115" height="75.9"/>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#liferayLogo" width="120" x="15"></use>
				</svg>
			</div>

			<div class="block right-block w70">
				<h1 class="title">${dl_file_entry.getTitle()}</h1>
				<p class="description">${dl_file_entry.getDescription()}</p>

				<#--<#assign embed_asset_id = dl_file_entry.getFileEntryId() />-->

				${journal_content_util.getContent(groupId, hubspot_form_article_id, "", locale, xmlRequest)!}
			</div>
		</div>
	<#else>
		Thank you for playing. Unfortunately you have chosen poorly and this marks then end of your "Choose Your Own Adventure" journey.
	</#if>
</div>
