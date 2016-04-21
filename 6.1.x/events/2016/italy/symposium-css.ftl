<#list banner_images.siblings as cur_image>
		<#assign cur_image_width = cur_image.banner_width.data>
		  <#if cur_image_width == "1920">
		  	<#assign desktop_image = cur_image.banner_image.data>
		  </#if>
		  <#if cur_image_width == "720">
		  	  <#assign tablet_image = cur_image.banner_image.data>
		  </#if>
		  <#if cur_image_width == "600">
		  	  <#assign mobile_image = cur_image.banner_image.data>
		  </#if>
</#list>


.♡ {
    max-height: 100%;
    max-width: 100%
}

.max-960 {
    margin: 0 auto;
    max-width: 960px
}

.no-max .max-960 {
    max-width: none
}

#article-70154558 {
    background: url('${(desktop_image)!"/documents/67510365/67521848/16FRS-Top-Image-1920x533.jpg"}') no-repeat center top;
    background-size: 1920px;
    background-color: #198aca
}

.top-banner h2 {
    background: #198aca;
    color: #FFF;
    font-size: 2.25em;
    margin: 0;
    padding: 20px 0;
    text-align: center
}

.top-banner h3 {
    color: #FFF;
    letter-spacing: 4px
}

.top-banner img {
    background-color: #000;
    background-color: rgba(0,0,0,0.6);
    margin: 360px 0 30px;
    max-width: 245px;
    width: 100%;
    padding: 24px 46px
}

.top-banner .content-column .content-column-content,top-banner .content-column .portlet-column-content,.top-banner .portlet-column .content-column-content,.top-banner .portlet-column .portlet-column-content {
    padding: 0
}

.top-banner .max-960 {
    max-width: 100%;
    text-align: center
}

@media all and (max-width: 580px) {
    #article-70154558 {
        background-image:url('${(tablet_image)!"/documents/67510365/67521848/16FRS-Top-Image-720x1024.jpg"}');
        background-size: 560px
    }

    .top-banner img {
        margin: 475px 0 0;
        max-width: 363px;
        margin-left: 6px
    }
}

@media all and (max-width: 480px) {
    #article-70154558 {
        background-image:url('${(mobile_image)!"/documents/67510365/67521848/16FRS-Top-Image-600x960.jpg"}');
        background-size: 480px
    }

    .top-banner img {
        margin: 347px 0 0;
        max-width: 229px;
        margin-left: 6px
    }
}

@media all and (max-width: 360px) {
    #article-70154558 {
        background-image:url('${(mobile_image)!"/documents/67510365/67521848/16FRS-Top-Image-600x960.jpg"}');
        background-size: 360px
    }

    .top-banner img {
        margin: 260px 0 0;
        max-width: 148px
    }
}





		