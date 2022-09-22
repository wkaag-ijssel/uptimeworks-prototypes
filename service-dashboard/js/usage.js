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

const showCustomOptions = (value) => {
    const extraOptionsElement = document.getElementById("menu-options-custom");
    const extraOptions = value == "Custom" ? `
        <div class="menu-option">
            <p class="menu-option-title">Selected Data</p>

            <p class="menu-option-sub-title">Chart 1</p>
            <select id="service-period" name="service-period">
                <option value="CdM">Asset Health by Reports Issued</option>
                <option value="Reports">Asset Health by CdM</option>
                <option value="Overdue">Job Compliance</option>
            </select>
            <p class="menu-option-sub-title margin-top-10">Chart 2</p>
            <select id="service-period" name="service-period">
                <option value="Overdue">Job Compliance</option>
                <option value="CdM">Asset Health by Reports Issued</option>
                <option value="Reports">Asset Health by CdM</option>
            </select>
            <p class="menu-option-sub-title margin-top-10">Trend</p>
            <select id="service-period" name="service-period">
                <option value="Overdue">Total Overdue Jobs per Day</option>
                <option value="today">Generated Jobs per Day</option>
                <option value="today">Not Completed Jobs per Day</option>
            </select>
        </div>
        <div class="menu-option">
            <button>Save as Default</button>
            <span title="Restore default" class="dashboard-icon-button"><i class="fas fa-redo-alt"></i></span>
        </div>` : "";
    extraOptionsElement.innerHTML = extraOptions;
}

const showSelectedView = (value) => {
    const customView = document.getElementById("customViewExample");
    const databaseView = document.getElementById("databaseViewExample");
    const workView = document.getElementById("workViewExample");
    const reportView = document.getElementById("reportViewExample");

    customView.style.display = value == "Custom" ? "block" : "none";
    databaseView.style.display = value == "Database" ? "block" : "none";
    workView.style.display = value == "Work" ? "block" : "none";
    reportView.style.display = value == "Reports" ? "block" : "none";
    return;
};

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

        // Change template
        const element = document.getElementById("service-template");
        element.addEventListener("change", (event) => {
            const { value } = event.target;
            showCustomOptions(value);
            showSelectedView(value);
        });

        showCustomOptions(element.value);
        showSelectedView(element.value);
    });

const createLineChart = (ctx, data, label) => {
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
                        position: 'left',
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

const createDoughnutChart = (chart, data, labels, colors, text) => {
    return new Chart(chart, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: colors
            }],
            labels: labels
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
                    text: text,
                    fontStyle: 'Arial', 
                    sidePadding: 50, 
                    minFontSize: 10, 
                    lineHeight: 10 
                }
            },            
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                label: function(tooltipItems, data) { 
                    const index = tooltipItems.index
                    return ` ${data.datasets[0].data[index]} Assets`;
                },
                title: function(tooltipItems, data) {
                    const index = tooltipItems[0].index
                    return `${data.labels[index]}`
                }
                },
                caretSize: 4,
                titleFontSize: 10,
                bodyFontSize: 10,
                xPadding: 10,
                yPadding: 10,
                cornerRadius: 2,
                titleMarginBottom: 2,
            },
        }
    })
}

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

const dates = getDateLabels();
const targetValue = 100

//SITE 1//
const h_1 = document.getElementById('health_1').getContext('2d');
createDoughnutChart(
    chart=h_1, 
    data=[65, 5, 10,10,10], 
    labels=[
        'Normal',            
        'No threshold',
        'No measurements',
        'Warning',
        'Alarm',
    ],
    colors=[normal, 'grey', 'lightgrey', lvl_3, lvl_4],
    text="65%"
    )

const j_1 = document.getElementById('job_1').getContext('2d');
createDoughnutChart(
    chart=j_1,
    data=[85, 2, 3, 3, 7], 
    labels=[
        'Normal / No report',
        'Warning - 1',
        'Alarm Low - 2',
        'Alarm High - 3',
        'Alarm Critical - 4'
    ],
    colors=[pMain, lvl_1, lvl_2, lvl_3, lvl_4],
    text="85%"
)

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;
 
    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
 }).then(data => {
    const t_1 = document.getElementById('trend_1').getContext('2d');
    createLineChart(t_1, data[1], data[0])
 })


//SITE 2//
const h_2 = document.getElementById('health_2').getContext('2d');
createDoughnutChart(
    chart=h_2, 
    data=[65, 5, 10,10,10], 
    labels=[
        'Normal',            
        'No threshold',
        'No measurements',
        'Warning',
        'Alarm',
    ],
    colors=[normal, 'grey', 'lightgrey', lvl_3, lvl_4],
    text="65%"
    )

const j_2 = document.getElementById('job_2').getContext('2d');
createDoughnutChart(
    chart=j_2,
    data=[85, 2, 3, 3, 7], 
    labels=[
        'Normal / No report',
        'Warning - 1',
        'Alarm Low - 2',
        'Alarm High - 3',
        'Alarm Critical - 4'
    ],
    colors=[pMain, lvl_1, lvl_2, lvl_3, lvl_4],
    text="85%"
)
new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;
 
    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
 }).then(data => {
    const t_2 = document.getElementById('trend_2').getContext('2d');
    createLineChart(t_2, data[1], data[0])
 })

//SITE 3
const j_4 = document.getElementById('job_4').getContext('2d');
createDoughnutChart(
    chart=j_4,
    data=[85, 2, 3, 3, 7], 
    labels=[
        'Normal / No report',
        'Warning - 1',
        'Alarm Low - 2',
        'Alarm High - 3',
        'Alarm Critical - 4'
    ],
    colors=[pMain, lvl_1, lvl_2, lvl_3, lvl_4],
    text="85%"
)

//SITE 4
const h_5 = document.getElementById('health_5').getContext('2d');
createDoughnutChart(
    chart=h_5,
    data=[85, 2, 3, 3, 7], 
    labels=[
        'Normal / No report',
        'Warning - 1',
        'Alarm Low - 2',
        'Alarm High - 3',
        'Alarm Critical - 4'
    ],
    colors=[normal, lvl_1, lvl_2, lvl_3, lvl_4],
    text="85%"
)

const t_5 = document.getElementById("trend_5").getContext("2d");
new Chart(t_5, {
    type: 'bar',
    data: { 
        labels: dates,
        datasets: [{
            label: 'Reports',
            data: Array.from({length: dates.length}, () => Math.floor(Math.random() * 2)),
            fill: true,
            backgroundColor: pMain,
            pointStyle: 'line'
        }], 
    },
    options: {
        legend: {
            display: false,
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                stacked: false,
                ticks: {
                    maxTicksLimit: 15,
                    autoSkip: true, //!important
                    maxRotation: 0, 
                    minRotation: 0
                }
            }],
            yAxes: [{                
                position: 'left',
                stacked: false,
                scaleLabel: {
                    display: true,
                    labelString: 'Reports'
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                    suggestedMax: 5
                }
            }]
        }
    }
});

//SITE 6


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