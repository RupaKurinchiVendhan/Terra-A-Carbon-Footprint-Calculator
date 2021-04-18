var max_transportation = 55;
var max_waste = 110;
var max_utility = 30;
// var answers = list;
// var tiers = {};

// calculate scores for each category
var transportation_score = 0;
var waste_score = 0;
var utility_score = 0;
// var transportation_score = transportation(list.slice(0,3));
// var waste_score = waste(list.slice(3,9));
// var utility_score = utility(list.slice(9,12));

// calculate results
var total_score = transportation_score + waste_score + utility_score;
var max_total = max_transportation + max_waste + max_utility;
// tiers = tier(tiers);

// Personal/public/flights and miles per year
function car_transportation(car) {
    var transportation_score = 0;

    // miles of car usage per year
    if (car > 15000) {
        transportation_score += 15;
    }
    else if (car > 10000) {
        transportation_score += 10;
    }
    else if (car > 1000) {
        transportation_score += 6;
    }
    else if (car > 0) {
        transportation_score += 4;
    }

    return transportation_score;
}

function public_transportation(buses) {
    // miles of public transportation usage per year
    if (buses > 20000) {
        transportation_score += 20;
    }
    else if (buses > 15000) {
        transportation_score += 10;
    }
    else if (buses > 10000) {
        transportation_score += 6;
    }
    else if (buses > 1000) {
        transportation_score += 4;
    }
    else if (buses > 0) {
        transportation_score += 2;
    }
    return transportation_score;
}

function flight_transportation(flight) {
    // flight distance per year
    if (flight == 0) {
        transportation_score += 2;
    }
    else if (flight == 1) {
        transportation_score += 6;
    }
    else if (flight == 2) {
        transportation_score += 20;
    }
    return transportation_score;
}

function get_transportation() {
    return '%.2f'%(transportation_score / max_transportation);
}

// Eating meat, household purchases, trash cans per week, types of waste recycled
function waste(list) {
    var waste_score = 0;

    // Meat per week
    if (list[0] == 7) {
        waste_score += 10;
    }
    else if (list[0] > 2) {
        waste_score += 8;
    }
    else if (list[0] > 0) {
        waste_score += 5;
    }

    // Vegan y/n
    if (list[1] == 1) {
        waste_score += 2;
    }
    else if (list[1] == 0 && list[0] == 0) {
        waste_score += 4;
    }

    // Diet type (prepackaged, fresh, mix)
    if (list[2] == 0) {
        waste_score += 12;
    }
    else if (list[2] == 1) {
        waste_score += 6;
    }
    else if (list[2] == 2) {
        waste_score += 2;
    }

    // Household purchases per year
    if (list[3] > 7) {
        waste_score += 10;
    }
    else if (list[3] > 5) {
        waste_score += 8;
    }
    else if (list[3] > 3) {
        waste_score += 6;
    }
    else if (list[3] > 0) {
        waste_score += 4;
    }
    else {
        waste_score += 2;
    }

    // Trash cans filled per week
    if (list[4] >= 4) {
        waste_score += 50;
    }
    else if (list[4] == 3) {
        waste_score += 40;
    }
    else if (list[4] == 2) {
        waste_score += 30;
    }
    else if (list[4] == 1) {
        waste_score += 20;
    }
    else {
        waste_score += 5;
    }

    // Types of waste recycled:
    waste_score += 24;
    waste_score -= 4 * list[5];

    return waste_score;
}
//
// function get_waste(waste_score, max_waste) {
//     return '%.2f'%(float(waste_score) / max_waste * 100);
// }
//
// // People in household, house size, water (dishwasher/laundry)
// function utility(list) {
//     var utility_score = 0;
//
//     // People in household
//     if (list[0] > 5) {
//         utility_score += 2;
//     }
//     else if (list[0] == 5) {
//         utility_score += 4;
//     }
//     else if (list[0] == 4) {
//         utility_score += 6;
//     }
//     else if (list[0] == 3) {
//         utility_score += 8;
//     }
//     else if (list[0] == 2) {
//         utility_score += 10;
//     }
//     else if (list[0] == 1) {
//         utility_score += 12;
//     }
//     else {
//         utility_score += 14;
//     }
//
//     // House size
//     if (list[1] == 0) {
//         utility_score += 10;
//     }
//     else if (list[1] == 1) {
//         utility_score += 7;
//     }
//     else if (list[2] == 2) {
//         utility_score += 4;
//     }
//     else {
//         utility_score += 2;
//     }
//
//     // Water usage per week
//     if (list[2] > 18) {
//         utility_score += 6;
//     }
//     else if (list[2] > 8) {
//         utility_score += 4;
//     }
//     else if (list[2] >= 1) {
//         utility_score += 1;
//     }
//
//     return utility_score;
// }
//
// function get_utility(utility_score, max_utility) {
//     return '%.2f'%(float(utility_score) / max_utility * 100);
// }
//
// function tier(dict) {
//     var percent = get_transportation();
//     dict = tier_res(dict, percent, "transportation");
//     percent = self.get_waste();
//     dict = tier_res(dict, percent, "waste");
//     percent = self.get_utility();
//     dict = tier_res(dict, percent, "utility");
//     return dict;
// }
//
// function tier_res(dict, percentage, category) {
//     if (percent > 75) {
//         dict[category] = ["poor"];
//     }
//     else if (percent > 50) {
//         dict[category] = ["average"];
//     }
//     else if (percent > 25) {
//         dict[category] = ["good"];
//     }
//     else if (percent >= 0) {
//         dict[category] = ["excellent"];
//     }
//     return dict;
// }


// Completing a goal: subtract points?
// function goal_update(goal) {
// }
