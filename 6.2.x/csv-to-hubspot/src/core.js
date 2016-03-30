var core = (
	function() {

		// renders HTML onto a template
		var templateRender = function(parentClass, view) {
			var container = document.querySelector('.' + parentClass);

			container.insertAdjacentHTML('beforeend', view);
		};

		// our application observer
		var publisher = {
			fire: function(type, publication) {
				this.visitSubscribers('publish', type, publication);
			},
			on: function(type, fn, context) {
				fn = typeof fn === 'function' ? fn : context[fn];
				type = type || 'any';

				if (typeof this.subscribers[type] === 'undefined') {
					this.subscribers[type] = [];
				}

				this.subscribers[type].push(
					{
						context: context || this,
						fn: fn
					}
				);
			},
			remove: function(type, fn, context) {
				this.visitSubscribers('unsubscribe', type, fn, context);
			},
			subscribers: {
				any: []
			},
			visitSubscribers: function(action, type, arg, context) {
				var pubtype = type || 'any';
				var subscribers = this.subscribers[pubtype];

				var max = subscribers ? subscribers.length : 0;

				for (var i = 0; i < max; i += 1) {
					if (action === 'publish') {
						// Call our observers, passing along arguments
						subscribers[i].fn.call(subscribers[i].context, arg);
					}
					else if (subscribers[i].fn === arg && subscribers[i].context === context) {
						subscribers.splice(i, 1);
					}
				}
			}
		};

		// use this to change state of application
		var changeState = function(stateName, state) {
			data['state'][stateName] = state;
			publisher.fire('stateChange', state);
		};

		// internally registering handling of
		publisher.on('stateChange', ui.changeNavigationState);

		return {
			// other modules
			config: config,
			data: data,
			ui: ui,

			// utility functions
			changeState: changeState,
			publisher: publisher,
			templateRender: templateRender
		};

	}
)(data, config, ui);