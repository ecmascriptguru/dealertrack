let Popup = (function() {
	let _host = JSON.parse(localStorage._host || "null"),
		_btnPaste = $("#paste"),
		_btnCopy = $("#copy"),
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

		_btnCopy.click(() => {
			chrome.tabs.sendMessage(_activeTabId, {
				from: "popup",
				action: "capture"
			}, (response) => {
				// console.log(response.data);
				localStorage._data = JSON.stringify(response.data);
				_btnCopy.removeClass("btn-primary").addClass("btn-success").text("Copied!");
				let tempTimer = setTimeout(() => {
					_btnCopy.removeClass("btn-success").addClass("btn-primary").text("Copy");
					clearTimeout(tempTimer);
				}, 5000);
			});
		});
		
		_btnPaste.click(() => {
			if (!JSON.parse(localStorage._data || "null")) {
				alert("You captured nothing.");
				return false;
			} else {
				chrome.tabs.sendMessage(_activeTabId, {
					from: "popup",
					action: "fill",
					data: JSON.parse(localStorage._data || "{}")
				}, (response) => {
					// console.log(response);
					_btnPaste.removeClass("btn-primary").addClass("btn-success").text("Filled out!");
					let tempTimer = setTimeout(() => {
						_btnPaste.removeClass("btn-success").addClass("btn-primary").text("Paste");
						clearTimeout(tempTimer);
					}, 5000);
				});
			}
		})
	};

	return {
		init: init
	}
})();

(function(window, jQuery) {
	Popup.init();
})(window, $);