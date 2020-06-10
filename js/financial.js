// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Dummy data
let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
let workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let readings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 20));
let totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 30));
let totalSavings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 30));
let uptimeRatio = Array.from({length: date_range.length}, () => Math.random());
data = [workorders, readings, reports, totalCosts, totalSavings]

// Dummy thresholds / references
let _workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let _readings = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];
let _reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 20));
let _totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 30));
let _totalSavings = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

// Not used - yet
let assetsCosts = [{
    asset: 'Asset #1',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
},{
    asset: 'Asset #2',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
},{
    asset: 'Asset #3',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
},{
    asset: 'Asset #4',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
},{
    asset: 'Asset #5',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
},{
    asset: 'Asset #6',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
},{
    asset: 'Asset #7',
    costs: Math.floor(Math.random() * 30),
    diff: Math.floor(Math.random() * 5)
}];

ref = [_workorders, _readings, _reports, _totalCosts, _totalSavings]

let tabs = document.getElementsByClassName('tablinks');
let dataMetric = document.getElementsByClassName('tab-metric');
let dataDiff = document.getElementsByClassName('percentage-value');
let scatterArray = [];

//Create a array of objects, required input format for scatter plot.
totalCosts.forEach((cost, index) => {
    let saving = totalSavings[index];
    scatterArray.push({
        x: cost, 
        y: saving
    });
});

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
    dataDiff[i].innerHTML = diff  + "%";
}

// Line graph
let ctx = document.getElementById('myChart_1').getContext('2d');
let chart1 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: date_range,
        datasets: [{
            label: 'n. of workorders',
            fill: false,
            borderColor: pMain,
            data: workorders,
            pointStyle: 'line'
        },
        {
            label: "Last year",
            fill: false,
            borderColor: pMain,
            borderDash: [5,2],
            data: _workorders,
            pointStyle: 'line'
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'end',
            labels: {
                usePointStyle: true
            }
        },
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

//Scatter plot
let ctx2 = document.getElementById('myChart_2').getContext('2d');
let chart2 = new Chart(ctx2, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            backgroundColor: pMain,
            data: scatterArray
        }]
    },
    options: {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: 'Costs'
                }
            }],
            yAxes: [{
                type: 'linear',
                position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: 'Savings'
                }
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
        ['$ ' + (Math.random() * 10).toFixed(2).toString(), true],
        [Math.floor(Math.random() * 7), true],
        [Math.floor(Math.random() * 4), true],
        [Math.floor(Math.random() * 4), true],
        ['person ' + Math.floor(Math.random() * 30).toString(), false]
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

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
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
    table = document.getElementById("financeTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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