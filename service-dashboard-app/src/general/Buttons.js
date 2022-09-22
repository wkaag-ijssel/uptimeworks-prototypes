import * as React from "react";
import Button from "@mui/material/Button";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";

export default function ReviewButtonStack() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined">
        Export
      </Button>
      <Button variant="contained" style={{ width: "200px"}}>
        Add to a Collection
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button variant="outlined" style={{ width: "150px" }}>
        Back to Draft
      </Button>
      <Button variant="contained" endIcon={<ArrowForward />}>
        Issue
      </Button>
    </Stack>
  );
}
