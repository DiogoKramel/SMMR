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


/********************************************************************************************
 * PLOTS CONFIGURATIOIN
********************************************************************************************/
// table input data
var values = [
    ['Time simulated', 'Number of simulations', 'Initial population','Percentage of juveniles', 'Initial number of ships', 'Final number of ships', 'Type of strike', 'Rate of strikes',  'Life expectancy', 'Age maturation', 'Probability of birth', 'Probability of natural death for adults', 'Probability of natural death for juveniles','Whaling', 'Stranding', 'Others'],
    [timeSimulated+' years', numberSimulation+' simulations', initialPopulation+' individuals', percentJuveniles+'%',numberShipsInitial+' ships', numberShipsFinal+' ships', 'Random', strikeRateYear+' strikes per year or ship',  ageLifeExpectancy+' years', ageMaturationMin + '-' + ageMaturationMax +' years old', probBirth+'%', probSurvivalAdults+'%', probSurvivalJuveniles+'%', '0 %', '0 %', '0 %']] //whalingRateYear+'%', strandingRateYear+'%', otherRateYear+'%'
var data = [{
type: 'table',
columnorder: [1,2],
columnwidth: [250,150],
header: {
  values: [["PARAMETERS IMPLEMENTED"], ["VALUE"]],
  align: ["left","center"],
  fill: {color: "black"},
  font: {color: "white"}
},
cells: {
  values: values,
  align: ["left","center"],
},
}]
var layout = {
    font: {
      family: 'Arial',
    },
    margin: {
        l: 0,
        b: 0,
        t: 50,
        pad: 4
      },
};
Plotly.plot('input-data', data, layout);


// build x axis with the years range
var xAxis = [];
for (x = 0; x <= timeSimulated; x++) {                            
    xAxis[x] = yearStartSimulation + x;
}
xAxis[0] = yearStartSimulation;

// plot: population increase
var simulationTotalPopulationPerYearAverageStdMax = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverageStdMax,
    mode: 'lines',
    name: 'Maximum Standard deviation',
    line: {
      dash: 'dot',
      width: 1,
      color: 'rgb(225,45,45)',
    },
    fill: 'tonexty',
    fillcolor: 'rgba(225,45,45,0.3)',
};
var simulationTotalPopulationPerYearAverageStdMin = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverageStdMin,
    mode: 'lines',
    name: 'Minimum Standard deviation',
    line: {
      dash: 'dot',
      width: 1,
      color: 'rgb(225,45,45)',
    }
};
var simulationTotalPopulationPerYearAverage = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverage,
    type: 'scatter',
    name: 'Total population',
};
  
var simulationJuvenilePopulationPerYearAverage = {
    x: xAxis,
    y: simulationJuvenilePopulationPerYearAverage,
    type: 'scatter',
    name: 'Juvenile population'
};
var simulationFemalePopulationPerYearAverage = {
    x: xAxis,
    y: simulationFemalePopulationPerYearAverage,
    type: 'scatter',
    name: 'Female population'
};
var simulationMalePopulationPerYearAverage = {
    x: xAxis,
    y: simulationMalePopulationPerYearAverage,
    type: 'scatter',
    name: 'Male population'
};
var layout = {
    title: 'Whale population variation over time',
    xaxis: {
        title: 'Year',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Number of individuals',
        showline: true,
        linewidth: 1,
        mirror: true
    },
};
var data = [simulationTotalPopulationPerYearAverage, simulationTotalPopulationPerYearAverageStdMin, simulationTotalPopulationPerYearAverageStdMax, simulationJuvenilePopulationPerYearAverage, simulationFemalePopulationPerYearAverage, simulationMalePopulationPerYearAverage];
Plotly.newPlot('plot-population', data, layout);




