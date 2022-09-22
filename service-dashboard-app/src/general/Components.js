import MenuOption, { CheckBoxInputs, IconInputs, SelectInput } from "./Filters";
import Device from "./Device";
import "./Components.css";

const Company = ({ company, sites }) => {
  return (
    <div className="service-dashboard-item row">
      <div className="service-dashboard-content col-md-12">
        <div className="service-dashboard-title">
          <label>
            <h6>{company}</h6>
          </label>
        </div>
        {sites && sites.map((site) => <Site site={site} content={<>test</>} />)}
      </div>
    </div>
  );
};

const Site = ({ site, content }) => {
  return (
    <div className="service-site-content">
      <div className="service-dashboard-title">
        <label>
          <h6>{site}</h6>
        </label>
        <div className="api-status unconnected">SAP</div>
        <div className="api-status connected">Polaris</div>
      </div>
      <div className="service-devices row">
        <Device type="uBridge" status="alarm" />
        {content}
      </div>
    </div>
  );
};

export const Tab = ({ title, cls, activeTrigger, onClick }) => {
  return (
    <div
      className={`tab ${cls} ${activeTrigger === title ? "active" : ""}`}
      onClick={() => onClick(title)}>
      <a className="tab-title" href="button">
        {title}
      </a>
    </div>
  );
};

export const Menu = () => {
  return (
    <div id="dashboard-menu">
      <MenuOption
        input={
          <IconInputs
            ids={["siteView", "tableView"]}
            icons={["fas fa-bars", "fas fa-table"]}
          />
        }
      />
      <MenuOption
        title="Sorting"
        input={
          <SelectInput
            id="Sorting"
            values={["Alphabetical", "Failure First"]}
          />
        }
      />
      <MenuOption
        title="Type of Device"
        input={
          <CheckBoxInputs
            values={["uBridge", "uMote", "uBlock", "Other"]}
            checked={["uBridge", "uBlock"]}
          />
        }
      />
      <MenuOption
        title="Status"
        input={
          <CheckBoxInputs
            values={["Active", "Inactive", "Failure"]}
            checked={[]}
          />
        }
      />
      <MenuOption
        title="Companies"
        input={
          <CheckBoxInputs
            values={["Tata Steel", "Centrient", "Bunge", "Heineken"]}
            checked={["Heineken", "Centrient"]}
          />
        }
      />
    </div>
  );
};

export default Company;
