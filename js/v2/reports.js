// Color scheme
let pMain = "#1a237e";
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Job compliance
let date_range = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//Chart 2: asset health by alarms generated
let ctx4 = document.getElementById('assetHealth').getContext('2d');
var myDoughnutChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
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


//Chart 6: asset Iot alarms
let ctx2 = document.getElementById('reportItems').getContext('2d');
let reportItems = new Chart(ctx2, {
    type: 'horizontalBar',
    data: { 
        labels: ['Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x'],
        datasets: [{
            label: 'Alarms',
            data: Array.from({length: 9}, () => Math.floor(Math.random() * 40)),
            fill: true,
            backgroundColor: pMain,
            pointStyle: 'line'
        }], 
    },
    options: {
        legend: {
            display: false,
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
        }
    }
});

//Chart 6: asset Iot alarms
let ctx3 = document.getElementById('reportCriticality').getContext('2d');
let reportCriticality = new Chart(ctx3, {
    type: 'horizontalBar',
    data: { 
        labels: ['Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x'],
        datasets: [{
            label: 'Alarms',
            data: Array.from({length: 9}, () => Math.floor(Math.random() * 6)),
            fill: true,
            backgroundColor: pMain,
            pointStyle: 'line'
        }], 
    },
    options: {
        legend: {
            display: false,
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
        }
    }
});

/**
 * Table 
 */
function loadRow(){
    let tableRef = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById('routeTable').rows[0].cells.length;

    // Insert a row in the table at the last row
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";

    let data = [
        ['Report ' + Math.floor(Math.random() * 20).toString(), false],
        ['Equipment ' + Math.floor(Math.random() * 20), false],
        ['Person ' + Math.floor(Math.random() * 20), false],
        [
            '<button class="mdc-icon-button material-icons">mail_outline</button>', 
            false
        ]
    ];

    for(let i = 0; i < rowsCount; i++){
        let newCell  = newRow.insertCell(i);
        newCell.innerHTML = data[i][0];

        if(data[i][1] == true){
            newCell.className = "mdc-data-table__cell mdc-data-table__cell--numeric"
        } else {
            newCell.className = "mdc-data-table__cell"
        }
    }

    newRow.children[3].addEventListener('click', function() {
        window.open("mailto:test@example.com");
    })
};

//onload
function createTable(){
    //Generate rows
    for(let i = 0; i < 8; i++){
        loadRow();
    };

    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById('routeTable').getElementsByTagName('th');
    for(let i = 0; i < columns.length; i++){
        let column = columns[i];
        if(column.classList.contains("hover-icon")){
            column.addEventListener('click', function(event) {
                function sortedToFalse(){
                    for(let i = 0; i < columns.length; i++){
                        if(columns[i] !== column && columns[i].classList.contains('hover-icon')){
                            let otherCol = columns[i];
                            otherCol.setAttribute("data-sorted", "no");
                            let icon = otherCol.firstChild;
                            icon.innerHTML = "arrow_upward";
                            icon.style.visibility = "hidden";
                        }
                    };
                };

                let sorted = column.getAttribute("data-sorted");
                if(sorted == "no"){
                    sortTableDescending(i);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                } else if(sorted == "desc"){
                    sortTableAscending(i);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "asc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_downward";
                    icon.style.visibility = "visible";
                } else if(sorted == "asc"){
                    sortTableDescending(i);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                }
            });
        }
    }

    //Add eventlisteners to each row
    // let tableRows = document.querySelectorAll('#routeTable-body tr');
    // let start = document.getElementById('pre-route-insight');
    // let insight = document.getElementById('route-insight');

    // tableRows.forEach(e => e.addEventListener("click", function() {
    //     console.log(e)
    //     // Here, `this` refers to the element the event was hooked on
    //     tableRows.forEach(row => { 
    //         if(row === e){
    //             if(row.style.backgroundColor == "rgb(150, 156, 224)" ){
    //                 row.style.backgroundColor = "white";
    //                 start.style.display = 'none';
    //                 insight.style.display = 'block';
    //             } else {
    //                 row.style.backgroundColor = "rgb(150, 156, 224)";  
    //                 start.style.display = 'none';
    //                 getRouteInsight();
    //                 insight.style.display = 'block';
    //             }
    //         } else {
    //             row.style.backgroundColor = "white";
    //         }
    //     });
    // }));
    return;
}
createTable();

//Ascending
function sortTableAscending(col) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("routeTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];

            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortTableDescending(col){
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("routeTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function stackedBarChart(chart, data, labels, usePerc = false) {
    return new Chart(chart, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: data
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
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            if (usePerc) { 
                                return value + '%';
                            } else {
                                return value;
                            }
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
}

//Type of report
let reportTypeChart = new Promise((resolve) => {
    let data = [{
        label: 'Lvl 4',
        backgroundColor: pDark,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 3))
    }, {
        label: 'Lvl 3',
        backgroundColor: pMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Lvl 2',
        backgroundColor: pLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Lvl 1',
        backgroundColor: sMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Normal',
        backgroundColor: sLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }];
    let labels = ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'];


    resolve([data, labels]);
}).then(result => {  
    let ctx4 = document.getElementById('reportTypeChart').getContext('2d');
    let reportTypeChart = stackedBarChart(ctx4, result[0], result[1])
});

//Type of report
let criticalPromise = new Promise((resolve) => {
    let data = [{
        label: 'Lvl 4',
        backgroundColor: pDark,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 3))
    }, {
        label: 'Lvl 3',
        backgroundColor: pMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Lvl 2',
        backgroundColor: pLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Lvl 1',
        backgroundColor: sMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Normal',
        backgroundColor: sLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }];
    let labels = ['Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x'];
    resolve([data, labels]);
}).then(result => {  
    let ctx = document.getElementById('criticalAssetChart').getContext('2d');
    let reportTypeChart = stackedBarChart(ctx, result[0], result[1])
});

//Type of report
let typePromise = new Promise((resolve) => {
    let data = [{
        label: 'Thermographic',
        backgroundColor: pDark,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 3))
    }, {
        label: 'Vibration',
        backgroundColor: pMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Process',
        backgroundColor: pLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Inspection',
        backgroundColor: sMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Lubrication',
        backgroundColor: sLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }, {
        label: 'Other',
        backgroundColor: sLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 5))
    }];
    let labels = ['Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x', 'Asset x'];
    resolve([data, labels]);
}).then(result => {  
    let ctx = document.getElementById('typeAssetChart').getContext('2d');
    let reportTypeChart = stackedBarChart(ctx, result[0], result[1])
});