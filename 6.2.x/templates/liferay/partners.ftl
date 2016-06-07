<button class="unfiltered">unfiltered</button>
<button class="someResults">someResults</button>
<button class="noResults">noResults</button>

<div class="" id="partnersDisplay">
	 <div class="align-center block-container justify-center section-padding results-message w100">
    	<h3>No local partners are available in your area at the moment, but our global services partners provide excellent service to Liferay customers all around the world.</h3>
    </div>

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

</div>

<style>
	.wrapped {
		display: flex;
		flex-wrap: wrap;
	}

	.wrapped article {
		flex-basis: 230px;
		flex-grow: 1;
		max-width: 23%;
	}

	#partnersDisplay .results-message {
		display: none;
	}

	#partnersDisplay article {
	    border: 1px solid #e3e4e5;
	    height: 200px;
	    margin: .5em;
	    position: relative;
	    width: 23%;
	}

	#partnersDisplay article:hover {
		border: 1px solid #1C75B9;
		cursor: pointer;
	}

	#partnersDisplay article a {
		align-items: center;
		color: inherit;
		display: flex;
		flex-direction: column;
		height: 100%;
		position: absolute;
		text-decoration: none;
		width: 100%;
	}

	#partnersDisplay article.global {
		background: #F1F1F2;
	}

	#partnersDisplay .global-container.stacked {
		width: 23%;
	}

	#partnersDisplay .global-container.stacked article.global {
		background: #F1F1F2;
		width: 100%;
		float: left;
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

	@media (max-width: 968px) {
		.wrapped article {
			max-width: 33%;
		}

		#partnersDisplay article {
			width: 30%;
		}

		#partnersDisplay .global-container.stacked {
			width: 30%;
		}
	}

	@media (max-width: 768px) {
		.wrapped article {
			max-width: 50%;
		}

		#partnersDisplay article {
			width: 46%;
		}

		#partnersDisplay .global-container.stacked {
			width: 46%;
		}
	}

	@media (max-width: 500px) {
		.wrapped article {
			max-width: 100%;
		}

		#partnersDisplay article {
			width: 100%;
		}

		#partnersDisplay .global-container.stacked {
			width: 100%;
		}
	}
</style>

<script>
	AUI().use('event', function (A) {

		var DOMUtils = (function() {
			var outerHTML = function(node){
				return node.outerHTML || new XMLSerializer().serializeToString(node);
			};

			var wrapAll = function(wrapper, elems) {
				var el = elems.length ? elems[0] : elems;
			    var parent  = el.parentNode;
			    var sibling = el.nextSibling;

			    wrapper.appendChild(el);

			    for (var x = 1; x < elems.length; x++) {
			    	wrapper.appendChild(elems[x]);
			    }
			    
			    parent.insertAdjacentHTML('afterbegin', outerHTML(wrapper));
			};

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
		
			var addWrapperTo = function(elems, orientation) {
				if (elems) {
					orientation = orientation ? orientation : ""
					var currentElems = document.querySelectorAll('.' + elems);
					var container = document.createElement('div');

					container.className = elems + "-container " + orientation;
					wrapAll(container, currentElems);
				}
			};

			var changeOrder = function(order) {
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
			};

			var toggleResultsMessage = function(toggle) {
				var partnersDisplay = document.querySelector("#partnersDisplay");
				var resultsMessage = document.querySelector(".results-message");

				if (toggle === "show") {
					resultsMessage.style.display = "block";
				} else {
					resultsMessage.style.display = "none";
				}

				partnersDisplay.insertBefore(resultsMessage, partnersDisplay.childNodes[0]);
			};

			var toggleLocal = function(mode) {
				var locals = document.querySelectorAll('.local');

				if (mode === "hide") {
					for (var l = 0; l < locals.length; l++) {
						locals[l].style.display = "none";
					}
				} else {
					for (var l = 0; l < locals.length; l++) {
						locals[l].style.display = "inline-block";
					}
				}				
			}

			var reset = function() {
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
				changeOrder("reset");

				// 4. hide results message
				toggleResultsMessage("hide");

				// 5. show local results
				toggleLocal("show");
			};

			return {
				reset: reset,
				toggleResultsMessage: toggleResultsMessage,
				changeOrder: changeOrder,
				toggleLocal: toggleLocal,
				addWrapperTo: addWrapperTo
			}
		})();

		var changeView = {
			unfiltered: function() {
				DOMUtils.reset();
				DOMUtils.addWrapperTo('global', 'stacked');
			},
			someResults: function() {
				DOMUtils.reset();
				DOMUtils.changeOrder("flip");
				partnersDisplay.className = "wrapped";
			},
			noResults: function() {
				DOMUtils.reset();
				DOMUtils.addWrapperTo("global", "wrapped");
				DOMUtils.toggleResultsMessage("show");
				DOMUtils.toggleLocal("hide");
			}	
		};

		var resetButton = A.one('button.reset');
		var unfilteredButton = A.one('button.unfiltered');
		var someResultsButton = A.one('button.someResults');
		var noResultsButton = A.one('button.noResults');

		unfilteredButton.on("click", function() {
			changeView.unfiltered();
		});

		someResultsButton.on("click", function() {
			changeView.someResults();
		});

		noResultsButton.on("click", function() {
			changeView.noResults();
		});
	});
</script>