function inputData() {
    // extracting the input data from the url
    var url = location.search;                                              // get the raw url with the input data
    var initialPopulation = $.query.get('initialPopulation');               // number of whales simulated
    var percentJuveniles = $.query.get('percentualJuveniles');              // percentage of juveniles in the population
    var percentFemales = $.query.get('percentualFemales');                  // percentage of females in the population
    var numberShipsInitial = $.query.get('numberShipsInitial');             // number of ships crossing the area per year
    var numberShipsFinal = $.query.get('numberShipsExpectedFinal');         // number of ships at the end of the simulation
    var ageLifeExpectancy = $.query.get('ageLifeExpectancy');               // life expectancy
    var ageMaturationMax = $.query.get('ageMaturationMax');                 // maximum age of sexual maturarion
    var ageMaturationMin = $.query.get('ageMaturationMin');                 // minimum age of sexual maturarion
    var probBirth = $.query.get('probBirth');                               // probability for females having an offspring
    var probSurvivalAdults = $.query.get('probSurvivalAdults');             // probability of survival at each year for adults
    var probSurvivalJuveniles = $.query.get('probSurvivalJuveniles');       // probability of survival at each year for juveniles
    var timeSimulated = $.query.get('numberYearsSimulated');                // time of simulation in years
    var numberSimulation = $.query.get('numberSimulations');                // number of repetions for each simulation (default 1000)
    var strikeRateYear = $.query.get('strikeRateYear');                     // average number of removals per year
    var strikeRateShip = $.query.get('strikeRateShip');                     // average number of removals per ship (if strikeRateYear = 0)
    //var strikeType = $.query.get('strikeType');                           // average number of removals per ship (if strikeRateYear = 0)
    //var strikesGender = $.query.get('gender');                            // random (=1) females (=2) juveniles (=3)
    var whalingRateYear = $.query.get('whalingRateYear');                   // amount of animals whaled by year
    var strandingRateYear = $.query.get('strandingRateYear');               // amount of individuals found dead on the beach
    var otherRateYear = $.query.get('otherRateYear');   

    var strikeType = 'perYear';
    var strikeClass = ['male', 'female', 'juvenile'];       //random //female ['', 'female', ''] // juvenile ['', '', 'juvenile']
    var initialPopulationJuveniles = Math.round(initialPopulation*percentJuveniles/100);
    var initialPopulationFemales = Math.ceil((initialPopulation-initialPopulationJuveniles)*percentFemales/100);
    var initialPopulationMales = initialPopulation-initialPopulationJuveniles-initialPopulationFemales;
    var numberShips = [];
    for (i = 0; i <= timeSimulated; i++) {
        numberShips[i] = Math.round(i*(numberShipsFinal-numberShipsInitial)/timeSimulated+numberShipsInitial)
    }
    var currentPopulation = initialPopulation;
    //var percentFemales = (100-percentJuveniles)/2;
    //var percentMales = 100-percentJuveniles-percentFemales;
    var ageFemaleSterile = Math.round((ageLifeExpectancy-ageMaturationMax)*0.6+ageMaturationMax);
    var yearStartSimulation = 2019;
    var currentYear = yearStartSimulation;  
}

