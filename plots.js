/* INPUT DATA OF THE STUDY AREA (BY THE USER) */
// Extracting the input data from the url

var params = {};
var getParams = function (url) {
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
	}
    return params;
};

var url = location.search; // Get the raw url with the input data
getParams(url);


var strikeType = 'perYear';
var strikeClass = ['male', 'female', 'juvenile'];       //random //female ['', 'female', ''] // juvenile ['', '', 'juvenile']
var initialPopulationJuveniles = Math.round(params.initialPopulation * params.percentJuveniles / 100);
var initialPopulationFemales = Math.ceil((params.initialPopulation - params.initialPopulationJuveniles) * params.percentFemales / 100);
var initialPopulationMales = params.initialPopulation - params.initialPopulationJuveniles - params.initialPopulationFemales;
var numberShips = [];
for (i = 0; i <= params.numberYearsSimulated; i++) {
    numberShips[i] = Math.round(i*(params.numberShipsFinal - params.numberShipsInitial) / params.numberYearsSimulated + params.numberShipsInitial)
}
var currentPopulation = params.initialPopulation;
//var percentFemales = (100-percentJuveniles)/2;
//var percentMales = 100-percentJuveniles-percentFemales;
var ageFemaleSterile = Math.round((params.ageLifeExpectancy - params.ageMaturationMax) * 0.6 + params.ageMaturationMax);
var yearStartSimulation = 2019;
var currentYear = yearStartSimulation;

/********************************************************************************************
 * PLOTS CONFIGURATIOIN
********************************************************************************************/
// table input data
var values = [
    ['Time simulated', 'Number of simulations', 'Initial population',
    'Percentage of juveniles', 'Initial number of ships', 'Final number of ships',
    'Type of strike', 'Rate of strikes',  'Life expectancy',
    'Age maturation', 'Probability of birth', 'Probability of natural death for adults',
    'Probability of natural death for juveniles','Whaling', 'Stranding', 'Others'],
    [params.numberYearsSimulated+' years', 
    params.numberSimulations+' simulations', 
    params.initialPopulation+' individuals', 
    params.percentualJuveniles+'%', 
    params.numberShipsInitial+' ships', 
    params.numberShipsExpectedFinal+' ships', 'Random', 
    params.strikeRateYear+' strikes per year or ship',  
    params.ageLifeExpectancy+' years', 
    params.ageMaturationMin + '-' + params.ageMaturationMax +' years old',
    params.probBirth+'%',
    params.probSurvivalAdults+'%',
    params.probSurvivalJuveniles+'%', 
    params.whalingRateYear+'%', 
    params.strandingRateYear+'%', 
    params.otherRateYear+'%']]

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
for (x = 0; x <= params.numberYearsSimulated; x++) {                            
    xAxis[x] = yearStartSimulation + x;
};
xAxis[0] = yearStartSimulation;


// plot: population increase
var plotOne = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverageStdMax,
    mode: 'lines',
    name: 'Maximum Standard deviation',
    line: {
      dash: 'dot',
      width: 1,
      color: 'rgb(225,45,45)',
    },
};
var plotTwo = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverageStdMin,
    mode: 'lines',
    name: 'Minimum Standard deviation',
    line: {
      dash: 'dot',
      width: 1,
      color: 'rgb(225,45,45)',
    },
    
    fill: 'tonexty',
    fillcolor: 'rgba(225,45,45,0.3)',
};
var plotThree = {
    x: xAxis,
    y: simulationTotalPopulationPerYearAverage,
    type: 'scatter',
    name: 'Total population',
};
  
var plotFour = {
    x: xAxis,
    y: simulationJuvenilePopulationPerYearAverage,
    type: 'scatter',
    name: 'Juvenile population'
};
var plotFive = {
    x: xAxis,
    y: simulationFemalePopulationPerYearAverage,
    type: 'scatter',
    name: 'Female population'
};
var plotSix = {
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
var data = [plotOne, plotTwo, plotThree, plotFour, plotFive, plotSix];
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
    autosize: true,
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





function cdfNormal (x, mean, standardDeviation) {
    return (1-math.erf((mean-x)/(Math.sqrt(2)*standardDeviation)))/2
};

shipStrikeDeathPerYear.y[0]=0;
var probabilityShipStrike = [], probabilityShipStrikeAxis = [];
for (t = 1; t < math.max(shipStrikeDeathPerYear.y)*1.3*params.numberYearsSimulated; t++) {
    probabilityShipStrike[t]=cdfNormal(t, math.mean(shipStrikeDeathPerYear.y)*params.numberYearsSimulated, math.std(shipStrikeDeathPerYear.y)*params.numberYearsSimulated)*100;
    probabilityShipStrikeAxis[t] = t;
};

naturalDeathPerYear.y[0]=0;
var probabilityNaturalDeath = [], probabilityNaturalDeathAxis = [];
for (t = 0; t < math.max(naturalDeathPerYear.y)*1.3*params.numberYearsSimulated; t++) {
    probabilityNaturalDeath[t]=cdfNormal(t, math.mean(naturalDeathPerYear.y)*params.numberYearsSimulated, math.std(naturalDeathPerYear.y)*params.numberYearsSimulated)*100;
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
