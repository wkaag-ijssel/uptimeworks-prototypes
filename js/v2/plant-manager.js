// Color scheme
const pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

const normal = "#008b00";
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

const createDoughnutChart = (chartID, data, labels, colors) => {
  return new Chart(chartID, {
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
                text: '65%',
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
  });
}

const charts = {}
const assets = ['KBW', 'TSP', 'Very Long AssetName', 'Verrrry Loong Asset Nameeee', 'Test']

const statusOverviewElement = document.getElementById("status-overview");

new Promise((resolve) => {
  for (let i = 0; i < 5; i++ ) {
    const chartName = `chart_${i}`
    const asset = assets[i]
  
    // Create html element
    statusOverviewElement.innerHTML += `
    <div class="branch-status-box" style="width: 150px; height: 150px;">
      <div class="branch-status-title">
          <span data-title=${asset}><h6 class="text-with-dots">${asset}</h6></span>
      </div>
      <div class="branch-status-chart" style="width: 100px; height: 100px;">
          <canvas id=${chartName}></canvas>
      </div>
    </div>`
  }

  resolve()
}).then(() => {
  for (let i = 0; i < 5; i++ ) {
    const chartName = `chart_${i}`

    // Create the chart
    charts[chartName] = document.getElementById(chartName).getContext('2d');
    createDoughnutChart(
        chartID=charts[chartName], 
        data=[65, 5, 10,20], 
        labels=['Normal','Warning','Alarm','No Status'],
        colors=[normal, lvl_3, lvl_4]
    )
  }
})
