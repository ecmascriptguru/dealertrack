'use strict';

let env = "dev";
// let env = "prod";

let AutoZoom = (function() {
	let _data = [],
        residence_stability_indice = {
            "O": 4,
            "R": 3,
            "P": 1,
            "X": 0
        },
        timer = null,
		something = null;

    let selectCategories = (data) => {
        //  4. Residence Stability = Housing Status on 1st website
        $(".category-row").eq(0).find(".category-range-selector span").eq(residence_stability_indice[data.residence_stability]).click();

        //  5. Residence Time = Time at Address on 1st website
        let resMonths = parseInt(data.residence_time.year) * 12 + parseInt(data.residence_time.month);
        let resIndex = null;
        if (resMonths < 7) {
            resIndex = 0;
        } else if (resMonths < 13) {
            resIndex = 1;
        } else if (resMonths < 36) {
            resIndex = 2;
        } else if (resMonths < 61) {
            resIndex = 3
        } else {
            resIndex = 4;
        }
        $(".category-row").eq(1).find(".category-range-selector span").eq(resIndex).click();

        //  6. Number on Residence changes last 3 years
        let resChangesIndex = (resMonths > 36) ? 4 : 3;
        $(".category-row").eq(2).find(".category-range-selector span").eq(resChangesIndex).click();

        //  7. Time in area
        let timeInAreaIndex = null;
        let yearsInArea = data.time_in_area;
        if (yearsInArea < 2) {
            timeInAreaIndex = 0;
        } else if (yearsInArea < 4) {
            timeInAreaIndex = 1;
        } else if (yearsInArea < 23) {
            timeInAreaIndex = 2;
        } else if (yearsInArea < 45) {
            timeInAreaIndex = 3;
        } else {
            timeInAreaIndex = 4;
        }
        $(".category-row").eq(3).find(".category-range-selector span").eq(timeInAreaIndex).click();

        //  8. Job Stability = Time Employed on 1st website
        let jobMonths = parseInt(data.job_stability.year) * 12 + parseInt(data.job_stability.month);
        let jobStabIndex = null;
        if (jobMonths < 7) {
            jobStabIndex = 0;
        } else if (jobMonths < 13) {
            jobStabIndex = 1;
        } else if (jobMonths < 36) {
            jobStabIndex = 2;
        } else if (jobMonths < 61) {
            jobStabIndex = 3;
        } else {
            jobStabIndex = 4;
        }
        $(".category-row").eq(4).find(".category-range-selector span").eq(jobStabIndex).click();

        //  9. Number of job changes last 2 years
        let jobChangesIndex = (jobMonths > 24) ? 4 : 3;
        $(".category-row").eq(5).find(".category-range-selector span").eq(jobChangesIndex).click();

        //  10. Type of employment = Skilled Hourly
        let salary = parseInt(data.type_of_employeement);
        let empTypeIndex = null;
        if (salary < 1301) {
            empTypeIndex = 0;
        } else if (salary < 2501) {
            empTypeIndex = 1;
        } else {
            empTypeIndex = 2;
        }
        $(".category-row").eq(6).find(".category-range-selector span").eq(empTypeIndex).click();

        //  Salary view
        let salaryIndex = 0;
        if (salary < 1350) {
            salaryIndex = 0;
        } else if (salary < 1750) {
            salaryIndex = 1;
        } else if (salary < 2250) {
            salaryIndex = 2;
        } else if (salary < 3551) {
            salaryIndex = 3;
        } else {
            salaryIndex = 4;
        }
        $(".category-row").eq(7).find(".category-range-selector span").eq(salaryIndex).click();

        //  11. Skip #9 to #12 on second website

        //  12. Credit Score
        let creditScore = data.credit_score;
        let creditScoreIndex = null;
        if (creditScore < 476) {
            creditScoreIndex = 0;
        } else if (creditScore < 526) {
            creditScoreIndex = 1;
        } else if (creditScore < 601) {
            creditScoreIndex = 2;
        } else if (creditScore < 651) {
            creditScoreIndex = 3;
        } else {
            creditScoreIndex = 4;
        }
        $(".category-row").eq(11).find(".category-range-selector span").eq(creditScoreIndex).click();
        
        //  12. Lagniape = Neutral
        $(".category-row").eq(12).find(".category-range-selector span").eq(2).click();

        //  13. Others
        $(".category-row").eq(13).find(".category-range-selector span").eq(2).click();
        $(".category-row").eq(14).find(".category-range-selector span").eq(4).click();
        $(".category-row").eq(15).find(".category-range-selector span").eq(0).click();
        $(".category-row").eq(16).find(".category-range-selector span").eq(0).click();
        $(".category-row").eq(17).find(".category-range-selector span").eq(2).click();
    }

	let fill = (data) => {
        //  1. Copy / Paste First & Last Name
		$("form input").eq(0).val(data.first_name);
        $("form input").eq(2).val(data.last_name);

        //  2. Location - Lot 2 Rochester
        $("form select").eq(1).val(data.location).change();

        //  3. Status: Application
        $("form select").eq(4).val(data.status).change();

        timer = setInterval(() => {
            if ( $(".category-row").length > 0 &&  $(".category-row").eq(17).find(".category-range-selector span").length > 0) {
                clearInterval(timer);
                selectCategories(data);
            }
        }, 1000);
	}

	let init = () => {
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			switch(request.from) {
				case "popup":
					if (request.action == "fill") {
						fill(request.data);
                        sendResponse({status: true});
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