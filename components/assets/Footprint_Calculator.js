class Footprint_Calculator {
    
    constructor(list) {
        this.max_transportation = 55;
        this.max_waste = 110;
        this.max_utility = 30;
        this.answers = list;
        this.tiers = {};

        // calculate scores for each category
        this.transportation_score = 0;
        this.waste_score = 0;
        this.utility_score = 0;
        // this.car_transportation(list[0]);
        // this.public_transportation(list[1]);
        // this.flight_transportation(list[2]);
        // calculate_waste(list.slice(3,9));
        // calculate_utility(list.slice(9,12));

        // calculate results
        this.total_score = this.transportation_score + this.waste_score + this.utility_score;
        this.max_total = max_transportation + max_waste + max_utility;
        this.tiers = tier(tiers);
    }

    // Personal/public/flights and miles per year
    car_transportation(car) {
        // miles of car usage per year
        if (car > 15000) {
            this.transportation_score += 15;
        }
        else if (car > 10000) {
            this.transportation_score += 10;
        }
        else if (car > 1000) {
            this.transportation_score += 6;
        }
        else if (car > 0) {
            this.transportation_score += 4;
        }
    }

    public_transportation(buses) {
        // miles of public transportation usage per year
        if (buses > 20000) {
            this.transportation_score += 20;
        }
        else if (buses > 15000) {
            this.transportation_score += 10;
        }
        else if (buses > 10000) {
            this.transportation_score += 6;
        }
        else if (buses > 1000) {
            this.transportation_score += 4;
        }
        else if (buses > 0) {
            this.transportation_score += 2;
        }
    }

    flight_transportation(flight) {
        // flight distance per year
        if (flight == 0) {
            this.transportation_score += 2;
        }
        else if (flight == 1) {
            this.transportation_score += 6;
        }
        else if (flight == 2) {
            this.transportation_score += 20;
        }
    }

    get transportation() {
        return '%.2f'%(this.transportation_score / this.max_transportation);
    }

    //Eating meat, household purchases, trash cans per week, types of waste recycled
    calculate_waste(list) {    
        // Meat per week
        if (list[0] == 7) {
            this.waste_score += 10;
        }
        else if (list[0] > 2) {
            this.waste_score += 8;
        }
        else if (list[0] > 0) {
            this.waste_score += 5;
        }
    
        // Vegan y/n
        if (list[1] == 1) {
            this.waste_score += 2;
        }
        else if (list[1] == 0 && list[0] == 0) {
            this.waste_score += 4;
        }
    
        // Diet type (prepackaged, fresh, mix)
        if (list[2] == 0) {
            this.waste_score += 12;
        }
        else if (list[2] == 1) {
            this.waste_score += 6;
        }
        else if (list[2] == 2) {
            this.waste_score += 2;
        }
    
        // Household purchases per year
        if (list[3] > 7) {
            this.waste_score += 10;
        }
        else if (list[3] > 5) {
            this.waste_score += 8;
        }
        else if (list[3] > 3) {
            this.waste_score += 6;
        }
        else if (list[3] > 0) {
            this.waste_score += 4;
        }
        else {
            this.waste_score += 2;
        }
    
        // Trash cans filled per week
        if (list[4] >= 4) {
            this.waste_score += 50;
        }
        else if (list[4] == 3) {
            this.waste_score += 40;
        }
        else if (list[4] == 2) {
            this.waste_score += 30;
        }
        else if (list[4] == 1) {
            this.waste_score += 20;
        }
        else {
            this.waste_score += 5;
        }
    
        // Types of waste recycled:
        this.waste_score += 24;
        this.waste_score -= 4 * list[5];
    }
    
    get waste() {
        return '%.2f'%(float(this.waste_score) / this.max_waste * 100);
    }
    
    // People in household, house size, water (dishwasher/laundry)
    calculate_utility(list) {
        // People in household
        if (list[0] > 5) {
            this.utility_score += 2;
        }
        else if (list[0] == 5) {
            this.utility_score += 4;
        }
        else if (list[0] == 4) {
            this.utility_score += 6;
        }
        else if (list[0] == 3) {
            this.utility_score += 8;
        }
        else if (list[0] == 2) {
            this.utility_score += 10;
        }
        else if (list[0] == 1) {
            this.utility_score += 12;
        }
        else {
            this.utility_score += 14;
        }
    
        // House size
        if (list[1] == 0) {
            this.utility_score += 10;
        }
        else if (list[1] == 1) {
            this.utility_score += 7;
        }
        else if (list[2] == 2) {
            this.utility_score += 4;
        }
        else {
            this.utility_score += 2;
        }
    
        // Water usage per week
        if (list[2] > 18) {
            this.utility_score += 6;
        }
        else if (list[2] > 8) {
            this.utility_score += 4;
        }
        else if (list[2] >= 1) {
            this.utility_score += 1;
        }
    }
    
    get utility() {
        return '%.2f'%(float(this.utility_score) / this.max_utility * 100);
    }

    get total() {
        return '%.2f'%(float(this.total_score) / this.max_total * 100);
    }
    
    tier(dict) {
        var percent = get_transportation();
        dict = tier_res(dict, percent, "transportation");
        percent = self.get_waste();
        dict = tier_res(dict, percent, "waste");
        percent = self.get_utility();
        dict = tier_res(dict, percent, "utility");
        return dict;
    }
    
    tier_res(dict, percentage, category) {
        if (percent > 75) {
            dict[category] = ["poor"];
        }
        else if (percent > 50) {
            dict[category] = ["average"];
        }
        else if (percent > 25) {
            dict[category] = ["good"];
        }
        else if (percent >= 0) {
            dict[category] = ["excellent"];
        }
        return dict;
    }


    // Completing a goal: subtract points?
    goal_update(task) {
        if (task.status) {
            if (task.category.equals("Transportation")) {
                this.transportation_score -= 4;
            }
            else if (task.category.equals("Utilities")) {
                this.utility_score -= 2;
            }
            else if (task.category.equals("Consumption/Waste")) {
                this.waste_score -= 8;
            }
            else {
                this.transportation_score -= 1;
                this.utility_score -= 1;
                this.waste_score -= 1;
            }
            if (this.transportation_score < 0) {
                this.transportation_score = 0;
            }
            if (this.utility_score < 0) {
                this.utility_score = 0;
            }
            if (this.waste_score < 0) {
                this.waste_score = 0;
            }
        }
        tier(tiers);
        return [total_score, this.transportation, this.waste, this.utility];
    }
}