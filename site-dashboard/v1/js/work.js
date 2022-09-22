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
document.getElementById('intervalSelector').addEventListener('change', function(event){
    if(event.target.value == "week"){
        changeChartData(resourcesChart, weeklyData, weeklyLabels);
    } else if(event.target.value == "month"){
        changeChartData(resourcesChart, monthlyData, monthlyLabels)
    } else {
        console.log("warning: unknown selector option");
    }
});

/**Workload-resources chart 
 * Monthly data:
 */
let monthlyData = [{
    label: 'workload',
    borderColor: pDark,
    fill: false,
    data: Array.from({length: 12}, () => Math.random())
},{
    label: 'resources',
    borderColor: pDark,
    borderDash: [5,2],
    fill: false,
    data: Array.from({length: 12}, () => Math.random())
}];
let monthlyLabels = [
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
];

/** Weekly data */
let weeklyData = [{
    label: 'workload',
    borderColor: pDark,
    fill: false,
    data: Array.from({length: 52}, () => Math.random())
},{
    label: 'resources',
    borderColor: pDark,
    borderDash: [5,2],
    fill: false,
    data: Array.from({length: 52}, () => Math.random())
}];
let weeklyLabels = [
    [1, "Jan"],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    [6, "Feb"],
    ["", ""],
    ["", ""],
    ["", ""],
    [10, "Mar"],
    ["", ""],
    ["", ""],
    ["", ""],
    [14, "Apr"],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""], 
    [19, "May"],
    ["", ""],
    ["", ""],
    ["", ""],
    [23, "Jun"],
    ["", ""],
    ["", ""],
    ["", ""],
    [27, "Jul"],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    [32, "Aug"],
    ["", ""],
    ["", ""],
    ["", ""],
    [36, "Sep"],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    [41, "Oct"],
    ["", ""],
    ["", ""],
    ["", ""],
    [45, "Nov"],
    ["", ""],
    ["", ""],
    ["", ""],
    [49, "Dec"],
    ["", ""],
    ["", ""],
    ["", ""]
];

/**Chart 1: Workload vs. resources*/
let ctx = document.getElementById('workLoadChart').getContext('2d');
let resourcesChart = new Chart(ctx, {
    type: 'line',
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
                borderWidth: 1
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
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    minorTick: {
                        fontSize: 7
                    }
                }
            }],
            yAxes: [{
                position: 'right'
            }]
        }
    }
});

/**
 * @param {string} chartName The chart variable name
 * @param {array} data The new dataset 
 * @param {array} label  The new labels
 */
function changeChartData(chartName, data, label) {
    chartName.data.datasets = data;
    chartName.data.labels = label;
    chartName.update();
}

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
        return ((a.value < b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
    });

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
        data[k] = list[k].value;
        labels[k] = list[k].label;
    }

    return data, labels;
}

// Chart 4: Resources estimation per function
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
                gridLines: {
                    display: false,
                },
                
            }],
            yAxes: [{
                position: 'right',
                stacked: true
            }]
        }
    }
});

//Chart 3: task compliance per route
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
    let ctx3 = document.getElementById('routeComplianceChart').getContext('2d');
    let routeComplianceChart = horizontalBarChart(ctx3, route[0], route[1]);

    //Add custom graph options
});

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels){
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

//Chart 2: Job compliance bar plot
let ctx4 = document.getElementById('jobCompliance').getContext('2d');
let jobComplianceChart = new Chart(ctx4, {
    type: 'horizontalBar',
    data: {
        labels: ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'],
        datasets: [{
            label: 'Executed on time',
            backgroundColor: pDark,
            data: [
                Math.floor(Math.random() * 85),
                Math.floor(Math.random() * 85),
                Math.floor(Math.random() * 85),
                Math.floor(Math.random() * 85),
                Math.floor(Math.random() * 85),
                Math.floor(Math.random() * 85)
            ]
        }, {
            label: 'Executed too late',
            backgroundColor: pLight,
            data: [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
            ]
        }]
    },
    options: {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function(value, index, values) {
                        return value + '%';
                    }
                }
            }],
            yAxes: [{
                stacked: true
            }]
        },
        legend: {
            display: false,
            position: 'bottom'
        }
    }
});

//Chart 5: Expected workload vs. actual work duration
let ctx5 = document.getElementById('estimatedWorkLoad').getContext('2d');
let workloadPerIndividual = new Chart(ctx5, {
    type: 'line',
    data: { 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Person X',
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 10)+20),
            fill: false,
            borderColor: pMain,
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
            label: "Person Y",
            fill: false,
            borderColor: pMain,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+10),
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
            label: "Person Z",
            fill: false,
            borderColor: pMain,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 10)+20),
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
            label: "Person A",
            fill: false,
            borderColor: pMain,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 10)+20),
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
            label: "Person B",
            fill: false,
            borderColor: pMain,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 10)+20),
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
            label: "Person C",
            fill: false,
            borderColor: pMain,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 10)+20),
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
            label: "Person D",
            fill: false,
            borderColor: pMain,
            data: Array.from({length: 12}, () => Math.floor(Math.random() * 10)+20),
            borderWidth: 1,
            pointStyle: 'line',
            pointStrokeColor: "rgba(255, 255, 255, 0)"
        }]
    },
    options: {
        legend: {
            display: false,
            position: 'bottom',
            align: 'start'
        },
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'dataset',
            intersect: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                position: 'right',
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        onHover: function onHover (evt, activeElements) {
            if (!activeElements || !activeElements.length) {
                this.data.datasets.forEach((dataset) => {
                    dataset.borderColor = pMain;
                });
            } else {
                let activeIndex = activeElements[0]._datasetIndex;
                this.data.datasets.forEach((dataset, index) => {
                    (index == activeIndex) ? setActive() : setFade();
                    function setActive(){ dataset.borderColor = 'red'; } //to do: prevent showing pointer on hover
                    function setFade(){ dataset.borderColor = "rgb(200, 200, 200)"; }
                });
            }
            this.update();
            return;
        },
    }
});

//Chart 6: Level of Completed and Not Completed Work per Asset 
let getDataPromise = new Promise((resolve) => {
    let array1 = Array.from({length: 20}, () => Math.floor(Math.random() * 30));
    let array2 = Array.from({length: 20}, () => Math.floor(Math.random() * 30));
    let scatterArray = [];

    //Create a array of objects, required input format for scatter plot.
    array1.forEach((item_x, index) => {
        let item_y = array2[index];
        scatterArray.push({
            x : item_x, 
            y : item_y
        });
    });
    resolve(scatterArray);
}).then(data => {   
    console.log(data);
    let ctx6 = document.getElementById('executedWorkChart').getContext('2d');
    let executedWorkChart = new Chart(ctx6, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                borderColor: pMain,
                data: data
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'not executed'
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'executed'
                    }
                }]
            }
        }
    });
});