SimulationYear = function() {
/********************************************************************************************
 * INPUT DATA OF THE STUDY AREA (BY THE USER)
*/
// extracting the input data from the url
var url = location.search;                                              // get the raw url with the input data
var initialPopulation = $.query.get('initialPopulation');               // number of whales simulated
var percentJuveniles = $.query.get('percentualJuveniles');              // percentage of juveniles in the population
var percentFemales = $.query.get('percentualFemales');                  // percentage of females in the population
var numberShipsInitial = $.query.get('numberShipsInitial');             // number of ships crossing the area per year
var numberShipsFinal = $.query.get('numberShipsExpectedFinal');         // number of ships at the end of the simulation
var ageLifeExpectancy = $.query.get('ageLifeExpectancy');               // life expectancy
var ageMaturationMax = $.query.get('ageMaturationMax');                 // maximum age of sexual maturarion
var ageMaturationMin = $.query.get('ageMaturationMin');                 // minimum age of sexual maturarion
var probBirth = $.query.get('probBirth');                               // probability for females having an offspring
var probSurvivalAdults = $.query.get('probSurvivalAdults');             // probability of survival at each year for adults
var probSurvivalJuveniles = $.query.get('probSurvivalJuveniles');       // probability of survival at each year for juveniles
var timeSimulated = $.query.get('numberYearsSimulated');                // time of simulation in years
var numberSimulation = $.query.get('numberSimulations');                // number of repetions for each simulation (default 1000)
var strikeRateYear = $.query.get('strikeRateYear');                     // average number of removals per year
var strikeRateShip = $.query.get('strikeRateShip');                     // average number of removals per ship (if strikeRateYear = 0)
//var strikeType = $.query.get('strikeType');                           // average number of removals per ship (if strikeRateYear = 0)
//var strikesGender = $.query.get('gender');                            // random (=1) females (=2) juveniles (=3)
var whalingRateYear = $.query.get('whalingRateYear');                   // amount of animals whaled by year
var strandingRateYear = $.query.get('strandingRateYear');               // amount of individuals found dead on the beach
var otherRateYear = $.query.get('otherRateYear');   

var strikeType = 'perYear';
var strikeClass = ['male', 'female', 'juvenile'];       //random //female ['', 'female', ''] // juvenile ['', '', 'juvenile']
var initialPopulationJuveniles = Math.round(initialPopulation*percentJuveniles/100);
var initialPopulationFemales = Math.ceil((initialPopulation-initialPopulationJuveniles)*percentFemales/100);
var initialPopulationMales = initialPopulation-initialPopulationJuveniles-initialPopulationFemales;
var numberShips = [];
for (i = 0; i <= timeSimulated; i++) {
    numberShips[i] = Math.round(i*(numberShipsFinal-numberShipsInitial)/timeSimulated+numberShipsInitial)
}
var currentPopulation = initialPopulation;
//var percentFemales = (100-percentJuveniles)/2;
//var percentMales = 100-percentJuveniles-percentFemales;
var ageFemaleSterile = Math.round((ageLifeExpectancy-ageMaturationMax)*0.6+ageMaturationMax);
var yearStartSimulation = 2019;
var currentYear = yearStartSimulation;  

// generating the same random numbers
var myrng = new Math.seedrandom(1234);

/***********************************************
 * YEAR ZERO
***********************************************/ 
var juvenilePopulationPerYear =[], adultFemalePopulationPerYear = [], adultMalePopulationPerYear = [], adultMalePopulationPerYear = [], naturalDeathPerYear = [], shipStrikeDeathPerYear = [], whalingWhalesPerYear = [], strandingWhalesPerYear = [], otherThreatPerYear = [], agePerYear = [], agePerYearAverage = [];

totalPopulationPerYear = [];
juvenilePopulationPerYear =[];

totalPopulationPerYear[0] = initialPopulation, juvenilePopulationPerYear[0] = initialPopulationJuveniles,adultFemalePopulationPerYear[0] = initialPopulationFemales, adultMalePopulationPerYear[0] = initialPopulationMales;

// create the initial population and assign id, age/birth, class, and wheter females are pregnant
var populationProperties = {}
for (var i = 1; i <= initialPopulation; i++) {
    populationProperties[i] = new agent()
    populationProperties[i].id = i;
    if (i <= initialPopulationJuveniles) {
        populationProperties[i].age = Math.floor(myrng()*ageMaturationMax);
        populationProperties[i].yearBirth = yearStartSimulation-populationProperties[i].age;
        var femaleOrMale = SJS.Binomial(1, percentFemales/100);
        if (femaleOrMale.sample(1) == true) {
            populationProperties[i].gender = 'female';
        } else {
            populationProperties[i].gender = 'male';
        }
    } else if (i > initialPopulationJuveniles && i <= (initialPopulationJuveniles+initialPopulationFemales)) {
        populationProperties[i].class = 'adult';
        populationProperties[i].gender = 'female';
        populationProperties[i].age = Math.floor(myrng()*(ageLifeExpectancy-ageMaturationMax)+ageMaturationMax);
        populationProperties[i].yearBirth = yearStartSimulation-populationProperties[i].age;
        populationProperties[i].yearSexualMaturation = 'unknown';
        if (populationProperties[i].age < ageFemaleSterile) {
            var pregnantOrNot = SJS.Binomial(1, probBirth/100);
            if (pregnantOrNot.sample(1) == true) {
                populationProperties[i].pregnancyStatus = 'pregnant';
            } else {
                populationProperties[i].pregnancyStatus = 'nonpregnant';
            } 
        }
        else {
            populationProperties[i].pregnancyStatus = 'sterile';
        }
    } else {
        populationProperties[i].class = 'adult';
        populationProperties[i].gender = 'male';
        populationProperties[i].age = Math.floor(myrng()*(ageLifeExpectancy-ageMaturationMax)+ageMaturationMax);
        populationProperties[i].yearBirth = yearStartSimulation-populationProperties[i].age;
        populationProperties[i].yearSexualMaturation = 'unknown';
    }
}

//adultMalePopulationPerYear[0] = initialPopulation - initialPopulationJuveniles - adultFemalePopulationPerYear[0];

/********************************************************************************************
 * LOOP FOR EVERY YEAR
********************************************************************************************/
for (var y = 1; y <= timeSimulated; y++) {
    // add one year to the simulation and one year for each agent's age
    currentYear +=1;
    for (var i = 1; i <= currentPopulation; i++) {
        if (populationProperties[i].status == 'alive') {
            populationProperties[i].age += 1;
        }
    }
    naturalDeathPerYear[y] = 0;
    shipStrikeDeathPerYear[y] = 0;
    whalingWhalesPerYear[y] = 0;
    strandingWhalesPerYear[y] = 0
    otherThreatPerYear[y] = 0;

    // agents that will die by natural causes
    for (var i = 1; i <= currentPopulation; i++) {
        if (populationProperties[i].status == 'alive') {
            if (populationProperties[i].class == 'juveniles') {
                var liveOrNot = SJS.Binomial(1, probSurvivalJuveniles/100);
                if (liveOrNot.sample(1) == true) {
                    populationProperties[i].status = 'alive';
                } else {
                    makeDead(i);
                    populationProperties[i].causeDeath = 'natural';
                    naturalDeathPerYear[y] +=1; 
                } 
            } else {
                var liveOrNot = SJS.Binomial(1, probSurvivalAdults/100);
                if (populationProperties[i].age > 1.1*ageLifeExpectancy) {
                    makeDead(i);
                    populationProperties[i].causeDeath = 'natural';
                    naturalDeathPerYear[y] +=1;
                } else if (liveOrNot.sample(1) == true) {
                    populationProperties[i].status = 'alive';
                } else {
                    makeDead(i);
                    populationProperties[i].causeDeath = 'natural';
                    naturalDeathPerYear[y] +=1;
                } 
            }
        }
    }

    // number of agent that will be stroke by ships
    var numberShipStrikes = 0;
    if (strikeType == 'perYear') {
        var poisson = SJS.Poisson(strikeRateYear);
        numberShipStrikes = Number(poisson.sample(1));
    } else {
        var poisson = SJS.Poisson(strikeRateShip*numberShips[currentYear-yearStartSimulation-1]);
        numberShipStrikes = Number(poisson.sample(1));
    }

    // which agents will be stroke
    for (i = 0; i < numberShipStrikes; i++) {
        randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
        if (populationProperties[randomIndex].status == 'alive' && ((populationProperties[randomIndex].class == 'adult' && populationProperties[randomIndex].gender == strikeClass[0]) || (populationProperties[randomIndex].class == 'adult' && populationProperties[randomIndex].gender == strikeClass[1]) || (populationProperties[randomIndex].class == strikeClass[2]))) {
            makeDead(randomIndex);
            populationProperties[randomIndex].causeDeath = 'ship';
            shipStrikeDeathPerYear[y] += 1;
        }
        else {
            i=i-1;
        }
    } 

    // which agents will be whaled
    var numberWhalingWhales = 0;
    if (whalingRateYear > 0) {
        var poisson = SJS.Poisson(whalingRateYear);
        numberWhalingWhales = Number(poisson.sample(1));
        for (i = 0; i < numberWhalingWhales; i++) {
            randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
            if (populationProperties[randomIndex].status == 'alive') {
                makeDead(randomIndex);
                populationProperties[randomIndex].causeDeath = 'whaling';
                whalingWhalesPerYear[y] += 1;
            }
            else {
                i=i-1;
            }
        } 
    }

    // which agents will eventually strand
    var numberStrandingWhales = 0;
    if (strandingRateYear > 0) {
        var poisson = SJS.Poisson(strandingRateYear);
        numberStrandingWhales = Number(poisson.sample(1));
        for (i = 0; i < numberStrandingWhales; i++) {
            randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
            if (populationProperties[randomIndex].status == 'alive') {
                makeDead(randomIndex);
                populationProperties[randomIndex].causeDeath = 'stranding';
                strandingWhalesPerYear[y] += 1;
            }
            else {
                i=i-1;
            }
        } 
    }

    // which agents will eventually die by other means
    var numberOtherThreatWhales = 0;
    if (otherRateYear > 0) {
        var poisson = SJS.Poisson(otherRateYear);
        numberOtherThreatWhales = Number(poisson.sample(1));
        for (i = 0; i < numberOtherThreatWhales; i++) {
            randomIndex = Math.ceil(myrng()*(Object.keys(populationProperties).length));
            if (populationProperties[randomIndex].status == 'alive') {
                makeDead(randomIndex);
                populationProperties[randomIndex].causeDeath = 'other';
                otherThreatPerYear[y] += 1;
            }
            else {
                i=i-1;
            }
        } 
    }

    // if juveniles will mature or not
    for (var i = 1; i <= currentPopulation; i++) {
        if (populationProperties[i].class == 'juvenile') {
            if (populationProperties[i].age == ageMaturationMax) {
                populationProperties[i].class = 'adult'
            } else if (populationProperties[i].age >= ageMaturationMin) {
                var matureOrNot = SJS.Binomial(1, 1/(ageMaturationMax-ageMaturationMin));
                if (matureOrNot.sample(1) == true) {
                    populationProperties[i].class = 'adult';
                    populationProperties[i].ageSexualMaturation = populationProperties[i].age;
                }
            }
        }
    }

    // females are pregnant and will give birth or are not and may become pregnant (it also updates the current population)
    for (var i = 1; i <= currentPopulation; i++) {
        if (populationProperties[i].gender == 'female' && populationProperties[i].class == 'adult') {
            if (populationProperties[i].pregnancyStatus == 'pregnant') {
                currentPopulation += 1;
                populationProperties[currentPopulation] = new agent();
                populationProperties[currentPopulation].id = currentPopulation;
                var femaleOrMale = SJS.Binomial(1, percentFemales/100);
                if (femaleOrMale.sample(1) == true) {
                    populationProperties[currentPopulation].gender = 'female';
                } else {
                    populationProperties[currentPopulation].gender = 'male';
                }
                populationProperties[i].pregnancyStatus = 'nonpregnant';
            } else if (populationProperties[i].pregnancyStatus == 'nonpregnant') {
                var pregnantOrNot = SJS.Binomial(1, probBirth/100);
                if (pregnantOrNot.sample(1) == true) {
                    populationProperties[i].pregnancyStatus = 'pregnant';
                }
            } else if (populationProperties[i].age > ageFemaleSterile) {
                populationProperties[i].pregnancyStatus = 'sterile';
            }
        }
    }
    
    // measure population size
    totalPopulationPerYear[y] = 0, juvenilePopulationPerYear[y] = 0, adultMalePopulationPerYear[y] = 0, adultFemalePopulationPerYear[y] = 0;
    for (var i = 1; i <= currentPopulation; i++) {
        if (populationProperties[i].status == 'alive') {
            totalPopulationPerYear[y] += 1;
            if (populationProperties[i].class == 'juvenile') {
                juvenilePopulationPerYear[y] += 1;
            } else if (populationProperties[i].class == 'adult' && populationProperties[i].gender == 'female' ) {
                adultFemalePopulationPerYear[y] += 1;
            } else {
                adultMalePopulationPerYear[y] +=1;
            }
        }
    }
    window.juvenilePopulationPerYearGlobal = juvenilePopulationPerYear;
    window.adultMalePopulationPerYearGlobal = adultMalePopulationPerYear;
    window.adultFemalePopulationPerYearGlobal = adultFemalePopulationPerYear;

    // measure population aging
    agePerYear[y] = 0,
    counting = 0;
    for (var i = 1; i <= currentPopulation; i++) {
        if (populationProperties[i].status == 'alive') {
           agePerYear[y] += populationProperties[i].age;
           counting += 1;
        }
    }
    agePerYearAverage[y] = agePerYear[y]/counting;
}

window.agingPopulation = agePerYearAverage;

// measure population age profile
var ageLastYear = [];
counting = 0;
for (var i = 1; i <= currentPopulation; i++) {
    if (populationProperties[i].status == 'alive') {
        ageLastYear[counting] = populationProperties[i].age;
        counting += 1;
    }
}

window.naturalDeath = naturalDeathPerYear;
window.shipStrike = shipStrikeDeathPerYear;
window.whalingWhales = whalingWhalesPerYear;
window.strandingWhales = strandingWhalesPerYear;
window.otherThreat = otherThreatPerYear;



/********************************************************************************************
 * FUNCTIONS IMPLEMENTED
********************************************************************************************/
// create and define some properties of a new agent
function agent() {
    this.id = [],
    this.status = 'alive',
    this.class = 'juvenile',
    this.age = 0,        
    this.yearBirth = currentYear,
    this.yearSexualMaturation = [],
    this.yearDeath = [],
    this.causeDeath = [];
}

function makeDead(index) {
    populationProperties[index].status = 'dead';
    populationProperties[index].yearDeath = currentYear;
}
}


