// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Event listeners
// document.getElementById('button-routes').addEventListener('click', function(event){ window.location.href = "work/routes.html"});
// document.getElementById('button-tasks').addEventListener('click', function(event){ window.location.href = "work/routes.html"});
// document.getElementById('intervalSelector').addEventListener('change', function(event){
//     if(event.target.value == "week"){
//         changeChartData(resourcesChart, weeklyData, weeklyLabels);
//     } else if(event.target.value == "month"){
//         changeChartData(resourcesChart, monthlyData, monthlyLabels)
//     } else {
//         console.log("warning: unknown selector option");
//     }
// })


/**Workload-resources chart 
 * 
 * Monthly data:
 */
monthlyData = [{
    label: 'workload',
    backgroundColor: pLight,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pDark,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
}];
monthlyLabels = [
    ['Jan', '2020'],
    ['Feb', ''],
    ['Mar', ''],
    ['Apr', ''],
    ['May', ''],
    ['Jun', ''],
    ['Jul', ''],
    ['Aug', ''],
    ['Sep', ''],
    ['Oct', ''],
    ['Nov', ''],
    ['Dec', ''],
    ['Jan', '2021'],
];

/** Weekly data */
weeklyData = [{
    label: 'workload',
    backgroundColor: pLight,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pDark,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},
{
    label: 'workload',
    backgroundColor: pLight,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pDark,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'workload',
    backgroundColor: pLight,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pDark,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'workload',
    backgroundColor: pLight,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pDark,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 13}, () => Math.random())
}];
weeklyLabels = [ //To do: week-bins instead of month-bins, add months to the 'major' ticks instead of jan/year indicator
    ['Jan', '2020'],
    ['Feb', ''],
    ['Mar', ''],
    ['Apr', ''],
    ['May', ''],
    ['Jun', ''],
    ['Jul', ''],
    ['Aug', ''],
    ['Sep', ''],
    ['Oct', ''],
    ['Nov', ''],
    ['Dec', ''],
    ['Jan', '2021'],
];

/**Chart 1: Workload vs. resources*/
let ctx = document.getElementById('workLoadChart').getContext('2d');
let resourcesChart = new Chart(ctx, {
    type: 'bar',
    data: { 
        labels: monthlyLabels,
        datasets: monthlyData
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
            }],
            yAxes: [{
                position: 'right'
            }]
        }
    }
});

/**
 * @param {*} chartName The chart variable name
 * @param {*} dataInput The new dataset 
 * @param {*} refInput  The new labels
 */
function changeChartData(chartName, data, label) {
    chartName.data.datasets = data;
    chartName.data.labels = label;
    chartName.update();
}

function sortByData(data, labels){

    console.log(data, labels);
  //1) combine the arrays:
    var list = [];
    for (var j = 0; j < data.length; j++) 
        list.push({'value': data[j], 'label': labels[j]});

    //2) sort:
    list.sort(function(a, b) {
        return ((a.value < b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
        //Sort could be modified to, for example, sort on the age 
        // if the name is the same.
    });

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
        data[k] = list[k].value;
        labels[k] = list[k].label;
    }

    return data, labels;
}

// Line plot
let ctx2 = document.getElementById('resourcesChart').getContext('2d');
let workLoadChart = new Chart(ctx2, {
    type: 'line',
    data: { 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Vibration engineer',
            backgroundColor: pLight,
            borderColor: 'rgb(255, 255, 255)',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random()),
            pointStyle: 'circle'
        },{
            label: 'Lubrication engineer',
            backgroundColor: pDark,
            borderColor: 'rgb(255, 255, 255)',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random()),
            pointStyle: 'circle'
        },{
            label: 'Other',
            borderColor: 'rgb(255, 255, 255)',
            data: [.5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5],
            fill: true,
            pointStyle: 'circle'
        }]
    },
    options: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'end',
            labels: {
                usePointStyle: true
            }
        },
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
            }],
            yAxes: [{
                position: 'right',
                stacked: true
            }]
        }
    }
});

// let routeDataPromise = new Promise((resolve) => {
//     let data = Array.from({length: 12}, () => Math.random());
//     let labels = [
//         ['Route #6'],
//         ['Route #15'],
//         ['Route #10'],
//         ['Route #2'],
//         ['Route #9'],
//         ['Route #4'],
//         ['Route #11'],
//         ['Route #20'],
//         ['Route #19'],
//         ['Route #5'],
//         ['Route #16'],
//         ['Route #1']
//     ]
//     resolve([data, labels]);
// }).then(route => {  
//     //Sorts after routeData contains (generated) values
//     route[0], route[1] = sortByData(route[0], route[1]);

//     //Create bar graph
//     let ctx3 = document.getElementById('routeComplianceChart').getContext('2d');
//     let routeComplianceChart = horizontalBarChart(ctx3, route[0], route[1]);

//     //Add custom graph options
// });

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels){
    console.log(labels);
    return new Chart(chartElem, {
        type: 'horizontalBar',
        data: { 
            labels: labels,
            datasets: [{
                label: 'N. of tasks executed',
                backgroundColor: pDark,
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



//Create bar graph
// let ctx4 = document.getElementById('jobCompliance').getContext('2d');
// let jobComplianceChart = horizontalBarChart(ctx4, route[0], route[1]);

//Job compliance bar plot
// let ctx4 = document.getElementById('jobCompliance').getContext('2d');
// let jobComplianceChart = new Chart(ctx4, {
//     type: 'horizontalBar',
//     data: {
//         labels: ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'],
//         datasets: [{
//             label: 'Executed on time',
//             backgroundColor: pDark,
//             data: [
//                 Math.floor(Math.random() * 85),
//                 Math.floor(Math.random() * 85),
//                 Math.floor(Math.random() * 85),
//                 Math.floor(Math.random() * 85),
//                 Math.floor(Math.random() * 85),
//                 Math.floor(Math.random() * 85)
//             ]
//         }, {
//             label: 'Executed too late',
//             backgroundColor: pLight,
//             data: [
//                 Math.floor(Math.random() * 10),
//                 Math.floor(Math.random() * 10),
//                 Math.floor(Math.random() * 10),
//                 Math.floor(Math.random() * 10),
//                 Math.floor(Math.random() * 10),
//                 Math.floor(Math.random() * 10)
//             ]
//         }]
//     },
//     options: {
//         tooltips: {
//             mode: 'index',
//             intersect: false
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             xAxes: [{
//                 stacked: true,
//                 ticks: {
//                     min: 0,
//                     max: 100,
//                     callback: function(value, index, values) {
//                         return value + '%';
//                     }
//                 }
//             }],
//             yAxes: [{
//                 stacked: true
//             }]
//         },
//         legend: {
//             display: false,
//             position: 'bottom'
//         }
//     }
// });