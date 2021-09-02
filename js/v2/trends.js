// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

let normal = "#008b00";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

var sun = new Image();
var moon = new Image();
var earth = new Image();

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
 * @param {*} chartName The chart variable name
 * @param {*} dataInput The new dataset 
 * @param {*} refInput  The new labels
 */
function changeChartData(chartName, data, label) {
    chartName.data.datasets = data;
    chartName.data.labels = label;
    chartName.update();
}

function sortByData(data, labels){

    console.log(data, labels);
    //1) combine the arrays:
    var list = [];
    for (var j = 0; j < data.length; j++) 
        list.push({'value': data[j], 'label': labels[j]});

    //2) sort:
    list.sort(function(a, b) {
        return ((a.value < b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
        //Sort could be modified to, for example, sort on the age 
        // if the name is the same.
    });

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
        data[k] = list[k].value;
        labels[k] = list[k].label;
    }

    return data, labels;
}

// Load row
function loadRow(table_id, data){
    let tableRef = document.getElementById(table_id).getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById(table_id).rows[0].cells.length;

    // Insert a row in the table at the last row
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";

    for(let i = 0; i < rowsCount; i++){
        let newCell  = newRow.insertCell(i);
        newCell.innerHTML = data[i][0];
        newCell.className = "mdc-data-table__cell"
    }
};

//Ascending
function sortTableAscending(col, id) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(id);
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

function sortTableDescending(col, id){
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(id);
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


//onload
function createTable(tableID, data){
    // console.log(data)
    //Generate rows
    for(let i = 0; i < data.length; i++){
        console.log(data[i])
        loadRow(tableID, data[i]);
    };

    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById(tableID).getElementsByTagName('th');
    for(let i = 0; i < columns.length; i++){
        let column = columns[i];
        if(column.classList.contains("hover-icon")){
            column.addEventListener('click', function(event) {
                function sortedToFalse(){
                    for(let i = 0; i < columns.length; i++){
                        if(columns[i] !== column && columns[i].classList.contains('hover-icon')){
                            let otherCol = columns[i];
                            otherCol.setAttribute("data-sorted", "no");
                            let icon = otherCol.children[1];
                            icon.innerHTML = "arrow_upward";
                            icon.style.visibility = "hidden";
                        }
                    };
                };

                let sorted = column.getAttribute("data-sorted");
                if(sorted == "no"){
                    sortTableDescending(i, tableID);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.children[1];
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                } else if(sorted == "desc"){
                    sortTableAscending(i, tableID);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "asc");

                    let icon = column.children[1];
                    icon.innerHTML = "arrow_downward";
                    icon.style.visibility = "visible";
                } else if(sorted == "asc"){
                    sortTableDescending(i, tableID);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.children[1];
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                }
            });
        }
    }
    return;
}

let months = ['January', 'February', 'March', 'April', 'May']
let routeTableData = [];
//Generate rows
for (let i = 0; i < 5; i++) {
    routeTableData[i] = [
        [months[i], false],
        [631, false],
        [Math.floor(Math.random() * 100) + 100, false],
        [Math.floor(Math.random() * 300), false],
        [Math.floor(Math.random() * 150), false],
        [Math.floor(Math.random() * 150), false],
        [Math.floor(Math.random() * 150), false],
    ];
}
console.log('route: ', routeTableData)
createTable('routeTable', routeTableData);



let ids = ['A11', 'A12', 'B12', 'C12', 'C13', 'D12']
let machines = ['Bridle 5.1', 'Bridle 5.2', 'Bridle 6.1', 'Bridle 6.2', 'Bridle 7.1', 'Bridle 7.2']
let facilities = ['KBW', 'KBW','KBW','KBW','KBW','KBW']
let assetOverTimeData = [];

//Generate rows
for (let i = 0; i < 6; i++) {
    assetOverTimeData[i] = [
        [ids[i], false],
        [machines[i], false],
        [facilities[i], false],
        [Math.round(Math.random()), true],
        [Math.round(Math.random()), true],
        [Math.round(Math.random()), true],
        [Math.round(Math.random()), true],
        [Math.round(Math.random()), true]
    ];
}
// createTable('assetOverTime', assetOverTimeData);

//Chart 2: asset health by alarms generated
let ctx4 = document.getElementById('assetHealth').getContext('2d');
var myDoughnutChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [65, 5, 10,20],
            backgroundColor: [
                normal, lvl_2, lvl_4
            ]
        }],
        labels: [
            'Normal',
            'Warning',
            'Alarm',
            'Unknown'
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

/** Chart 2: Completed work over time */
let completedWorkChart = new Promise(resolve => {
    let labels = getDateLabels();
    let data =  [{
        label: 'Assets - no alarm',
        borderColor: 'white',
        borderWidth: 0,
        fill: true,
        backgroundColor: normal,
        // steppedLine: 'middle',
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10 + 100))
        // fill: '-1'
    },{
        label: 'Assets - no threshold/measurement',
        borderColor: 'white',
        borderWidth: 0,
        fill: true,
        // backgroundColor: pMain,
        // steppedLine: 'middle',
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*5))
        // fill: 'origin',
    },{
        label: 'Assets - warning',
        borderColor: 'white',
        borderWidth: 0,
        fill: true,
        backgroundColor: lvl_1,
        // steppedLine: 'middle',
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10))
        // fill: '-2'
    },{
        label: 'Assets - alarm',
        borderColor: 'white',
        borderWidth: 0,
        fill: true,
        backgroundColor: lvl_4,
        // steppedLine: 'middle',
        data: Array.from({length: labels.length}, () => Math.floor(Math.random()*10))
        // fill: '-2'
    }]
    resolve([data, labels])
}).then(data => {
    let ctx = document.getElementById('AssetConditionOverTime').getContext('2d');
    let overTimeChart = new Chart(ctx, {
        type: 'bar',
        data: { 
            labels: data[1],
            datasets: data[0]
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
                    },
                    stacked: true
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                    },
                    position: 'right',
                    ticks: {
                        beginAtZero: false,
                        // stepSize: 1
                        // min: 80
                    },
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Nr. of Assets'
                    }
                }]
            }
        }
    });
})