/***********************************************
 * LOOP SIMULATION
***********************************************/ 
inputData()
var timeSimulated = $.query.get('numberYearsSimulated'); 
var numberSimulation = 50;

var simulationTotalPopulationPerYear = [];
var simulationJuvenilePopulationPerYear = [];
var simulationFemalePopulationPerYear = [];
var simulationMalePopulationPerYear = [];
var simulationAgingPopulation = [];
var simulationNaturalDeath = [];
var simulationShipStrike = [];
var simulationWhaling = [];
var simulationStranding = [];
var simulationOtherThreat = [];
var simulationAgeProfileLastYear = [];
for (var i = 0; i <= numberSimulation; i++) {
    SimulationYear ()
    simulationTotalPopulationPerYear[i]=totalPopulationPerYear;
    simulationJuvenilePopulationPerYear[i]=juvenilePopulationPerYearGlobal;
    simulationFemalePopulationPerYear[i]=adultFemalePopulationPerYearGlobal;
    simulationMalePopulationPerYear[i]=adultMalePopulationPerYearGlobal;
    simulationAgingPopulation[i]=agingPopulation;
    simulationNaturalDeath[i]=naturalDeath;
    simulationShipStrike[i]=shipStrike;
    simulationWhaling[i]=whalingWhales;
    simulationStranding[i]=strandingWhales;
    simulationOtherThreat[i]=otherThreat;
    
};

