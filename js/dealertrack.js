'use strict';
let DealerTrack = (function() {
	let _data = [],
		something = null;

	let capture = () => {
		let first_name = ($("input#app_first_name")[0] || {}).value;
		alert(first_name);
	}

	let init = () => {
		chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
			switch(request.from) {
				case "popup":
					if (request.action == "capture") {
						capture();
					}
					break;

				default:
					console.log("Unknown msg..");
					break;
			}
		});
	};
		
	return {
		init: init
	};
})();

(function(window, jQuery) {
	DealerTrack.init();
})(window, $);