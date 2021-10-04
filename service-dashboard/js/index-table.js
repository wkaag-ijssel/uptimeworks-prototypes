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

fetch('menu-index.html')
  .then(response => response.text())
  .then(data => {
    // Insert menu
    const menu = document.getElementById("dashboard-menu");
    menu.innerHTML = data;

    // Change view
    const elem = document.getElementById("siteView");
    elem.addEventListener("click", () => {
        window.location.href = "index.html"
    })
  });

const createuBridgeRow = () => {
    let row = [
        ['uBridgeName' + Math.floor(Math.random() * 20).toString(), false],
        ['Company' + Math.floor(Math.random() * 5).toString(), true],
        ['Site' + Math.floor(Math.random() * 3).toString(), true],
        ['X-XXX-XXX-X', true],
        [Math.random() * 1000, false],
        ['2020-09-' + Math.floor(Math.random() * 30), false],
        ['Active', false]
    ];
    return row
};

createTable('uBridgeTable', '#uBridgeTable-body', createuBridgeRow, 30);
