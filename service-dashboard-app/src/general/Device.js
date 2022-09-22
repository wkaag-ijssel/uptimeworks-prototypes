import "./Device.css";

const Device = ({ type, name, status }) => (
  <div
    className="service-device"
    onclick="showDevice()"
    style={{ width: "100px" }}>
    <div className="service-device-header connected">
      <h5 className="center">{type}</h5>
    </div>
    <div className="service-device-content">
      <h5 className="device-metric">Last reading</h5>
      <p className="device-value">
        <span>1.2</span>hours
      </p>

      <h5 className="device-metric">Recent</h5>
      <p className="device-value">
        <span>1.2</span>
      </p>
    </div>
  </div>
);

export default Device;
