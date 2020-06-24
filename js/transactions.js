// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Labels
// let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
let date_range = [];
for(let i = 0; i<52; i += 1){
    date_range[i] = i+1;
};

// Dummy data
let workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let readings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 20));
let totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 30));
data = [workorders, readings, reports, totalCosts];

// Dummy thresholds / references
let _workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let _readings = Array.from({length: date_range.length}, () => 30);
let _reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 20));
let _totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 30));
ref = [_workorders, _readings, _reports, _totalCosts];

let tabs = document.getElementsByClassName('tablinks');
let dataMetric = document.getElementsByClassName('tab-metric');
let dataDiff = document.getElementsByClassName('percentage-value');

// Initialize line graph
for(i = 0; i<dataMetric.length; i++){
    let dataSum = data[i].reduce((a, b) => a + b, 0);
    let refSum = ref[i].reduce((a,b) => a + b, 0);
    let diff = parseInt(((100*dataSum)/refSum)-100);

    let icon = tabs[i].getElementsByClassName('fas');

    if(diff > 0){
        icon[0].className += " fa-long-arrow-alt-up";
    } else if (diff < 0){
        icon[0].className += " fa-long-arrow-alt-down";
        diff = Math.abs(diff);
    }
    dataMetric[i].innerHTML += dataSum;
    dataDiff[i].innerHTML += diff  + "%";
}

// Line graph
let ctx = document.getElementById('myChart_1').getContext('2d');
let chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: date_range,
        datasets: [{
            label: 'n. of workorders',
            data: workorders,
            backgroundColor: pMain,
            order: 1
        },{
            label: "Last year",
            type: 'line',
            steppedLine: 'middle',
            fill: false,
            borderColor: pDark,
            borderDash: [5,2],
            data: _workorders,
            order: 2
        }]
    },
    options: {
        legend: {
            display: false,
            position: 'bottom',
            align: 'end',
            labels: {
                usePointStyle: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0,
                borderWidth: 2
            },
            point:{
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 15,
                    autoSkip: true, //!important
                    maxRotation: 0, 
                    minRotation: 0
                }
            }],
            yAxes: [{
                gridLines: {
                    display:true,
                },
                position: 'right',
            }]
        }
    }
});

function changeTab(evt, chartName, dataInput, refInput='None') {
    let i, tabcontent, tablinks;
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // change metric data
    chartName.data.datasets[0].data = dataInput;
    chartName.data.datasets[0].label = 'n. of ' + evt.currentTarget.getElementsByClassName("tab-title")[0].innerText.toLowerCase();

    // change ref/threshold data
    chartName.data.datasets[1].data = refInput;

    chart1.update();
    evt.currentTarget.className += " active";
}

function loadRow(){
    let tableRef = document.getElementById('financeTable').getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById('financeTable').rows[0].cells.length;

    // Insert a row in the table at the last row
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";

    let data = [
        ['Asset ' + Math.floor(Math.random() * 20).toString(), false],
        [(Math.random() * 10).toFixed(2).toString(), true],
        [Math.floor(Math.random() * 7), true],
        [Math.floor(Math.random() * 160), true],
        [Math.floor(Math.random() * 20), true],
        [Math.floor(Math.random() * 10), true],
        [Math.floor(Math.random() * 10), true]
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
    let columns = document.getElementById('financeTable').getElementsByTagName('th');
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
    return;
}
createTable();

//Ascending
function sortTableAscending(col) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("financeTable");
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
function sortTableDescending(col){
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("financeTable");
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

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['sankey']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();

    //Column 0: Source -------> Total costs | Equipment | Devices?
    //Column 1: Destination --> Equipment   | Devices   | Endpoints?
    //Column 2: Value --------> cost
    data.addColumn('string', 'Costs');
    data.addColumn('string', 'Devices');
    data.addColumn('number', 'Value');
    data.addRows([
        ['costs', 'device 1', 13],
        ['costs', 'device 2', 10],
        ['costs', 'device 3', 1],
        ['costs', 'device 4', 1],
        ['costs', 'other devices', 2],
        ['device 1', 'equipment 1', 6],
        ['device 1', 'equipment 2', 2],
        ['device 1', 'equipment 3', 5],
        ['device 2', 'equipment 3', 4],
        ['device 2', 'equipment 4', 6],
        ['device 3', 'equipment 4', 1],
        ['device 4', 'equipment 3', 1],
        ['other devices', 'other equipments', 2],
    ]);
    
    let colors = ["#1a237e", "#534bae", "#000051", "#ffab00", "#ffdd4b", "#c67c00"]
    let width = document.getElementById('googleChart').width;

    // Set chart options
    var options = {
        'width': width,
        'height':300,
        sankey: {
        node: {
            colors: colors,
            width: 2
            }
        // link: {
        //     colorMode: 'gradient',
        //     }
        }
    };

    // Instantiate and draw our chart, passing in some options.
    //   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    var chart = new google.visualization.Sankey(document.getElementById('chart_div'));
    chart.draw(data, options);
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
        return ((a.value > b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
    });

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
        data[k] = list[k].value;
        labels[k] = list[k].label;
    }
  
    return data, labels;
}