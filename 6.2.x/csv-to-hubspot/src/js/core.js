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

		// allows for multiple steps and multiple tests for each step. 
		var processAndTest = function(initialData) {
			var self = this;
			this.processSets = [];
			this.data = initialData;
			this.errorMessage = undefined;
			this.pass = false;
			this.newProcess = function(options) {
				self.processSets.push({
					action: options.action,
					tests: options.tests,
					mode: options.mode,
					errorMessage: options.errorMessage
				})
			};
			this.run = function() {
				var counter = 0;
				var numOfProcess = self.processSets.length;
				var currentSet = self.processSets[counter];

				// supports async operations
				var runNextAction = function(set) {
					// if async
					if (currentSet.mode == "async") {
						currentSet.action(self.data)
							.then(function(res) {
								self.data = res;
								runTests(currentSet);
							})
					} 
					// if sync
					else {
						self.data = currentSet.action(self.data);
						runTests(currentSet);
					}
				};

				// only sync operations
				var runTests = function(data) {

					// if it fails test
					if (self.runTests(data) === false) {
						self.pass = false;
						self.onEnd();
					}
					// if current set passes test
					else {
						runItAgain();
					}
				}

				// our loop/counter
				var runItAgain = function() {
					// should we run the next one?
					if ((counter + 1) < numOfProcess) {
						counter++
						currentSet = self.processSets[counter];
						runNextAction(currentSet);
					}

					else {
						self.pass = true;
						self.onEnd()
					}
				}

				// run it for the first time.
				runNextAction(currentSet);
			};
			this.onEnd = function() {},
			this.runTests = function(set) {
				for (var i = 0; i < set.tests.length ; i++) {
					var testResult = set.tests[i](self.data);

					if (testResult !== true) {
						self.errorMessage = testResult;
						return false;
					}
				}
			};
		}

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
			processAndTest: processAndTest,
			templateRender: templateRender
		};

	}
)(data, config, ui);