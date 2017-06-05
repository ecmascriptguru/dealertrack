'use strict';

let env = "dev";
// let env = "prod";


let DealerTrack = (function() {
	let _data = [],
		something = null;

	let capture = () => {
		let frame = (env == "prod") ? iFrm.contentDocument.getElementsByTagName("frame")[1] : null;
        let doc = (env == "prod") ? frame.contentDocument : document;
        
        let $inputs = doc.getElementsByTagName("input");
        let inputs = [];
        let $selects = doc.getElementsByTagName("select");
        let selects = [];

        for (let i = 0; i < $inputs.length; i ++) {
            inputs.push({
                id: $inputs[i].getAttribute("id"),
                value: $inputs[i].value
            });
        }

        for (let i = 0; i < $selects.length; i ++) {
            selects.push({
                id: $selects[i].getAttribute("id"),
                value: $selects[i].value//selectedIndex
            });
        }
        
        let result = {
            inputs,
            selects
        };

        return result;
	}

    let fill = (data) => {
        let inputs = data.inputs,
            selects = data.selects;
        
        let frame = (env == "prod") ? iFrm.contentDocument.getElementsByTagName("frame")[1] : null;
        let doc = (env == "prod") ? frame.contentDocument : document;

        for (let i = 0; i < inputs.length; i ++) {
            let curEl = doc.getElementById(inputs[i].id);

            if (curEl) {
                curEl.value = inputs[i].value;
            }
        }

        for (let i = 0; i < selects.length; i ++) {
            let curEl = doc.getElementById(selects[i].id);

            if (selects[i].id == "app_employed") {
                console.log("Here");
            }

            if (curEl) {
                curEl.value = selects[i].value;
            }
        }

        return {
            status: true
        }
    }

	let init = () => {
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			switch(request.from) {
				case "popup":
					if (request.action == "capture") {
						sendResponse({data: capture()});
					} else if (request.action == "fill") {
                        sendResponse({data: fill(request.data)});
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