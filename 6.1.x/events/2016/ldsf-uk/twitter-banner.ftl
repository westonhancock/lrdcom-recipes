<style type="text/css">
	.blue-background {
        background-color: #1277a7;
    }

    .inline {
        display: inline-block;
    }

    .twitter-container {
        background-color: #178acb;
        padding: 60px 0;
        text-align: center;
    }

    .twitter-container .info-container {
      	background-color: #60aed9;
      	box-sizing: border-box;
        color: #FFF;
        max-width: 340px;
        padding: 25px;
        vertical-align: top;
    }

    .twitter-container .info-container .event-icon {
        margin-bottom: 20px;
        max-width: 140px;
    }

    .twitter-container .info-container .ios {
     	 background: url(/documents/47511614/49384334/Apple+Hover.svg/df9ff5e4-ba62-442c-b039-5c65f9ae9b47) no-repeat;
      	background-size: 100%;
    }

    .twitter-container .info-container .android {
      	background: url(/documents/47511614/49384334/Google+Play+Hover.svg/c2d3feec-4cb0-406d-91d7-df0cc1c11397) no-repeat;
      	background-size: 100%;
    }

  	.twitter-container .info-container a {
      	display: block;
    	margin: 20px auto;
   	 	height: 47px;
		width: 160px;
  	}

    .twitter-container h3 {
		color: #FFF;
     	font-weight: lighter;
     	margin: 0;
    }

    .twitter-container .info-container span {
        font-size: 20px;
        font-weight: normal;
        margin-left: 10px;
        position: relative;
        top: 3px;
        vertical-align: top;
    }

	/* style unrendered twitter timeline with message */
	a.twitter-timeline{
	  color: #3b94d9;
	  text-decoration: none;
	  font: normal normal 27px/1.4 Helvetica,Roboto,"Segoe UI",Calibri,sans-serif;
	  font-weight: 300;
	  text-align: left;
	  background: white;
	  max-width: 520px;
	  margin: 0 30px;
	  display: inline-block;
	  border-radius: 4px;
	  padding: 10px;
	}
	a.twitter-timeline::after {
	  content: "${(twitter_error_message.data)!"Please click on the link above or disable tracking protection to see the Twitter feed.  "}";
	  padding: 20px;
	  line-height: 25px;
	  font-size: 16px;
	  color: black;
	  position: relative;
	  text-align: center;
  	  display: block;
	}
	
    .twitter-timeline.twitter-timeline-rendered {
        display: inline-block !important;
        margin: 0 30px !important;
        max-width: 520px !important;
        width: 100% !important;
    }

    @media(max-width: 600px) {
        .twitter-timeline.twitter-timeline-rendered {
            margin: 0 !important;
            width: 90% !important;
        }
    }

    @media(max-width: 920px) {
      .twitter-container .info-container {
        margin-bottom: 40px;
      }
    }
</style>

<div class="twitter-container" id="eventsapp">
	<div class="info-container inline centered">
		<img class="event-icon" src="/documents/47511614/51179014/events-mobile-app.png" />
		<h3 class="light">${(header_text.data)!"Download the Liferay Events App"}</h3>
		
		<a class="ios" href="https://itunes.apple.com/us/app/liferay-events/id650199231?mt=8">&nbsp;</a>
		<a class="android" href="https://play.google.com/store/apps/details?id=com.liferay.events.global.mobile&amp;hl=en">&nbsp;</a>
	</div>
	<a class="twitter-timeline" data-widget-id="${twitter_widget_id.data}" href="${twitter_link.data}" target="_blank">${twitter_link_text.data}</a>
</div>
<script>
YUI().use('get', function (Y) {
	Y.Get.script('https://platform.twitter.com/widgets.js');
});
</script>