// Color scheme
let pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

let normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

// Job compliance
let date_range = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Event listeners
// document.getElementById('button-work-performance').addEventListener('click', function(event){ window.location.href = "work-performance.html"});
// document.getElementById('button-finance-summary').addEventListener('click', function(event){ window.location.href = "financial.html"})
// document.getElementById('button-alarms').addEventListener('click', function(event){ window.location.href = "alarms.html"});
// document.getElementById('button-reports').addEventListener('click', function(event){ window.location.href = "reports.html"});
 
// Labels
// let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
// let date_range = [];
// for(let i = 0; i<52; i += 1){
//     date_range[i] = i+1;
// };
let past = .75
let future = 1 - past

// Dummy data
let workorders = Array.from({length: date_range.length * past}, () => Math.floor(Math.random() * 40) + 30);
let readings = Array.from({length: date_range.length * past}, () => Math.floor(Math.random() * 300) + 700);
let reports = Array.from({length: date_range.length * past}, () => Math.floor(Math.random() * 10) + 25);
let totalCosts = Array.from({length: date_range.length * past}, () => Math.floor(Math.random() * 30));
let data = [workorders, readings, reports, totalCosts]

// Dummy thresholds / references
let _workorders = workorders.concat(Array.from({length: date_range.length * future}, () => Math.floor(Math.random() * 40)));
let _readings = readings.concat(Array.from({length: date_range.length * future}, () => 30));
let _reports = reports.concat(Array.from({length: date_range.length * future}, () => Math.floor(Math.random() * 20)));


// Workorder data
let workorders_data = [{
    label: 'total',
    data: workorders,
    fill: false,
    borderColor: pMain,
    backgroundColor: pMain,
    order: 1
},{
    label: "total",
    type: 'line',
    // steppedLine: 'middle',
    fill: false,
    borderColor: pLight,
    borderDash: [5,2],
    data: _workorders,
    order: 2
},{
    label: 'lubrication',
    data: readings,
    fill: false,
    borderColor: pMain,
    backgroundColor: pMain,
    order: 1
},{
    label: "lubrication",
    type: 'line',
    // steppedLine: 'middle',
    fill: false,
    borderColor: pLight,
    borderDash: [5,2],
    data: _readings,
    order: 2
},{
    label: 'Inspection',
    data: reports,
    fill: false,
    borderColor: pMain,
    backgroundColor: pMain,
    order: 1
},{
    label: "Inspection",
    type: 'line',
    // steppedLine: 'middle',
    fill: false,
    borderColor: pLight,
    borderDash: [5,2],
    data: _reports,
    order: 2
},];

// 
let readings_data = [{
    label: 'n. of workorders',
    data: readings,
    fill: false,
    borderColor: pMain,
    backgroundColor: pMain,
    order: 1
},{
    label: "Last year",
    type: 'line',
    // steppedLine: 'middle',
    fill: false,
    borderColor: pLight,
    borderDash: [5,2],
    data: _readings,
    order: 2
},];

let reports_data = [{
    label: 'n. of workorders',
    data: reports,
    fill: false,
    borderColor: pMain,
    backgroundColor: pMain,
    order: 1
},{
    label: "Last year",
    type: 'line',
    // steppedLine: 'middle',
    fill: false,
    borderColor: pLight,
    borderDash: [5,2],
    data: _reports,
    order: 2
},]

let ref = [_workorders, _readings, _reports]; 
let tabs = document.getElementsByClassName('tablinks');
let dataMetric = document.getElementsByClassName('tab-metric');
let dataDiff = document.getElementsByClassName('percentage-value');

// Initialize line graph
for (i = 0; i<dataMetric.length; i++) {
    let dataSum = data[i].reduce((a, b) => a + b, 0);
    dataMetric[i].innerHTML += dataSum;
}


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
            data: [85, 5, 10],
            backgroundColor: [
                pMain, lvl_3, lvl_4
            ]
        }],
        labels: [
            'Normal',
            'Warning',
            'Alarm'
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
let costsChartPromise = new Promise((resolve) => {
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

        let dates = getDates(new Date("14 Oct 2020"), new Date("14 Jan 2021"));  
        let labels = dates;
        labels.forEach((test, index) => {
            let month = test.getMonth();
            let day = test.getDate();
            labels[index] = day + '-' + month + '-2020';
        });
        return labels
    }

    let date = getDateLabels();
    let savings = Array.from({length: date.length}, () => Math.floor(Math.random() * 30));
    let target = Array.from({length: date.length}, () => Math.floor(Math.random() * 120));

    resolve([target, date, savings]);
}).then(data => {
    let ctx7 = document.getElementById('transactionSumChart').getContext('2d');
    let chart7 = new Chart(ctx7, {
        type: 'line',
        data: { 
            labels: data[1], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'Accelaration',
                data: data[2],
                fill: false,
                borderColor: pMain,
                borderWidth: 0.7,
                pointStyle: 'line',
                lineTension: 0,
                yAxisID: 'A'
            },{
                label: 'Velocity',
                data: data[0],
                fill: false,
                borderColor: sMain,
                borderWidth: 0.7,
                pointStyle: 'line',
                lineTension: 0,
                yAxisID: 'B'
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
                    id: 'A',
                    position: 'left',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: '⎯⎯ Accelaration (g RMS)',
                        fontColor: pMain
                    }
                },{
                    id: 'B',
                    position: 'right',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: '⎯⎯ Velocity (mm/s)',
                        fontColor: sMain
                    }
                }]
            }
        }
    }); 
})