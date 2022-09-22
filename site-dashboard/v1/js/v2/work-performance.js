// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

let normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

let normal_rgb = "rgba(26, 35, 126, .4)";
    lvl_1_rgb  = "rgba(255, 215, 64, .4)";
    lvl_2_rgb  = "rgba(255, 196, 0, .4)";
    lvl_3_rgb  = "rgba(255, 171, 0, .4)";
    lvl_4_rgb  = "rgba(255, 111, 0, .6)";

// Event listeners
// document.getElementById('button-routes').addEventListener('click', function(event){ window.location.href = "routes.html"});
// document.getElementById('button-tasks').addEventListener('click', function(event){ window.location.href = "tasks.html"});

let ctx1 = document.getElementById('taskCompletion').getContext('2d');
var myDoughnutChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [75, 10, 2, 3, 10],
            backgroundColor: [
                pMain, pLight, lvl_1, lvl_2, lvl_4
            ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Completed (On Time)(%)',
            'Completed (Too Late) (%)',
            'Overdue (%)',
            'Not Completed (With Reason) (%)',
            'Not Completed (No Reason) (%)'
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
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 50, // Default is 20 (as a percentage)
                minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 10 // Default is 25 (in px), used for when text wraps
            }
        }
        // tooltips: {
        //     // mode: 'label',
        //     callbacks: {
        //         label: function(tooltipItem, data) { 
        //             let indice = tooltipItem.index;
        //             return  data.labels[indice] +': '+data.datasets[0].data[indice] + '';
        //         }
        //     }
        // }
    }
});

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
function getDateLabels() {
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

    let dates = getDates(new Date("1 Mar 2015"), new Date("12 May 2015"));  
    let labels = dates
    labels.forEach((test, index) => {
        let month = test.getMonth();
        let day = test.getDate();
        labels[index] = day + '-' + month + '-2020';
    });
    return labels
}

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

//work order compliance per route
let routeDataPromise = new Promise((resolve) => {
    let data = Array.from({length: 12}, () => Math.random() * 100);
    let colours = Array.from({length: 12}, () => pMain)
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
    resolve([data, labels, colours]);
}).then(data => {  
    //Sorts after routeData contains (generated) values
    data[0], data[1] = sortByData(data[0], data[1]);

    //Create bar graph
    let ctx3 = document.getElementById('routeComplianceChart').getContext('2d');
    let routeComplianceChart = horizontalBarChart(ctx3, data[0], data[1], data[2]);
});

//work order compliance per asset
let assetDataPromise = new Promise((resolve) => {
    let data = Array.from({length: 12}, () => Math.random() *  100);
    let colours = Array.from({length: 12}, () => pMain);
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
    resolve([data, labels, colours]);
}).then(data => {  
    //Sorts after routeData contains (generated) values
    data[0], data[1] = sortByData(data[0], data[1]);

    //Create bar graph
    let ctx5 = document.getElementById('assetComplianceChart').getContext('2d');
    let assetComplianceChart = horizontalBarChart(ctx5, data[0], data[1], data[2]);
});

