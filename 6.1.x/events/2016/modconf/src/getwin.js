console.log("adding getwin");

AUI.getWin = function() { return window; };
YUI.getWin = AUI.getWin;
Liferay.AUI.getWin = AUI.getWin;
console.log("getting window: " + AUI.getWin());


AUI().use("node",  function(b) {
    b.getWin = function() {return b.one(window); };
});