// plot: aging
var agePerYearAverage = {
    x: xAxis, 
    y: simulationAgingPopulationAverage, 
    name: 'AverageAge',
    type: 'bar'
};
var data = [agePerYearAverage];
var layout = {
    title: 'Aging of the population',
    xaxis: {
        title: 'Year',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Average age in years',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
};
Plotly.newPlot('plot-aging', data, layout);


// plot: death causes
var shipStrikeDeathPerYear = {
    x: xAxis, 
    y: simulationShipStrikeAverage, 
    name: 'Ship strikes per year',
    type: 'bar'
};
var naturalDeathPerYear = {
    x: xAxis, 
    y: simulationNaturalDeathAverage, 
    name: 'Natural deaths per year',
    type: 'bar'
};
var whalingWhalesPerYear = {
    x: xAxis, 
    y: simulationWhalingAverage, 
    name: 'Natural deaths per year',
    type: 'bar'
};
var strandingWhalesPerYear = {
    x: xAxis, 
    y: simulationStrandingAverage, 
    name: 'Stranding deaths per year',
    type: 'bar'
};
var otherThreatPerYear = {
    x: xAxis, 
    y: simulationOtherThreatAverage, 
    name: 'Other deaths per year',
    type: 'bar'
};
var data = [shipStrikeDeathPerYear, naturalDeathPerYear, whalingWhalesPerYear, strandingWhalesPerYear, otherThreatPerYear];
var layout = {
    title: 'Number and cause of deaths per year',
    xaxis: {
        title: 'Year',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Number of deaths',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    barmode: 'relative',
};
Plotly.newPlot('plot-deaths', data, layout);



/********************************************************************************************
 * STATISTICAL CALCULATIONS
********************************************************************************************/
/**


// plot: age profile
var ageLastYear = {
    x: simulationAgeProfileAverage, 
    name: 'AverageAge',
    type: 'histogram',
    xbins: { 
        size: 5
    }
};
var data = [ageLastYear];
var layout = {
    title: 'Age distribution',
    xaxis: {
        title: 'Age',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    yaxis: {
        title: 'Number of individuals',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
};
Plotly.newPlot('plot-aging-profile', data, layout);









function cdfNormal (x, mean, standardDeviation) {
    return (1-math.erf((mean-x)/(Math.sqrt(2)*standardDeviation)))/2
}
shipStrikeDeathPerYear[0]=0;
var probabilityShipStrike = [], probabilityShipStrikeAxis = [];
for (t = 0; t < math.max(shipStrikeDeathPerYear)*1.15; t++) {
    probabilityShipStrike[t]=cdfNormal(t, math.mean(shipStrikeDeathPerYear), math.std(shipStrikeDeathPerYear))*100;
    probabilityShipStrikeAxis[t] = t;
}
naturalDeathPerYear[0]=0;
var probabilityNaturalDeath = [], probabilityNaturalDeathAxis = [];
for (t = 0; t < math.max(naturalDeathPerYear)*1.15; t++) {
    probabilityNaturalDeath[t]=cdfNormal(t, math.mean(naturalDeathPerYear), math.std(naturalDeathPerYear))*100;
    probabilityNaturalDeathAxis[t] = t;
}


















// plot: probability
var probabilityStrikes = {
    x: probabilityShipStrikeAxis, 
    y: probabilityShipStrike,
    type: 'bar',
    name: 'Ship strike',
};
var probabilityNatural = {
    x: probabilityNaturalDeathAxis, 
    y: probabilityNaturalDeath,
    type: 'bar',
    name: 'Natural cause',
};
var data = [probabilityStrikes, probabilityNatural];
var layout = {
    title: 'Probability of having at least this amount of deaths',
    barmode: 'group',
    yaxis: {
        title: 'Probability [%]',
        showgrid: true,
        zeroline: false,
        linewidth: 1,
        mirror: true
    },
    xaxis: {
        title: 'Number of deaths',
        showgrid: true,
        zeroline: false,
        linewidth: 1,
        mirror: true
    },
};
Plotly.newPlot('plot-probability', data, layout);


// plot: probability normal distribution
var probabilityShipStrikeNormal = [], probabilityShipStrikeNormalAxis = [];
for (t = 1; t < probabilityShipStrike.length; t++) {
    probabilityShipStrikeNormal[t] = probabilityShipStrike[t]-probabilityShipStrike[t-1];
    probabilityShipStrikeNormalAxis[t] = t+1;
}
probabilityShipStrikeNormal[0] = probabilityShipStrike[0];
probabilityShipStrikeNormalAxis[0] = 1;
var probabilityStrikes = {
    x: probabilityShipStrikeNormalAxis, 
    y: probabilityShipStrikeNormal,
    type: 'bar',
};
var data = [probabilityStrikes];
var layout = {
    title: 'Normal distribution of ship collisions',
    yaxis: {
        title: 'Probability [%]',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
    xaxis: {
        title: 'Number of collisions',
        showgrid: true,
        linewidth: 1,
        mirror: true
    },
};
Plotly.newPlot('plot-probability-normal', data, layout);
*/