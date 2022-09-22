import { useState } from "react";
import { Helmet } from "react-helmet";
import Company, { Menu, Tab } from "./general/Components";
// import { getAccessToken, getMeasurementPoints } from "./functions/cloud";
// import EnhancedTable from "./general/Table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./css/style.css";

function App() {
  const [selectedPage, setSelectedPage] = useState("Devices");
  // const [selectedContent, setSelectedContent] = useState()
  // const token = getAccessToken();

  // console.log(token);
  // fetch(token)
  //   .then((res) => res.json())
  //   .then((res) => console.log(res));

  // fetch()
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (response) {
  //     var objectURL = URL.createObjectURL(response);

  //     console.log(objectURL);
  //   });

  const changeSelectedPage = (newPage) => {
    setSelectedPage(newPage);
  };

  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="css/style.css" />
        <script
          src="https://kit.fontawesome.com/3d92c0de9b.js"
          crossorigin="anonymous"></script>

        <link
          href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <header className="App-header sticky">
        <div className="topnav row">
          <div className="col-md-2 nav-leftside" style={{ paddingLeft: "0px" }}>
            <div className="return-button">
              <i className="fas fa-arrow-left"></i>
            </div>
            <div style={{ padding: "15px 0 0 0px" }}>
              <h5>Service Dashboard</h5>
            </div>
          </div>
          <div className="col-md-4 nav-middle">
            <div className="row">
              <Tab
                title="Feed"
                cls="col-md"
                activeTrigger={selectedPage}
                onClick={changeSelectedPage}
              />
              <Tab
                title="Devices"
                cls="col-md"
                activeTrigger={selectedPage}
                onClick={changeSelectedPage}
              />
              <Tab
                title="Usage"
                cls="col-md"
                activeTrigger={selectedPage}
                onClick={changeSelectedPage}
              />
              <Tab
                title="Reports"
                cls="col-md"
                activeTrigger={selectedPage}
                onClick={changeSelectedPage}
              />
              <Tab
                title="Contract"
                cls="col-md"
                activeTrigger={selectedPage}
                onClick={changeSelectedPage}
              />
            </div>
          </div>
          <div className="col-md-2 nav-rightside"></div>
        </div>
      </header>
      <div className="row h-100">
        <div className="col-md-2" style={{ paddingLeft: 0 + "px" }}>
          <div class="sticky-top">
            <Menu />
          </div>
        </div>

        <div className="col-md-10" style={{ marginBottom: 20 + "px" }}>
          {/* {selectedPage === "Feed" && (
            <>
              <Company company="Heineken" sites={["GSL", "KBW"]} />
            </>
          )} */}
          {selectedPage === "Devices" && (
            <>
              <Company company="Heineken" sites={["GSL", "KBW"]} />
              <Company company="Heineken" sites={["GSL"]} />
              <Company company="Heineken" sites={["GSL", "KBW"]} />
            </>
          )}
          {/* {selectedPage === "Reports" && (
            <div style={{ marginTop: "30px", marginRight: "15px" }}>
              <EnhancedTable />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default App;
