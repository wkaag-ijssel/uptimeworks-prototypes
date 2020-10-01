// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Event listeners
// document.getElementById('button-routes').addEventListener('click', function(event){ window.location.href = "routes.html"});
// document.getElementById('button-tasks').addEventListener('click', function(event){ window.location.href = "tasks.html"});

function doughnutChart(ct, data) {
    return new Chart(ct, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    pMain,
                    '#fdd835',
                    '#f44336'
                ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Active',
                'Warning',
                'Error',
                'Not used'
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
                    fontStyle: 'Arial', // Default is Arial
                    sidePadding: 50, // Default is 20 (as a percentage)
                    minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
                    lineHeight: 10 // Default is 25 (in px), used for when text wraps
                }
            }
        }
    });
}

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

let ctx = document.getElementById('uBridgeChart').getContext('2d');
let ctx1 = document.getElementById('uMoteChart').getContext('2d');
let ctx2 = document.getElementById('uClipChart').getContext('2d');
let ctx3 = document.getElementById('otherChart').getContext('2d');

// run the scripts
let ctxChart = doughnutChart(ctx, [60, 0, 20, 20]);
let ctx2Chart = doughnutChart(ctx1, [80, 15, 5, 0]);
let ctx3Chart = doughnutChart(ctx2, [90, 0, 0, 10]);
let ctx4Chart = doughnutChart(ctx3, [100, 0, 0, 0]);

function loadRow(){
    let tableRef = document.getElementById('deviceTable').getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById('deviceTable').rows[0].cells.length;

    // Insert a row in the table at the last row
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";

    let data = [
        ['Device ' + Math.floor(Math.random() * 20).toString(), false],
        [Math.floor(Math.random() * 150), true],
        [Math.floor(Math.random() * 7), true],
        [Math.floor(Math.random() * 160), true]
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
};

//onload
function createTable(){
    //Generate rows
    for(let i = 0; i < 10; i++){
        loadRow();
    };
    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById('deviceTable').getElementsByTagName('th');
    for(let i = 0; i < columns.length; i++){
        let column = columns[i];
        console.log(column)
        if(column.classList.contains("hover-icon")){
            column.addEventListener('click', function(event) {
                console.log('test');
                function sortedToFalse() {
                    console.log('sortedToFalse')
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
    return;
}
createTable();

//Ascending
function sortTableAscending(col) {
    console.log('ascending')
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("deviceTable");
    switching = true;

    console.log(col);
    while (switching) {
        switching = false;
        rows = table.rows;
        console.log(rows.length);
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

//Descending
function sortTableDescending(col) {
    console.log('descending')
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("deviceTable");
    switching = true;

    console.log(col);
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];
            console.log('switch?')
            console.log(x.innerHTML);
            console.log(y.innerHTML);
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

// Returns an array of dates between the two dates
let getDates = function(startDate, endDate) {
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
  
// Usage
let labels = []
let dates = getDates(new Date("1 Mar 2015"), new Date("12 May 2015"));   
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]; 
let monthNum = 0                                                                                                       
dates.forEach(function(date, index) {
    let month = date.getMonth();
    let day = date.getDate();

    if(month !== monthNum){
        labels[index] = [date.getDate(), monthNames[month]];
        monthNum = month;
    } else if(day == 5 || day == 10 || day == 15 || day == 20 || day == 25){
        labels[index] = [date.getDate(), ""];
    } else {
        labels[index] = ["", ""];
    }
});

/** Chart 2: Completed work over time */
let ctx4 = document.getElementById('workLoadChart').getContext('2d');
let resourcesChart = new Chart(ctx4, {
    type: 'bar',
    data: { 
        labels: labels,
        datasets: [{
            label: 'Readings',
            type: 'line',
            borderColor: pMain,
            fill: false,
            backgroundColor: pMain,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: labels.length}, () => Math.random()*10 + 40)
        },{
            label: 'Report items',
            // type: 'bar',
            borderColor: pMain,
            fill: false,
            backgroundColor: pMain,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: Array.from({length: labels.length}, () => Math.random()*5)
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
                borderWidth: 1
            },
            point:{
                radius: 0 //hide data point indicators
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
                    autoSkip: false,
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
                    beginAtZero: true
                }
            }]
        }
    }
});

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

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels){
    return new Chart(chartElem, {
        type: 'horizontalBar',
        data: { 
            labels: labels,
            datasets: [{
                label: 'N. of tasks executed',
                backgroundColor: pMain,
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
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    position: 'left'
                }]
            }
        }
    });
};

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
                        min: 0,
                        max: 100,
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


//Malfunctions per uBridge
let malfunctionChartPromise = new Promise((resolve) => {
    let data = [{
        label: 'Normal',
        backgroundColor: pMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 85))
    }, {
        label: 'Full',
        backgroundColor: pLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 10))
    }];
    let labels = ['Lubrication', 'Inspection', 'Process', 'Vibration', 'Thermographic', 'Other'];


    resolve([data, labels]);
}).then(result => {  
    let ctx4 = document.getElementById('malfunctionChart').getContext('2d');
    let malfunctionChart = stackedBarChart(ctx4, result[0], result[1], true)
});

//Normal and Full Reading
let normalFullChartPromise = new Promise((resolve) => {
    let data = [{
        label: 'Normal',
        backgroundColor: pMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 85))
    }, {
        label: 'Full',
        backgroundColor: pLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 10))
    }];
    let labels = ['device x', 'device x', 'device x', 'device x', 'device x', 'device x'];
    resolve([data, labels]);
}).then(result => {  
    let ctx8 = document.getElementById('normalFullChart').getContext('2d');
    let normalFullChart = stackedBarChart(ctx8, result[0], result[1])
});

//Alarm and Report
let alarmReportChartPromise = new Promise((resolve) => {
    let data = [{
        label: 'Alarm',
        backgroundColor: pMain,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 85))
    }, {
        label: 'Report',
        backgroundColor: pLight,
        data: Array.from({length: 6}, () => Math.floor(Math.random() * 10))
    }];
    let labels = ['Device x', 'Device x', 'Device x', 'Device x', 'Device x', 'Device x'];


    resolve([data, labels]);
}).then(result => { 
    console.log(result);
    let ctx10 = document.getElementById('alarmReportChart').getContext('2d');
    let normalFullChart = stackedBarChart(ctx10, result[0], result[1])
});