// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Job compliance
let date_range = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let barChartData = {
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
};

data = {
    datasets: [{
        data: [95, 5],
        backgroundColor: [
            pMain
        ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'healthy assets (%)',
        'failing assets (%)'
    ]
};

//donut chart(s)
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
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'healthy assets (%)',
            'failing assets (%)'
        ]
    },
    options: {
        cutoutPercentage: 70,
        responsive: true,
        legend: {
            display: false
        },
        elements: {
            center: {
                text: '95%',
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 50, // Default is 20 (as a percentage)
                minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 10 // Default is 25 (in px), used for when text wraps
            }
        }
    }
});

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
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'healthy assets (%)',
            'failing assets (%)'
        ]
    },
    options: {
        cutoutPercentage: 70,
        responsive: true,
        legend: {
            display: false
        },
        elements: {
            center: {
                text: '82%',
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 50, // Default is 20 (as a percentage)
                minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 10 // Default is 25 (in px), used for when text wraps
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

//Bar plot
let ctx = document.getElementById('jobCompliance').getContext('2d');
let myBar = new Chart(ctx, {
    type: 'horizontalBar',
    data: barChartData,
    options: {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        },
        legend: {
            position: 'bottom'
        }
    }
});

//Line graph
let ctx3 = document.getElementById('taskCompletion').getContext('2d');
let chart3 = new Chart(ctx3, {
    type: 'line',
    data: { 
        labels: date_range,
        datasets: [{
            label: 'Lubrication',
            data: Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            fill: false,
            borderColor: pMain,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            pointStyle: 'line'
            },
            {
            label: "Inspection",
            fill: false,
            borderColor: pMain,
            borderDash: [5,2],
            data: Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            pointStyle: 'line'
        }]
    },
    options: {
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
            xAxes: [{
            }],
            yAxes: [{
                position: 'right'
            }]
        },
        onHover: function(evt) {
            let item = chart3.getElementAtEvent(evt);
            console.log(item);
            if (item.length) {
                console.log("onHover",item, evt.type);
                console.log(">data", item[0]._index, data.datasets[0].data[item[0]._index]);
            }
        }
    }
});

let x = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let t = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));

console.log(x);
console.log(t);

//Line graph
let ctx5 = document.getElementById('deviceActivity').getContext('2d');
let chart5 = new Chart(ctx5, {
    type: 'horizontalBar',
    data: { 
        labels: date_range,
        datasets: [{
            label: 'data',
            data: x,
            fill: true,
            borderColor: pMain,
            pointStyle: 'line'
        },{
            label: 'label',
            data: t,
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