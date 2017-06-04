'use strict';

//let env = "dev";
let env = "prod";


let DealerTrack = (function() {
	let _data = [],
		something = null;

	let capture = () => {
		let frame = (env == "prod") ? iFrm.contentDocument.getElementsByTagName("frame")[1] : null;
        let doc = (env == "prod") ? frame.contentDocument : document;
        let first_name = doc.getElementById("app_first_name").value;
        let last_name = doc.getElementById("app_last_name").value;
        let location = 4301;
        let status = 4042;
        let residence_stability = doc.getElementById("app_ownership_type").value;
        let residence_time = {
            year: doc.getElementById("app_years_at_address").value,
            month: doc.getElementById("app_months_at_address").value
        };
        let prev_residence_time = {
            year: doc.getElementById("app_prv_years_at_address").value || 0,
            month: doc.getElementById("app_prv_months_at_address").value || 0
        }
        let time_in_area = 2017 - parseInt(doc.getElementById("app_birth_year").value);
        let job_stability = {
            year: doc.getElementById("app_years_employed").value,
            month: doc.getElementById("app_months_employed").value
        };
        let prev_job_stability = {
            year: doc.getElementById("app_prv_years_employed").value || 0,
            month: doc.getElementById("app_months_employed").value || 0
        };
        let type_of_employeement = (doc.getElementById("app_salary").value || 0) + (doc.getElementById("app_other_income").value || 0);
        let lagniappe = "neutral";

		let credit_score = (parseInt(doc.getElementsByName('a_exp_score')[0].value) + parseInt(doc.getElementsByName('a_equ_score')[0].value)) / 2;
        
        let result = {
            first_name,
            last_name,
            location,
            status,
            residence_stability,
            residence_time,
            prev_residence_time,
            time_in_area,
            job_stability,
            prev_job_stability,
            type_of_employeement,
            lagniappe,
			credit_score
        };

        return result;
	}

    let fill = () => {
        //
    }

	let init = () => {
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			switch(request.from) {
				case "popup":
					if (request.action == "capture") {
						sendResponse({data: capture()});
					} else if (request.action == "fill") {
                        sendResponse({data: fill()});
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