// calculate average per year
var simulationTotalPopulationPerYearAverage = [];
var simulationJuvenilePopulationPerYearAverage = [];
var simulationFemalePopulationPerYearAverage = [];
var simulationMalePopulationPerYearAverage = [];
var simulationAgingPopulationAverage = [];
var simulationNaturalDeathAverage = [];
var simulationShipStrikeAverage = [];
var simulationWhalingAverage = [];
var simulationStrandingAverage = [];
var simulationOtherThreatAverage = [];
for (var i = 0; i <= timeSimulated; i++) {
    simulationTotalPopulationPerYearAverage[i] = 0;
    simulationJuvenilePopulationPerYearAverage[i] = 0;
    simulationFemalePopulationPerYearAverage[i] = 0;
    simulationMalePopulationPerYearAverage[i] = 0;
    simulationAgingPopulationAverage[i] = 0;
    simulationNaturalDeathAverage[i] = 0;
    simulationShipStrikeAverage[i] = 0;
    simulationWhalingAverage[i] = 0;
    simulationStrandingAverage[i] = 0;
    simulationOtherThreatAverage[i] = 0;
    for (var j = 0; j < numberSimulation; j++) {
        simulationTotalPopulationPerYearAverage[i] += simulationTotalPopulationPerYear[j][i]/numberSimulation;
        simulationJuvenilePopulationPerYearAverage[i] += simulationJuvenilePopulationPerYear[j][i]/numberSimulation;
        simulationFemalePopulationPerYearAverage[i] += simulationFemalePopulationPerYear[j][i]/numberSimulation;
        simulationMalePopulationPerYearAverage[i] += simulationMalePopulationPerYear[j][i]/numberSimulation;
        simulationAgingPopulationAverage[i] += simulationAgingPopulation[j][i]/numberSimulation;
        simulationNaturalDeathAverage[i] += simulationNaturalDeath[j][i]/numberSimulation;
        simulationShipStrikeAverage[i] += simulationShipStrike[j][i]/numberSimulation;
        simulationWhalingAverage[i] += simulationWhaling[j][i]/numberSimulation;
        simulationStrandingAverage[i] += simulationStranding[j][i]/numberSimulation;
        simulationOtherThreatAverage[i] += simulationOtherThreat[j][i]/numberSimulation;
    }
}

var totalPopulationPerSimulation = [];
var totalPopulationPerSimulationStd = [];
var simulationTotalPopulationPerYearAverageStdMax = [];
var simulationTotalPopulationPerYearAverageStdMin = [];
for (var i = 0; i <= timeSimulated; i++) {
    totalPopulationPerSimulation[i] = [];
    for (var j = 0; j < numberSimulation; j++) {
        totalPopulationPerSimulation[i][j] = simulationTotalPopulationPerYear[j][i]
    }
    totalPopulationPerSimulationStd[i]=math.std(totalPopulationPerSimulation[i])
    simulationTotalPopulationPerYearAverageStdMax[i]=simulationTotalPopulationPerYearAverage[i]+totalPopulationPerSimulationStd[i];
    simulationTotalPopulationPerYearAverageStdMin[i]=simulationTotalPopulationPerYearAverage[i]-totalPopulationPerSimulationStd[i];
}
