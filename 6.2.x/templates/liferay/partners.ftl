<button class="reset">reset</button>
<button class="unfiltered">unfiltered</button>
<button class="someResults">someResults</button>
<button class="noResults">noResults</button>

<div class="" id="partnersDisplay">

	<div class="global-container stacked">
		<article class="global">
	        <a class="block-container align-center justify-center no-padding">
	        	<h2>[Logo]</h2>
	        	<p>Global</p>	
	        </a>
	    </article>
	    <article class="global">
	        <a class="block-container align-center justify-center no-padding">
	        	<h2>[Logo]</h2>
	        	<p>Global</p>	
	        </a>
	    </article>
	    <article class="global">
	        <a class="block-container align-center justify-center no-padding">
	        	<h2>[Logo]</h2>
	        	<p>Global</p>	
	        </a>
	    </article>
	    <article class="global">
	        <a class="block-container align-center justify-center no-padding">
	        	<h2>[Logo]</h2>
	        	<p>Global</p>	
	        </a>
	    </article>
	    <article class="global">
	        <a class="block-container align-center justify-center no-padding">
	        	<h2>[Logo]</h2>
	        	<p>Global</p>	
	        </a>
	    </article>
	    <article class="global">
	        <a class="block-container align-center justify-center no-padding">
	        	<h2>[Logo]</h2>
	        	<p>Global</p>	
	        </a>
	    </article>
	</div>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <article class="local">
        <a class="align-center block-container justify-center no-padding">
	        <h2>[Logo]</h2>
	        <h3>Partner Level</h3>
	        <p>Location</p>
        </a>
    </article>

    <div class="align-center block-container justify-center results-message text-center w100">
    	<h3>No local results</h3>
    </div>

</div>

<style>
	#partnersDisplay.wrap {
		display: flex;
		flex-wrap: wrap;
	}

	#partnersDisplay .results-message {
		display: none;
	}

	#partnersDisplay article {
	    width: 220px;
	    height: 200px;
	    border: 1px solid #e3e4e5;
	    margin: .5em;
	    position: relative;
	}

	#partnersDisplay article:hover {
		border: 1px solid #1C75B9;
		cursor: pointer;
	}

	#partnersDisplay article a {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
	}

	#partnersDisplay article.global {
		background: #F1F1F2;
	}

	#partnersDisplay .global-container.stacked {
		width: 230px;
	}

	#partnersDisplay .global-container.stacked article.global {
		background: #F1F1F2;
		float: left;
	}

	#partnersDisplay .global-container.wrapped {
		display: flex;
		flex-wrap: wrap;
	}

	#partnersDisplay .global-container.wrapped article.global {
		float: none;
	}

	#partnersDisplay article.local {
		display: inline-block;
		vertical-align:top;
	}

	#partnersDisplay .local-container {
		display: flex;
		flex-wrap: wrap;
	}

	#partnersDisplay .local-container article.local {
		display: block;
	}
</style>

<script>
	AUI().use('event', function (A) {
		var outerHTML = function(node){
			return node.outerHTML || new XMLSerializer().serializeToString(node);
		}

		var wrapAll = function(wrapper, elems) {
			var el = elems.length ? elems[0] : elems;
		    var parent  = el.parentNode;
		    var sibling = el.nextSibling;

		    wrapper.appendChild(el);

		    for (var x = 1; x < elems.length; x++) {
		    	wrapper.appendChild(elems[x]);
		    }
		    
		    parent.insertAdjacentHTML('afterbegin', outerHTML(wrapper));
		}

		var unwrap = function(elems) {
		    elems = 'length' in elems ? elems : [elems];
		    for (var i = 0; i < elems.length; i++) {
		        var elem = elems[i];
		        var parent = elem.parentNode;
		        var grandparent = parent.parentNode;

		        if (parent.id !== "partnersDisplay") {
		        	grandparent.insertBefore(elem, parent);

			        if (parent.children.length === 0) 
			            grandparent.removeChild(parent);
		        }
		    }
		}

		var resetButton = A.one('button.reset');
		var unfilteredButton = A.one('button.unfiltered');
		var someResultsButton = A.one('button.someResults');
		var noResultsButton = A.one('button.noResults');

		resetButton.on("click", function() {
			changeView.reset();
		})

		unfilteredButton.on("click", function() {
			changeView.unfiltered();
		})

		someResultsButton.on("click", function() {
			changeView.someResults();
		})

		noResultsButton.on("click", function() {
			changeView.noResults();
		})

		var changeView = {
			reset: function() {
				var globalArticles = document.getElementsByClassName('global');
				var localArticles = document.getElementsByClassName('local');
				var partnersDisplay = document.querySelector("#partnersDisplay");
				
				// 1. remove all wrappers
				unwrap(globalArticles);	
				
				if (localArticles) {
					unwrap(localArticles);	
				}

				// 2. remove classes from parent container
				partnersDisplay.className = "";

				// 3. reset order of elements
				this.changeOrder("reset");

				// 4. hide results message
				this.toggleResultsMessage("hide");
			},
			unfiltered: function() {
				this.reset();
				this.addWrapperTo('global', 'stacked');
			},
			someResults: function() {
				this.reset();
				this.changeOrder("flip");
				partnersDisplay.className = "wrap";
			},
			noResults: function() {
				this.reset();

				if (document.querySelector('.local')) {
					this.addWrapperTo("local");
				}
				
				this.addWrapperTo("global", "wrapped");
				this.toggleResultsMessage("show");
			},
			addWrapperTo: function(elems, orientation) {
				if (elems) {
					orientation = orientation ? orientation : ""
					var currentElems = document.querySelectorAll('.' + elems);
					var container = document.createElement('div');

					container.className = elems + "-container " + orientation;
					wrapAll(container, currentElems);
				}
			},
			changeOrder: function(order) {
				var partnersDisplay = document.querySelector("#partnersDisplay");
				var localArticles = document.querySelectorAll('.local');
				var globalArticles = document.querySelectorAll('.global');

				if (order === "flip") {
					for (var f = 0; f < globalArticles.length; f++) {
						partnersDisplay.appendChild(globalArticles[f]);	
					}
				} else {
					for (var r = 0; r < localArticles.length; r++) {
						partnersDisplay.appendChild(localArticles[r]);	
					}
				}	
			},
			toggleResultsMessage: function(toggle) {
				var resultsMessage = document.querySelector(".results-message");

				if (toggle === "show") {
					resultsMessage.style.display = "block";
				} else {
					resultsMessage.style.display = "none";
				}
			}
		}
	});
</script>