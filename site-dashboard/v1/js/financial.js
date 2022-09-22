// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Dummy data
// let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
let date_range = [];
for(let i = 0; i<52; i += 1){
    date_range[i] = i+1;
};

let savingsData = [{
    label: 'savings',
    type: 'line',
    fill: false,
    borderColor: sMain,
    data: Array.from({length: date_range.length*.75}, () => Math.floor(Math.random() * 40)),
    backgroundColor: pMain
}];
let savingsLabels = date_range;

let costs = Array.from({length: date_range.length*.75}, () => Math.floor(Math.random() * 40));
let expected = Array.from({length: date_range.length * .25}, () => Math.floor(Math.random() * 20)+20);

let costsData = [{
    label: "expected costs",
    fill: false,
    borderColor: pLight,
    // steppedLine: 'middle',
    borderDash: [5,2],
    data: costs.concat(expected),
},{
    label: 'actual costs',
    data: costs,
    fill: false,
    borderColor: pMain,
}]
let costsLabels = date_range;
console.log(costs)
console.log(expected)
console.log(costsData[0].data.length)
console.log(date_range.length)

// Savings Chart
let ctx = document.getElementById('savingsChart').getContext('2d');
let chart1 = mixedGraph(ctx, savingsData, savingsLabels);

// Costs Chart
let ctx3 = document.getElementById('costsChart').getContext('2d');
let chart2 = mixedGraph(ctx3, costsData, costsLabels);

function mixedGraph(elem, data, input){
    return new Chart(elem, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: input,
            datasets: data,
            fill: false
        },

        // Configuration options go here
        options: {
            legend: {
                display: false,
                position: 'bottom',
                align: 'end',
                labels: {
                    usePointStyle: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                    borderWidth: 2
                },
                point:{
                    radius: 0 //hide data point indicators
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        maxTicksLimit: 15,
                        autoSkip: true, //!important
                        maxRotation: 0, 
                        minRotation: 0,
                        suggestedMin: 0,
                        suggestedMax: 52
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:true,
                    },
                    position: 'right',
                }]
            }
        }
    });
};

/**
 * Sort data 
 * @param {array} data 
 * @param {array} labels 
 */
function sortByData(data, labels){
    //1) combine the arrays:
      var list = [];
      for (var j = 0; j < data.length; j++) 
          list.push({'value': data[j], 'label': labels[j]});
  
      //2) sort:
      list.sort(function(a, b) {
          return ((a.value > b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
      });
  
      //3) separate them back out:
      for (var k = 0; k < list.length; k++) {
          data[k] = list[k].value;
          labels[k] = list[k].label;
      }
  
      return data, labels;
  }

//Chart 5
let routeDataPromise = new Promise((resolve) => {
    let data = Array.from({length: 12}, () => Math.random());
    let labels = [
        ['Route #6'],
        ['Route #15'],
        ['Route #10'],
        ['Route #2'],
        ['Route #9'],
        ['Route #4'],
        ['Route #11'],
        ['Route #20'],
        ['Route #19'],
        ['Route #5'],
        ['Route #16'],
        ['Route #1']
    ]
    resolve([data, labels]);
}).then(route => {  
    //Sorts after routeData contains (generated) values
    route[0], route[1] = sortByData(route[0], route[1]);

    //Create bar graph
    let ctx5 = document.getElementById('routeCostsChart').getContext('2d');
    let routeCosts = horizontalBarChart(ctx5, route[0], route[1]);
});

//Chart 2
let assetSavingsPromise = new Promise((resolve) => {
    let data = Array.from({length: 12}, () => Math.random() * 8000);
    let labels = [
        ['Asset #6'],
        ['Asset #15'],
        ['Asset #10'],
        ['Asset #2'],
        ['Asset #9'],
        ['Asset #4'],
        ['Asset #11'],
        ['Asset #20'],
        ['Asset #19'],
        ['Asset #5'],
        ['Asset #16'],
        ['Asset #1']
    ]
    resolve([data, labels]);
}).then(route => {  
    //Sorts after routeData contains (generated) values
    route[0], route[1] = sortByData(route[0], route[1]);

    //Create bar graph
    let ctx2 = document.getElementById('assetSavingsChart').getContext('2d');
    let assetSavings = horizontalBarChart(ctx2, route[0], route[1]);
});

//Chart 4
let assetCostsPromise = new Promise((resolve) => {
    let data = Array.from({length: 12}, () => Math.random());
    let labels = [
        ['Asset #6'],
        ['Asset #15'],
        ['Asset #10'],
        ['Asset #2'],
        ['Asset #9'],
        ['Asset #4'],
        ['Asset #11'],
        ['Asset #20'],
        ['Asset #19'],
        ['Asset #5'],
        ['Asset #16'],
        ['Asset #1']
    ]
    resolve([data, labels]);
}).then(route => {  
    //Sorts after routeData contains (generated) values
    route[0], route[1] = sortByData(route[0], route[1]);

    //Create bar graph
    let ctx4 = document.getElementById('assetCostsChart').getContext('2d');
    let assetCosts = horizontalBarChart(ctx4, route[0], route[1]);
});

//Chart 4
let taskSavingsPromise = new Promise((resolve) => {
    let data = Array.from({length: 6}, () => Math.random() * 10000);
    let labels = [
        ['Lubrication'],
        ['Process'],
        ['Vibration'],
        ['Inspection'],
        ['Thermographic'],
        ['Other']
    ]
    resolve([data, labels]);
}).then(data => {  
    //Sorts after routeData contains (generated) values
    data[0], data[1] = sortByData(data[0], data[1]);

    //Create bar graph
    let ctx6 = document.getElementById('taskSavingsChart').getContext('2d');
    let taskSavingsChart = horizontalBarChart(ctx6, data[0], data[1]);
});

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels, col=pMain){
    return new Chart(chartElem, {
        type: 'horizontalBar',
        data: { 
            labels: labels,
            datasets: [{
                label: 'N. of tasks executed',
                backgroundColor: col,
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: data
            }]
        },
        options: {
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                    borderWidth: 2
                },
                point:{
                    radius: 0 //hide data point indicators
                }
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    position: 'left'
                }]
            }
        }
    });
};