let ctx4, jobComplianceChart;
//Chart: work order compliance per task type
let jobCompliancePromise = new Promise((resolve) => {
    let data_1 = Array.from({length: 6}, () => Math.floor(Math.random() * 15 + 50));
    let data_2 = Array.from({length: 6}, () => Math.floor(Math.random() * 10));
    let data_3 = Array.from({length: 6}, () => Math.floor(Math.random() * 15));
    let data_4 = Array.from({length: 6}, () => Math.floor(Math.random() * 5));
    let data_5 = []
    for (var i = 0;i<data_1.length;i++) {
        data_5.push(100 - data_1[i] - data_2[i] - data_3[i] - data_4[i]) 
    };
  
    let labels = ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'];


    resolve([data_1, data_2, data_3, data_4, data_5, labels]);
}).then(data => {  
    ctx4 = document.getElementById('jobCompliance').getContext('2d');
    jobComplianceChart = new Chart(ctx4, {
        type: 'horizontalBar',
        data: {
            labels: data[5],
            datasets: [{
                label: 'Completed',
                backgroundColor: pMain,
                data: data[0]
            },{
                label: 'Completed (Too Late)',
                backgroundColor: pLight,
                data: data[1]
            }, {
                label: 'Overdue',
                backgroundColor: lvl_1,  
                data: data[2]
            }, {
                label: 'Not Completed (With Reason)',         
                backgroundColor: lvl_3,
                data: data[3]
            },{
                label: 'Not Completed (No Reason)',      
                backgroundColor: lvl_4,
                data: data[4]
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
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    fontSize: 10,
                    // usePointStyle: true
                }
            }
        }
    });
});

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels, colors = pMain){
    let isSelected = false;
    return new Chart(chartElem, {
        type: 'horizontalBar',
        data: { 
            labels: labels,
            datasets: [{
                label: 'N. of tasks executed',
                backgroundColor: colors,
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
                    stacked: true,
                    position: 'left'
                }]
            },
            onHover: function onHover (evt, activeElements) {
                let dataset = this.data.datasets[0];

                if (!isSelected) {
                    if (!activeElements || !activeElements.length) {
                        dataset.backgroundColor.forEach((c, index) => {
                            dataset.backgroundColor[index] = pMain;
                        });
                    } else {
                        let activeIndex = activeElements[0]._index; 
                        let max = this.data.datasets[0].data.length;
                        for (let i = 0; i < max; i += 1) {
                            (i == activeIndex) 
                            ? dataset.backgroundColor[activeIndex] = pMain 
                            : dataset.backgroundColor[i] = "rgb(200, 200, 200)";
                        };
                    }
                };
                this.update();
                return;
            },
            'onClick': function onClick (evt, activeElements) {
                let activeIndex = activeElements[0]._index;
                let dataset = this.data.datasets[0];
                let max = this.data.datasets[0].data.length;
                isSelected = true;

                for (let i = 0; i < max; i += 1) {
                    (i == activeIndex) 
                    ? dataset.backgroundColor[activeIndex] = pMain 
                    : dataset.backgroundColor[i] = "rgb(200, 200, 200)";
                };

                let route_1 = Array.from({length: 6}, () => Math.floor(Math.random() * 85));
                let route_2 = Array.from({length: 6}, () => Math.floor(Math.random() * 10));
                let route_3 = []
                for (let i = 0; i<route_1.length; i++) {
                    route_3.push(100 - route_1[i] - route_2[i])
                };
                changeData(jobComplianceChart, [route_1, route_2, route_3])
                

                this.update();
            }
        }
    });
};

function changeData (chart, data) {
    chart.data.datasets.forEach((dataset, index) => {
        dataset.data = data[index];
    });
    chart.update();
}


function lineChart (chartElem, data, labels) {
    return new Chart(chartElem, {
        type: 'line',
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
                    boxWidth: 20,
                    fontSize: 10,
                    // usePointStyle: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0,  // disables bezier curves
                    borderWidth: 1
                },
                point: {
                    radius: 0    //hide data point indicators
                }
            },
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
                        minRotation: 0,
                        minorTick: {
                            fontSize: 7
                        }
                    }
                }],
                yAxes: [{
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                        // stepSize: 1
                    },
                    stacked: false,
                    gridLines: {
                        display: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Nr. of Jobs'
                    }
                }]
            }
        }
    });
}

let ctx11 = document.getElementById('workPerAssetChart').getContext('2d');
let workPerAssetChart = new Chart(ctx11, {
    type: 'bar',
    data: { 
        labels: ['Total', 'No Reason', 'Shutdown', 'Inaccessible', 'Covid', 'Other'],
        datasets: [{
            label: 'Jobs',
            borderColor: pMain,
            backgroundColor: pMain,
            data: Array.from({length: 6}, () => Math.round(Math.random()*20)),
            fill: 'origin',
        }]
    },
    options: {
        legend: {
            display: false,
            position: 'right',
            align: 'end',
            labels: {
                boxWidth: 20,
                fontSize: 10,
                // usePointStyle: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0,  // disables bezier curves
                borderWidth: 1
            },
            point: {
                radius: 0    //hide data point indicators
            }
        },
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
                    minRotation: 0,
                    minorTick: {
                        fontSize: 7
                    }
                }
            }],
            yAxes: [{
                position: 'right',
                ticks: {
                    beginAtZero: true,
                },
                stacked: false,
                scaleLabel: {
                    display: true,
                    labelString: 'Nr. of Jobs'
                },
                gridLines: {
                    display: true,
                }
            }]
        }
    }
});

