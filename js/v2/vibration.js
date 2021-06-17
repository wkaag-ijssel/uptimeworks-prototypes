// Color scheme
const pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

const normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

// Job compliance
const date_range = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
let ctx1 = document.getElementById('todayStatus').getContext('2d');
var myDoughnutChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [65, 5, 10,20],
            backgroundColor: [
                pMain, lvl_3, lvl_4
            ]
        }],
        labels: [
            'Normal',
            'Warning',
            'Alarm',
            'No threshold/measurement'
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

//Chart 5: Job Compliance per Task Type
let ctx2 = document.getElementById('monthStatus').getContext('2d');
var myDoughnutChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [75, 10, 10,5],
            backgroundColor: [
                pMain, lvl_3, lvl_4
            ]
        }],
        labels: [
            'Normal',
            'Warning',
            'Alarm',
            'No threshold/measurement'
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
                text: '75%',
                fontStyle: 'Arial', 
                sidePadding: 50,    
                minFontSize: 10,    
                lineHeight: 10    
            }
        }
    }
});

//Chart 5: Job Compliance per Task Type
let ctx3 = document.getElementById('threeMonthStatus').getContext('2d');
var myDoughnutChart = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [95, 1, 3, 1],
            backgroundColor: [
                pMain, lvl_3, lvl_4
            ]
        }],
        labels: [
            'Normal',
            'Warning',
            'Alarm',
            'No thres./mes.'
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



const targetValue = 100

//Chart 7: Transaction costs 
let accChartPromise = new Promise((resolve) => {
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

        let dates = getDates(new Date("1 May 2021"), new Date("14 Jun 2021"));  
        let labels = dates;
        labels.forEach((test, index) => {
            let month = test.getMonth() + 1;
            let day = test.getDate();
            labels[index] = day + '-' + month + '-2021';
        });
        return labels
    }

    let date = getDateLabels();
    let avg = Array.from({length: date.length}, () => Math.floor((Math.random()*10)+ 10));
    let max = Array.from({length: date.length}, () => Math.floor((Math.random()*10)+ 20));
    let min = Array.from({length: date.length}, () => Math.floor((Math.random()*10)));

    resolve([date, avg, max, min]);
}).then(data => {
    let ctx7 = document.getElementById('accelerationChart').getContext('2d');
    let chart7 = new Chart(ctx7, {
        type: 'line',
        data: { 
            labels: data[0], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'mean',
                data: data[1],
                fill: false,
                borderColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0
            },{
                label: 'max',
                data: data[2],
                fill: false,
                borderColor: 'grey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0
            },{
                label: 'min',
                data: data[3],
                fill: false,
                borderColor: 'lightgrey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: true,
                position: "right",
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
                mode: 'index'
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
                    position: 'left',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'g RMS',
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10
                    }
                }]
            }
        }
    }); 
})


//Chart 7: Transaction costs 
let velChartPromise = new Promise((resolve) => {
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

        let dates = getDates(new Date("1 May 2021"), new Date("14 Jun 2021"));  
        let labels = dates;
        labels.forEach((test, index) => {
            let month = test.getMonth() + 1;
            let day = test.getDate();
            labels[index] = day + '-' + month + '-2021';
        });
        return labels
    }

    let date = getDateLabels();
    let avg = Array.from({length: date.length}, () => Math.floor((Math.random()*10)+ 10));
    let max = Array.from({length: date.length}, () => Math.floor((Math.random()*10)+ 20));
    let min = Array.from({length: date.length}, () => Math.floor((Math.random()*10)));

    resolve([date, avg, max, min]);
}).then(data => {
    let ctx4 = document.getElementById('velocityChart').getContext('2d');
    let chart4 = new Chart(ctx4, {
        type: 'line',
        data: { 
            labels: data[0], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'mean',
                data: data[1],
                fill: false,
                borderColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
            },{
                label: 'max',
                data: data[2],
                fill: false,
                borderColor: 'grey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
            },{
                label: 'min',
                data: data[3],
                fill: false,
                borderColor: 'lightgrey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
            }]
        },
        options: {
            legend: {
                display: true,
                position: "right",
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
                mode: 'index'
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
                    position: 'left',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'mm/s',
                    }
                }]
            }
        }
    }); 
})

new Promise((resolve) => {
    const labels = ['Asset 1', 'Asset 2', 'Asset 3', 'Asset 4', 'Asset 5'];
    const data = [0.1, 0.18, 0.22, 0.25, .4];

    resolve([data, labels]);
}).then(data => {
    let ctx5 = document.getElementById('badActorsChart').getContext('2d');
    let chart5 = new Chart(ctx5, {
        type: 'horizontalBar',
        data: { 
            labels: data[1], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                data: data[0],
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                backgroundColor: pMain
            }]
        },
        options: {
            legend: {
                display: false,
                position: "right",
                labels: {
                    usePointStyle: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'g RMS',
                    }
                }],
            },
        },
    }); 
})