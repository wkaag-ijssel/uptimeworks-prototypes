// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Job compliance
let date_range = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Event listeners
document.getElementById('button-work-performance').addEventListener('click', function(event){ window.location.href = "work-performance.html"});
document.getElementById('button-finance-summary').addEventListener('click', function(event){ window.location.href = "financial.html"})

//Chart 2: asset health by alarms generated
let ctx4 = document.getElementById('assetHealth').getContext('2d');
var myDoughnutChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [95, 5],
            backgroundColor: [
                pMain
            ]
        }],
        labels: [
            'healthy assets (%)',
            'failing assets (%)'
        ]
    },
    options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            center: {
                text: '95%',
                fontStyle: 'Arial', 
                sidePadding: 50, 
                minFontSize: 10, 
                lineHeight: 10 
            }
        }
    }
});

//Chart 3: asset health by reports generated
let ctx2 = document.getElementById('estimatedUptime').getContext('2d');
var myDoughnutChart = new Chart(ctx2, {
    type: 'doughnut',
    data:  {
        datasets: [{
            data: [82, 18],
            backgroundColor: [
                pMain
            ]
        }],
        labels: [
            'healthy assets (%)',
            'failing assets (%)'
        ]
    },
    options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            center: {
                text: '82%',
                fontStyle: 'Arial', 
                sidePadding: 50,
                minFontSize: 10, 
                lineHeight: 10
            }
        }
    }
});


Chart.defaults.doughnut.cutoutPercentage  = 0.7;

Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 40;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
});


//Chart 5: Job Compliance per Task Type
let ctx1 = document.getElementById('taskCompletion').getContext('2d');
var myDoughnutChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [95, 5],
            backgroundColor: [
                pMain
            ]
        }],
        labels: [
            'Work completed (%)',
            'Work not completed (%)'
        ]
    },
    options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            center: {
                text: '95%',
                fontStyle: 'Arial', 
                sidePadding: 50,    
                minFontSize: 10,    
                lineHeight: 10    
            }
        }
    }
});

//Chart 5: Job Compliance per Task Type
let ctx = document.getElementById('jobCompliance').getContext('2d');
let myBar = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'],
        datasets: [{
            label: 'Executed on time',
            backgroundColor: pMain,
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
        }, {
            label: 'Not executed',
            data: [
                Math.floor(Math.random() * 5),
                Math.floor(Math.random() * 5),
                Math.floor(Math.random() * 5),
                Math.floor(Math.random() * 5),
                Math.floor(Math.random() * 5),
                Math.floor(Math.random() * 5)
            ]
        }]
    },
    options: {
        legend: {
            display: true,
            position: 'right',
            // position: 'top'
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        },
    }
});

//Chart 6: Not finished 
let ctx5 = document.getElementById('deviceActivity').getContext('2d');
let chart5 = new Chart(ctx5, {
    type: 'horizontalBar',
    data: { 
        labels: date_range,
        datasets: [{
            label: 'data',
            data: Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            fill: true,
            borderColor: pMain,
            pointStyle: 'line'
        },{
            label: 'label',
            data: Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            fill: false,
            borderColor: pDark,
            pointStyle: 'line'
        }], 

    },
    options: {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});

//Chart 7: Transaction costs 
let costsChartPromise = new Promise((resolve) => {
    let costs = [];
    let date = []
    costs[0] = 0;
    date[0] = 0;

    for(let i = 1; i < 40; i++){
        costs[i] = costs[i-1] + Math.floor(Math.random()*5);
        date[i] = i;
    }

    resolve([costs, date]);
}).then(data => {
    // console.log(data);
    let ctx7 = document.getElementById('transactionSumChart').getContext('2d');
    let chart7 = new Chart(ctx7, {
        type: 'line',
        data: { 
            labels: data[1], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'data',
                data: data[0],
                fill: true,
                borderColor: pMain,
                pointStyle: 'line',
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0,
                        autoSkipPadding: 50
                    }
                }],
                yAxes: [{
                    position: 'right'
                }]
            }
        }
    }); 
})

