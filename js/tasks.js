// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
let date_range = [];
for(let i = 0; i<52; i += 1){
    date_range[i] = i+1;
};


// Not used - yet
// let assetsCosts = [{
//         asset: 'Asset #1',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
//     },{
//         asset: 'Asset #2',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
//     },{
//         asset: 'Asset #3',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
//     },{
//         asset: 'Asset #4',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
//     },{
//         asset: 'Asset #5',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
//     },{
//         asset: 'Asset #6',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
//     },{
//         asset: 'Asset #7',
//         costs: Math.floor(Math.random() * 30),
//         diff: Math.floor(Math.random() * 5)
// }];

let scatterArray = [];
//Create a array of objects, required input format for scatter plot.
// totalCosts.forEach((cost, index) => {
//     let saving = totalSavings[index];
//     scatterArray.push({
//         x: cost, 
//         y: saving
//     });
// });

// Chart 1: % completed work orders for a specific task over time 
let ctx = document.getElementById('taskCompletedWorkChart').getContext('2d');
let chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: date_range,
        datasets: [{
            label: 'compliance (%)',
            data: Array.from({length: date_range.length}, () => Math.floor(Math.random() * 100)),
            backgroundColor: pMain,
            order: 1
        },{
            label: "Last year",
            type: 'line',
            steppedLine: 'middle',
            fill: false,
            borderColor: pDark,
            borderDash: [5,2],
            data: Array.from({length: date_range.length}, () => 95),
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

// change tab - information
function changeTab(evt) {
    let title = document.getElementById('title-chart-1');
    title.innerHTML = '% Completed Work for ' + evt.firstChild.innerHTML

    chart1.data.datasets[0].data = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 100));;
    chart1.data.datasets[1].data = Array.from({length: date_range.length}, () => 85);;
    chart1.update();
    console.log(evt.firstChild.innerHTML);
}


function loadRow(){
    let tableRef = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById('taskTable').rows[0].cells.length;

    // Insert a row in the table at the last row
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";
    newRow.onclick = "changeTab(this.value);"

    let data = [
        ['Task ' + Math.floor(Math.random() * 20).toString(), false],
        [Math.floor(Math.random() * 100), true],
        [Math.floor(Math.random() * 100), true],
        [Math.floor(Math.random() * 4), true],
        [Math.floor(Math.random() * 4), true],
        [Math.floor(Math.random() * 4), true],
        [Math.floor(Math.random() * 4), true],
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
    let columns = document.getElementById('taskTable').getElementsByTagName('th');
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
    let tableRows = document.querySelectorAll('#taskTable-body tr');
    tableRows.forEach(e => e.addEventListener("click", function() {
        // Here, `this` refers to the element the event was hooked on
        tableRows.forEach(row => { 
            if(row === e){
                if(row.style.backgroundColor == "rgb(150, 156, 224)" ){
                    row.style.backgroundColor = "white";
                } else {
                    row.style.backgroundColor = "rgb(150, 156, 224)";  
                    changeTab(row);
                }
            } else {
                row.style.backgroundColor = "white";
            }
        });
    }));
    return;
}
createTable();

//Ascending
function sortTableAscending(col) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("taskTable");
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
    table = document.getElementById("taskTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];
            if (Number(x.innerHTML) < Number(y.innerHTML)){
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

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels){
    return new Chart(chartElem, {
        type: 'horizontalBar',
        data: { 
            labels: labels,
            datasets: [{
                label: 'N. of tasks executed',
                backgroundColor: pDark,
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