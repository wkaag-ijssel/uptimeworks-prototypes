// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

var sun = new Image();
var moon = new Image();
var earth = new Image();



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

        if(data[i][1] == true){
            newCell.className = "mdc-data-table__cell mdc-data-table__cell--numeric"
        } else {
            newCell.className = "mdc-data-table__cell"
        }
    }
};

//onload
function createTable(){
    let months = ['January', 'February', 'March', 'April', 'May']
    //Generate rows
    for(let i = 0; i < 5; i++){
        let data = [
            [months[i], false],
            [631, true],
            [Math.floor(Math.random() * 100) + 100, true],
            [Math.floor(Math.random() * 300), true],
            [Math.floor(Math.random() * 150), true],
            [Math.floor(Math.random() * 150), true],
            [Math.floor(Math.random() * 150), true],
        ];
        loadRow('routeTable', data);
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


//onload
function createSecondTable(){
    let months = ['Bridle 5.1', 'Bridle 5.2', 'Bridle 6.1', 'Bridle 6.2', 'Bridle 7.1', 'Bridle 7.2']
    //Generate rows
    for(let i = 0; i < 6; i++){
        let data = [
            [months[i], false],
            [631, true],
            [Math.floor(Math.random() * 100) + 100, true],
            [Math.floor(Math.random() * 300), true],
            [Math.floor(Math.random() * 150), true],
            [Math.floor(Math.random() * 150), true]
        ];
        loadRow('assetOverTime', data);
    };

    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById('assetOverTime').getElementsByTagName('th');
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
createSecondTable();

function getRouteInsight(route){
    let start = document.getElementById('pre-route-insight');
    let insight = document.getElementById('route-insight');

    start.style.display = 'none';
    insight.style.display = 'block';
}

// Chart 1: route completion over time
let ctx5 = document.getElementById('routeCompletion').getContext('2d');
let workloadPerIndividual = new Chart(ctx5, {
    type: 'line',
    data: { 
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
                label: 'Route X',
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+80),
                fill: false,
                borderColor: pMain,
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
                label: "Route Y",
                fill: false,
                borderColor: pMain,
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+80),
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
                label: "Route Z",
                fill: false,
                borderColor: pMain,
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+80),
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
                label: "Route A",
                fill: false,
                borderColor: pMain,
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+80),
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
                label: "Route B",
                fill: false,
                borderColor: pMain,
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+80),
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
                label: "Route C",
                fill: false,
                borderColor: pMain,
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)+80),
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
            },
            {
                label: "Route D",
                fill: false,
                borderColor: pMain,
                data: Array.from({length: 12}, () => Math.floor(Math.random() * 100)),
                borderWidth: 1,
                pointStyle: 'circle',
                pointStrokeColor: "rgba(255, 255, 255, 0)"
        }]
    },
    options: {
        legend: {
            display: false,
            position: 'bottom',
            align: 'start'
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'dataset',
            intersect: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                position: 'right',
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        onHover: function onHover (evt, activeElements) {
            if (!activeElements || !activeElements.length) {
                this.data.datasets.forEach((dataset) => {
                    dataset.borderColor = pMain;
                });
            } else {
                let activeIndex = activeElements[0]._datasetIndex;
                this.data.datasets.forEach((dataset, index) => {
                    (index == activeIndex) ? setActive() : setFade();
                    function setActive(){ 
                        dataset.borderColor = 'red'; 
                    } //to do: prevent showing pointer on hover
                    function setFade(){ dataset.borderColor = "rgb(200, 200, 200)"; }
                });
            }
            this.update();
            return;
        },
        'onClick': function onClick (evt, activeElements) {
            getRouteInsight(activeElements);
        }
    }
});