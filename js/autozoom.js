'use strict';

let env = "dev";
// let env = "prod";

let AutoZoom = (function() {
	let _data = [],
		something = null;

	let fill = (data) => {
		$("form input").eq(0).val(data.first_name);
        $("form input").eq(2).val(data.last_name);
        $("form select").eq(1).val(data.location).change();
        $("form select").eq(4).val(data.status).change();
	}

	let init = () => {
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			switch(request.from) {
				case "popup":
					if (request.action == "fill") {
						fill(request.data);
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
	AutoZoom.init();
})(window, $);