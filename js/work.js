// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Bar plot
let ctx = document.getElementById('workLoadChart').getContext('2d');
let resourcesChart = new Chart(ctx, {
    type: 'bar',
    data: { 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'workload',
            backgroundColor: pLight,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random())
        },{
            label: 'resources',
            backgroundColor: pDark,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random())
        },{
            label: 'average',
            data: [.5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5],
            fill: false,
            type: 'line'
        }]
    },
    options: {
        legend: {
            display: false,
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Vibration engineer',
            backgroundColor: pLight,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random()),
            pointStyle: 'circle'
        },{
            label: 'Lubrication engineer',
            backgroundColor: pDark,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: 12}, () => Math.random()),
            pointStyle: 'circle'
        },{
            label: 'Other',
            data: [.5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5],
            fill: true,
            pointStyle: 'circle'
        }]
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