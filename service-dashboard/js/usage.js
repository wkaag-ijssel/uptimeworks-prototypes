// Color scheme
let pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

let normal = "#008b00"; //"#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#DD2C00";

fetch('menu-usage.html')
    .then(response => response.text())
    .then(data => {
        // Insert menu
        const menu = document.getElementById("dashboard-menu");
        menu.innerHTML = data;

        // Change view
        const elem = document.getElementById("tableView");
        elem.addEventListener("click", () => {
            window.location.href = "usage-table.html"
        })
    });
//Chart 2: asset health by alarms generated
let ctx4 = document.getElementById('assetHealth').getContext('2d');
var myDoughnutChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [65, 5, 10,10,10],
            backgroundColor: [
                normal, 'grey', 'lightgrey', lvl_3, lvl_4
            ]
        }],
        labels: [
            'Normal',            
            'No threshold',
            'No measurements',
            'Warning',
            'Alarm',
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
                text: '65%',
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
            data: [85, 2, 3, 3, 7],
            backgroundColor: [
                normal, lvl_1, lvl_2, lvl_3, lvl_4
            ]
        }],
        labels: [
            'Normal / No report',
            'Warning - 1',
            'Alarm Low - 2',
            'Alarm High - 3',
            'Alarm Critical - 4'
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
                text: '85%',
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

 // Usage
const getDateLabels = () => {
    // Returns an array of dates between the two dates
    let getDates = (startDate, endDate) => {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    let dates = getDates(new Date("1 Nov 2020"), new Date("30 Nov 2020"));  
    let labels = dates;
    labels.forEach((test, index) => {
        let month = test.getMonth();
        let day = test.getDate();
        labels[index] = day + '-' + month + '-2020';
    });
    return labels
}

const targetValue = 100

const createCloudLineChart = (ctx, data, label) => {
    return (
        new Chart(ctx, {
            type: 'line',
            data: { 
                labels: label, //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
                datasets: [{
                    label: 'Savings',
                    data: data,
                    fill: false,
                    borderColor: sMain,
                    lineWidth: 0.1,
                    pointStyle: 'line',
                    lineTension: 0
                }]
            },
            options: {
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            autoSkipPadding: 20
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        ticks: {
                            suggestedMax: targetValue*1.2
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Memory (GB)'
                        }
                    }]
                }
            }
        })
    );
}

const createStorageLineChart = (ctx, data, label) => {
    return (
        new Chart(ctx, {
            type: 'line',
            data: { 
                labels: label, //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
                datasets: [{
                    label: 'Savings',
                    data: data,
                    fill: false,
                    borderColor: pMain,
                    lineWidth: 0.1,
                    pointStyle: 'line',
                    lineTension: 0
                }]
            },
            options: {
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            autoSkipPadding: 20
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        ticks: {
                            suggestedMax: targetValue*1.2
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Memory (GB)'
                        }
                    }]
                }
            }
        })
    );
}

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx1 = document.getElementById('cloudChart').getContext('2d');
    createCloudLineChart(ctx1, data[1], data[0])
})

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx2 = document.getElementById('cloudChart_1').getContext('2d');
    createCloudLineChart(ctx2, data[1], data[0])
})

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx3 = document.getElementById('storageChart').getContext('2d');
    createStorageLineChart(ctx3, data[1], data[0])
})

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx4 = document.getElementById('storageChart_1').getContext('2d');
    createStorageLineChart(ctx4, data[1], data[0])
})