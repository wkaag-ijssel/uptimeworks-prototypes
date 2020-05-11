/*const pallete = {
    pMain = "#1a237e",
    pLight = "#534bae",
    pDark = "#000051",
    sMain = "#ffab00",
    sLight = "#ffdd4b",
    sDark = "#c67c00"
};*/

let pMain = 'rgb(26,35,126)';

// import { zip } from "d3";
let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
let workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let readings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let totalSavings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));

let ctx = document.getElementById('myChart_1').getContext('2d');
let chart1 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: date_range,
        datasets: [{
            label: 'n',
            fill: false,
            borderColor: pMain,
            data: workorders
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        elements: {
            line: {
                tension: 0 // disables bezier curves
            },
            point:{
                radius: 0 //hide data point indicators
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 15
                }
            }],
            yAxes: [{
                gridLines: {
                    display:true
                }   
            }]
        }
    }
});

let ctx2 = document.getElementById('myChart_2').getContext('2d');
let chart2 = new Chart(ctx2, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

function changeChartType(evt, chartName, dataInput) {
    let i, tabcontent, tablinks;
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    chartName.data.datasets.forEach((dataset) => {
        dataset.labels = date_range;
        dataset.data = dataInput;
    });

    chart1.update();
    evt.currentTarget.className += " active";
}
  
// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();
function addData(data, index) {
    console.log(data, index)
    chart1.data.labels.push("new");
    chart1.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart1.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function updateScales(chart) {
    var xScale = chart.scales['x-axis-0'];
    var yScale = chart.scales['y-axis-0'];

    chart.options.scales = {
        xAxes: [{
            id: 'newId',
            display: true
        }],
        yAxes: [{
            display: true,
            type: 'logarithmic'
        }]
    };

    chart.update();
    // need to update the reference
    xScale = chart.scales['newId'];
    yScale = chart.scales['y-axis-0'];
}