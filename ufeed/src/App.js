import { Helmet } from "react-helmet";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Feed from "./components/Feed";
import { Container } from "@mui/material";

function App() {
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
              <h5>uFeed</h5>
            </div>
          </div>
          <div className="col-md-4 nav-middle">
            <div className="row"></div>
          </div>
          <div className="col-md-2 nav-rightside"></div>
        </div>
      </header>
      <Container maxWidth="md">
        <Feed></Feed>
      </Container>
    </div>
  );
}

export default App;
