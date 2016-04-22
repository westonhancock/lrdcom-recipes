<#--  --------------------------------------------    Banner code ------------------------------------------------------------------ -->

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

<#--  --------------------------------------------    basic styles ------------------------------------------------------------------ -->



p {
font-size: 1.25em;
}

a.underline {
  text-decoration: underline;
}

h3 {
    color: #414142;
}

.bigf {
    font-size: 16px;
}

.bold {
    font-weight: bold;
}

.countdown-timer.dark-red-font, .light-red-font, .countdown-values.light-red-font {
    color: #198aca;
}

.dynamic_data_list_display h1.header-title {
    display: none;
}

.footer .logo {
    margin: 0 0 15px 15%;
    width: 100%;
}

.footer .top-container .left-nav {
    float: left;
    width: 35%;
}

.inline {
    display: inline-block;
}

.letter-spacing {
	letter-spacing: 1px;
}

.lighter {
	font-weight: lighter;
}

.main-text-color {
    color: #198aca;
}

.max-full {
    margin: 0 auto;
    max-width: 690px;
}

.max-960 {
    margin: 0 auto;
    max-width: 960px;
}



.normal {
	font-weight: normal;
}

.paragraph-header {
    margin-bottom: 0;
}

.portlet-borderless-container {
    min-height: 0;
}

#main-content.full-screen-layout .aui-w50 .portlet-boundary, .portlet-nested-portlets .aui-w50 .max-960 {
	max-width: 100%;
}

.responsive .content-column .content-column-content, .responsive .content-column .portlet-column-content, .responsive .portlet-column .content-column-content, .responsive .portlet-column .portlet-column-content {
    padding: 0 !important;
}

.uppercase {
    text-transform: uppercase;
}

.social li a:hover {
        background: #198aca;
}

.text-left {
    text-align: left;
}

.white-text-color {
    color: #FFF;
}

#banner .max-full {
    max-width: 100%;
}

#earlyBirdButton {
    background: #198aca;
}

<#-- get rid of parent link... to get rid of this adjust theme -->
 #navigation .parent-title {
        display: none;
}
    

#navigation.dynamic-navigation .child-menu li {
    margin: 15px .5%;
    vertical-align: middle;
}

#navigation.dynamic-navigation .child-menu  {
    background-color: #00537d;
    float: none;
    z-index: 50;
}

#navigation.dynamic-navigation .child-menu li a {
    color: #FFF;
    font-size: 1.25em;
    font-weight: normal;
}

#navigation.dynamic-navigation .child-menu li.selected a {
    font-weight: bold;
}

@media(max-width: 780px) {
    .footer .logo {
        margin: 0;
        text-align: center;
    }

    .footer .top-container .left-nav {
        margin: 0;
        width: 50%;
    }
}


/*   firefox styles   */

.firefox .bent-border-container {
    display: none !important;
}

.firefox #earlyBirdButtonContainer, .firefox .register-button {
    max-width: 100% !important;
}
<#--  --------------------------------------------    Navigation ------------------------------------------------------------------ -->


nav#navigation.sticky {
	height: 88px;
}

nav#navigation.sticky ul{
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 16;
}

@media (min-width: 1011px) {

	#navigation.dynamic-navigation .child-menu li.selected a {
   	 	margin: 0 5px;
    	padding: 15px 10px;
	}

	#navigation.dynamic-navigation .child-menu .nav-item.last {
		background: url('/documents/47511614/51179014/register-button-bg.svg') no-repeat center;
		height: 48px;
		margin: 20px;
		text-align: center;
		width: 160px;
	}
	
	#navigation.dynamic-navigation .child-menu .nav-item.last a {
		font-weight: bold;
		padding: 10px;
		text-transform: uppercase;
	}
	
	#navigation.dynamic-navigation .child-menu .nav-item.first {
		float: left;
		margin: 19px 30px;
	}
	
	#navigation.dynamic-navigation .child-menu .nav-item.first a {
		background: url(/documents/47511614/51179014/symposium-icon.svg) no-repeat center;
		height: 48px;
		width: 48px;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
}
@media (max-width: 1010px) {

	#banner {
		margin-top: 40px;
	}
    nav#navigation {
        background: #00537D no-repeat url(/documents/14/48124953/hamburger.png) right 10px center;
        height: 40px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 15;
    }

	nav#navigation a {
		padding: 0;
	}
	
    nav.responsive-only #navigationToggle {
        background-image: url(/documents/14/48124953/hamburger.png);
        cursor: pointer;
        display: inline-block;
        height: 18px;
        position: relative;
        left: 90%;
        top: 10px;
        width: 20px;
    }

    nav.responsive-only .register-button {
        bottom: -17px;
        display: block;
        float: right;
        position: relative;
        right: 20px;
    }

    nav.responsive-only .register-button a {
        padding: 8px 25px;
    }

    #responsiveNav {
        background-color: #00537d;
        max-height: initial!important;
        position: fixed;
        top: 35px;
        width: 100%;
    }

    #navigation ul {
        list-style: none;
        margin: 0;
        max-height: 0;
        overflow: hidden;
        -ms-transition: max-height .3s ease-in-out;
        -o-transition: max-height .3s ease-in-out;
        -moz-transition: max-height .3s ease-in-out;
        -webkit-transition: max-height .3s ease-in-out;
        transition: max-height .3s ease-in-out;
        
        <#--- do we need all this -->
        margin-top: 40px;
   	 	position: fixed;
    	text-align: left;
    	width: 100%
    }

    #navigation[data-state=open] ul {
          max-height: 100%;
    }

    #navigation ul li {
    	display: block;
        padding: 10px 5%;
        font-size: 14px;
    }
}
		