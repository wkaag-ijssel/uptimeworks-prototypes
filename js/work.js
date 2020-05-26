// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));

// Bar plot
let ctx = document.getElementById('workLoadChart').getContext('2d');
let resourcesChart = new Chart(ctx, {
    type: 'bar',
    data: { 
        labels: [
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
        ],
        datasets: [{
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
            label: 'average',
            data: [.5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5],
            fill: false,
            type: 'line'
        }]
    },
    options: {
        legend: {
            display: false,
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
                position: 'right'
            }]
        }
    }
});

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

// Bar plot
let ctx3 = document.getElementById('routeComplianceChart').getContext('2d');
let routeComplianceChart = new Chart(ctx3, {
    type: 'horizontalBar',
    data: { 
        labels: [
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
        ],
        datasets: [{
            label: 'N. of tasks executed on time',
            backgroundColor: pDark,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random())
        },{
            label: 'N. of tasks executed too late',
            backgroundColor: pLight,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random())
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
ctx3.height = 100;

//Job compliance bar plot
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