/** Chart 2: Completed work over time */
let generatedWorkChart = new Promise(resolve => {
    let labels = getDateLabels();
    let data =  [{
        label: 'Generated (Scheduled)',
        borderColor: pMain,
        borderWidth: 2,
        fill: false,
        backgroundColor: pMain,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*20 + 30))
    },{
        label: 'Generated (Ad-hoc)',
        borderColor: pLight,
        borderWidth: 2,
        fill: false,
        backgroundColor: pLight,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10))
    },{
        label: 'Open (In Time)',
        borderColor: 'lightgrey',
        borderWidth: 2,
        fill: false,
        backgroundColor: 'lightgrey',
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10 + 30))
    },{
        label: 'Open (Overdue)',
        borderColor: lvl_1,
        borderWidth: 2,
        fill: false,
        backgroundColor: lvl_1,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10))
    }
]
    resolve([data, labels])
}).then(data => {
    let ctx = document.getElementById('generatedWorkChart').getContext('2d');
    let generatedWorkChart = lineChart(ctx, data[0], data[1])
})

/** Chart 2: Completed work over time */
let completedWorkChart = new Promise(resolve => {
    let labels = getDateLabels();
    let data =  [{
        label: 'Completed (On Time)',
        borderColor: pMain,
        borderWidth: 2,
        fill: false,
        backgroundColor: pMain,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*20 + 30))
    },{
        label: 'Completed (Too Late)',
        borderColor: pLight,
        borderWidth: 2,
        fill: false,
        backgroundColor: pLight,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*20))
    },{
        label: 'Not Completed (Reason)',
        borderColor: lvl_3,
        borderWidth: 2,
        fill: false,
        backgroundColor: lvl_3,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*20))
    },{
        label: 'Not Completed (No Reason)',
        borderColor: lvl_4,
        borderWidth: 2,
        fill: false,
        backgroundColor: lvl_4,
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10))
    }
]
    resolve([data, labels])
}).then(data => {
    let ctx2 = document.getElementById('completedWorkChart').getContext('2d');
    let completedWorkChart = lineChart(ctx2, data[0], data[1])
})


//Chart 5: Level of Completed and Not Completed Work per Asset 
let completedWorkAssetChart = new Promise((resolve) => {
    let data_1 = Array.from({length: 6}, () => Math.floor(Math.random() * 50));
    let data_2 = Array.from({length: 6}, () => Math.floor(Math.random() * 10));
    let data_3 = Array.from({length: 6}, () => Math.floor(Math.random() * 15));
    let data_4 = Array.from({length: 6}, () => Math.floor(Math.random() * 5));
    let data_5 = Array.from({length: 6}, () => Math.floor(Math.random() * 5));
  
    let labels = ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'];


    resolve([data_1, data_2, data_3, data_4, data_5, labels]);
    // resolve([data, labels])
}).then(data => {   
    let ctx6 = document.getElementById('executedWorkChart').getContext('2d');
    let executedWorkChart = new Chart(ctx6, {
        type: 'horizontalBar',
        data: {
            labels: data[5],
            datasets: [{
                label: 'Completed',
                backgroundColor: pMain,
                data: data[0]
            },{
                label: 'Completed (Too Late)',
                backgroundColor: pLight,
                data: data[1]
            }, {
                label: 'Overdue',
                backgroundColor: lvl_1,  
                data: data[2]
            }, {
                label: 'Not Completed (With Reason)',         
                backgroundColor: lvl_3,
                data: data[3]
            },{
                label: 'Not Completed (No Reason)',      
                backgroundColor: lvl_4,
                data: data[4]
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
                        // callback: function(value, index, values) {
                        //     return value + '%';
                        // }
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    fontSize: 10,
                    // usePointStyle: true
                }
            }
        }
    });
});