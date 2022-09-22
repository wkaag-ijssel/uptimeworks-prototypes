import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LineChart from "./LineChart";
import faker from "@faker-js/faker";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(0, 0, 139)",
      backgroundColor: "rgba(0, 0, 139, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BasicCard({ children }) {
  return (
    <Card sx={{ minWidth: 275, marginTop: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {children}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <LineChart data={data} />
      </CardContent>
      <CardActions>
        <Button size="small">Open Analysis</Button>
      </CardActions>
    </Card>
  );
}

const userAction = async () => {
  const response = await fetch("../data/measurements.json");
  const myJson = await response.json(); //extract JSON from the http response

  console.log(myJson);
  return myJson;
};

export const Feed = () => {
  const [data, setData] = useState();

  const handleData = () => {};

  useEffect(() => {
    const test = userAction();
    console.log(test);
  }, []);

  return (
    <>
      <BasicCard>asset</BasicCard>
      <BasicCard>asset</BasicCard>
      <BasicCard>asset</BasicCard>
    </>
  );
};

export default Feed;
