'use strict';

let Background = (function() {
	let _data = [],
		something = null;

	let init = () => {
		//
	};

	return {
		init: init
	};
})();

(function(window, jQuery) {
	Background.init();
})(window, $);

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    let url = info.url || tab.url;
    if(url && ["www.dealertrack.com"].indexOf(new URL(url).hostname) > -1) {
		url = new URL(url);
		localStorage._host = JSON.stringify(url.hostname);
		chrome.pageAction.show(tabId);
	}
    else {
		chrome.pageAction.hide(tabId);
	}
});

chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.query({}, function(tabs) {
		for (let i = 0; i < tabs.length; i ++) {
			if (["www.dealertrack.com"].indexOf(new URL(tabs[i].url).hostname) > -1) {
				chrome.tabs.reload(tabs[i].id, {bypassCache: true});
			}
		}
	})
});