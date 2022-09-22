import Company from './general/Components';

const Devices = () => {

    return (
        <>
            <Company company="Heineken" sites={["GSL", "KBW"]}/>
            <Company company="Heineken" sites={["GSL"]}/>
            <Company company="Heineken" sites={["GSL", "KBW", "Test"]}/>
        </>
    );
}

export default Devices;