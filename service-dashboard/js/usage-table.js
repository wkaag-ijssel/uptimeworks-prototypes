// Color scheme
let pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

let normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

fetch('menu-usage.html')
    .then(response => response.text())
    .then(data => {
        // Insert menu
        const menu = document.getElementById("dashboard-menu");
        menu.innerHTML = data;

        // Change view
        const elem = document.getElementById("siteView");
        elem.addEventListener("click", () => {
            window.location.href = "usage.html"
        })
    });

const createRow = () => {
    let row = [
        ['Company' + Math.floor(Math.random() * 20).toString(), false],
        ['Site' + Math.floor(Math.random() * 3).toString(), false],
        [Math.floor(Math.random() * 100).toString() + '%', false],
        [Math.floor(Math.random() * 10000), true],
        [Math.floor(Math.random() * 200), true],
        [Math.floor(Math.random() * 100).toString() + '%', false],
        [Math.floor(Math.random() * 200), true],
        [Math.floor(Math.random() * 100), true],
        [Math.floor(Math.random() * 20), true],
    ];
    return row
};

createTable('uBridgeTable', '#uBridgeTable-body', createRow, 1);