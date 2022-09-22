
//onload
function createTable(table_id, table_body_id, row_data, nr_of_devices, chartname){

    //Generate rows
    for(let i = 0; i < nr_of_devices; i++){
        let tableRef = document.getElementById(table_id).getElementsByTagName('tbody')[0];
        let rowsCount = document.getElementById(table_id).rows[0].cells.length;

        // Insert a row in the table at the last row
        let newRow   = tableRef.insertRow();
        newRow.className = "mdc-data-table__row";

        let data = row_data();

        for (let i = 0; i < rowsCount; i++) {
            let newCell  = newRow.insertCell(i);
            newCell.innerHTML = data[i][0];
            newCell.className = "mdc-data-table__cell"
        };
    };

    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById(table_id).getElementsByTagName('th');
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        if (column.classList.contains("hover-icon")) {
            column.addEventListener('click', function(event) {
                function sortedToFalse() {
                    for (let i = 0; i < columns.length; i++) {
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
                if (sorted == "no") {
                    sortTableDescending(i, table_id);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.children[1];
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                } else if (sorted == "desc") {
                    sortTableAscending(i, table_id);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "asc");

                    let icon = column.children[1];
                    icon.innerHTML = "arrow_downward";
                    icon.style.visibility = "visible";
                } else if (sorted == "asc") {
                    sortTableDescending(i, table_id);
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.children[1];
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                }
            });
        };
    };

    //Add eventlisteners to each row
    let tableRows = document.querySelectorAll(table_body_id + ' tr');
    tableRows.forEach(e => e.addEventListener("click", function() {
        // Here, `this` refers to the element the event was hooked on
        tableRows.forEach(row => { 
            if (row === e) {
                if(row.style.backgroundColor == "rgb(150, 156, 224)" ){
                    row.style.backgroundColor = "white";
                } else {
                    row.style.backgroundColor = "rgb(150, 156, 224)";
                    row.style.fontSize = "bold"
                }
            } else {
                row.style.backgroundColor = "white";
            }
        });

        let deviceDataPromise = new Promise(resolve => {
            let data = [{
                label: 'Readings',
                borderColor: pMain,
                fill: false,
                backgroundColor: pMain,
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: Array.from({length: labels.length}, () => Math.floor(Math.random()*5) + 100)
            },{
                label: 'Spectra',
                borderColor: pDark,
                fill: false,
                backgroundColor: pDark,
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: Array.from({length: labels.length}, () => Math.floor(Math.random()*5) + 2)
            },{
                label: 'Report items',
                borderColor: sMain,
                fill: false,
                backgroundColor: sMain,
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: Array.from({length: labels.length}, () => Math.floor(Math.random()*3))
            }]
            resolve(data)
        })
    }));
    return;
}

//Ascending
function sortTableAscending(col, table_id) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(table_id);
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

//Descending
function sortTableDescending(col, table_id) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(table_id);
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

