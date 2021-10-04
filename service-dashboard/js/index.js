// Color scheme
const pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

const normal = "#008b00";
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
    const elem = document.getElementById("tableView");
    elem.addEventListener("click", () => {
        window.location.href = "index-table.html"
    })
  });

const showDevice = () => {
    const element = document.getElementById("device-pop-up");
    element.style.visibility = "visible";
}

const hideDevice = () => {
    const element = document.getElementById("device-pop-up");
    element.style.visibility = "hidden";
}

document.showDevice = showDevice;