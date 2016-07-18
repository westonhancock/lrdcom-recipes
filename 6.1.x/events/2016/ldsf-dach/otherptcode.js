        function gup( name, url ) {
		  if (!url) url = window.location.href;
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec( url );
		  return results == null ? null : results[1];
		}
		var session_id = gup('pt');

        if (session_id !== null) {
	        A.on(
	            'load',
	            function() {
	                copyToPopUp(A.one('#' + session_id));
	            }
	        );
        }
