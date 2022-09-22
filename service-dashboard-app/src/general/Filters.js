import "./Filters.css"

export const IconInputs = ({ ids, icons }) => (
    <div style={{ height: "auto" }}>
        {(ids && icons) && ids.map((id, index) => (
            <div key={id} title={id} className="dashboard-menu-icon">
                <i className={icons[index]}></i>
            </div>
        ))}
    </div>
);

export const SelectInput = ({ id, values }) => (
    <select id={id} name={id}>
        {values && values.map((value) => (
            <option key={value} value={value}>{value}</option>
        ))}
    </select>
);

export const CheckBoxInputs = ({ values, checked }) => (
    <>
        {values && values.map((value) => (
            <>
                <input type="checkbox" id={value} name={value} value={value} defaultChecked={value in checked} />
                <label for={value} style={{ marginLeft: "5px"}}>{value}</label>
                <br />
            </>
        ))}
    </>
);

const MenuOption = ({ title, input }) => (
    <div className="menu-option">
        {title && <p className="menu-option-title">{title}</p>}
        {input}
    </div>
);

export default MenuOption;