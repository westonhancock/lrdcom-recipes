var init = (
	function() {

		// init application state
		core.changeState('navigation', 'block');


		var ajax = new XMLHttpRequest();
		ajax.open('GET',
			'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=cb8584d4-f2e9-4b2f-bd5d-1ca9a032bcc2');
		ajax.send();
		ajax.onreadystatechange = function() {
			 if (ajax.readyState === 4) {
			    if (ajax.status === 200) 
			      console.log(ajax.responseText); // 'This is the returned text.'
			    } else {
			      console.log('Error: ' + ajax.status); // An error occurred during the request.
			    }
			  }
		}
)(core);