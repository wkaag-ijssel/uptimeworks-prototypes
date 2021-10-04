// Color scheme
const pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

const normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

// Job compliance
const date_range = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

fetch('menu-finance.html')
    .then(response => response.text())
    .then(data => {
        // Insert menu
        const menu = document.getElementById("dashboard-menu");
        menu.innerHTML = data;

        // Change view
        const elem = document.getElementById("tableView");
        elem.addEventListener("click", () => {
            window.location.href = "finance-table.html"
        })
    });

const createRow = () => {
    let row = [
        ['Company' + Math.floor(Math.random() * 20).toString(), false],
        [Math.floor(Math.random() * 5), true],
        [Math.floor(Math.random() * 5), true],
        [Math.floor(Math.random() * 50), true],
        [Math.floor(Math.random() * 50), true],
        ['<i class="fas fa-check"></i>', true],
        ['<i class="fas fa-check"></i>', true],
        ['<i class="fas fa-check"></i>', true],
        ['<i class="fas fa-times"></i>', true],
        ['<i class="fas fa-check"></i>', true],
        [Math.floor(Math.random() * 200), false],
        [Math.floor(Math.random() * 200), false],
        ['Polaris', false]
    ];
    return row
};

createTable('uBridgeTable', '#uBridgeTable-body', createRow, 1);
