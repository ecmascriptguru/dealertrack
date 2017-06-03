let Popup = (function() {
	let _host = JSON.parse(localStorage._host || "null"),
		_btnFill = $("#fill"),
		_btnCapture = $("#capture"),
		_activeTabId = null;

	let goTo = (host) => {
		$(".panel").hide();
		$("div[data-target='" + host + "']").show();
	}

	let init = () => {
		chrome.tabs.query({
			active: true
		}, (tabs) => {
			_activeTabId = tabs[0].id;
			_host = new URL(tabs[0].url).hostname;
			if (_host) {
				goTo(_host);
			}
		});

		_btnCapture.click(() => {
			chrome.tabs.sendMessage(_activeTabId, {
				from: "popup",
				action: "capture"
			});
		});
	};

	return {
		init: init
	}
})();

(function(window, jQuery) {
	Popup.init();
})(window, $);