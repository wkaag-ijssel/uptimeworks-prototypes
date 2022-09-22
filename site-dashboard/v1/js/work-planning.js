// Color scheme
let pMain = "#1a237e";
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Event listeners
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
    backgroundColor: pDark,
    fill: false,
    data: Array.from({length: 12}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pLight,
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
    backgroundColor: pDark,
    fill: false,
    data: Array.from({length: 52}, () => Math.random())
},{
    label: 'resources',
    backgroundColor: pLight,
    fill: false,
    data: Array.from({length: 52}, () => Math.random())
}];

let weeklyLabels = [];
for(let i = 0; i<52; i += 1){
    weeklyLabels[i] = i+1;
};

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
            display: true,
            position: false
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0,     // disables bezier curves
                borderWidth: 1 
            },
            point:{
                radius: 0       //hide data point indicators
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    autoSkip: true,
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

let workloadFunctionData = [{
    label: 'Vibration engineer',
    backgroundColor: pDark,
    borderColor: 'rgb(255, 255, 255)',
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 12}, () => Math.random()),
    pointStyle: 'circle'
},{
    label: 'Lubrication engineer',
    backgroundColor: pLight,
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
}];
let workloadFunctionLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let workloadTaskData = [{
    label: 'Lubrication',
    backgroundColor: pDark,
    borderColor: 'rgb(255, 255, 255)',
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 12}, () => Math.random()),
    pointStyle: 'circle'
},{
    label: 'Inspection',
    backgroundColor: pMain,
    borderColor: 'rgb(255, 255, 255)',
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 12}, () => Math.random()),
    pointStyle: 'circle'
},{
    label: 'Process',
    backgroundColor: pLight,
    borderColor: 'rgb(255, 255, 255)',
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 12}, () => Math.random()),
    pointStyle: 'circle'
},{
    label: 'Vibration',
    backgroundColor: sDark,
    borderColor: 'rgb(255, 255, 255)',
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
    data: Array.from({length: 12}, () => Math.random()),
    pointStyle: 'circle'
},{
    label: 'Thermographic',
    backgroundColor: sMain,
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
}];
let workloadTaskLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Chart 2: Resources estimation per function
let ctx2 = document.getElementById('resourcesChart').getContext('2d');
let workloadFunctionChart = stackedBarChart(ctx2, workloadFunctionData, workloadFunctionLabels);

// Chart 3: Resources estimation per type of Task
let ctx3 = document.getElementById('taskWorkloadChart').getContext('2d');
let workloadTaskChart = stackedBarChart(ctx3, workloadTaskData, workloadTaskLabels);

function stackedBarChart(elem, data, labels){
    return new Chart(elem, {
        type: 'bar',
        data: { 
            labels: labels,
            datasets: data
        },
        options: {
            legend: {
                display: true,
                position: 'right',
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
                    stacked: true
                    
                }],
                yAxes: [{
                    position: 'right',
                    stacked: true
                }]
            }
        }
    });
}