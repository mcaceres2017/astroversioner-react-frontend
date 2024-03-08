import {
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import VersionCard from "../../components/VersionCard";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import APIClient from "../../utils/api_client";

interface DatasetMetadata {
  name: string;
  author: string;
  description: string;
  versions: Array<number>;
  parent_did: number;
  parent_did_name: string;
  create_date: string;
}

function DetailDataset() {
  const { did } = useParams();
  /* const { version } = useParams(); */

  const [dataset, setDataset] = useState<DatasetMetadata | null>(null);
  var [current_version, setCurrentVersion] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIClient.get_dataset_metadata(Number(did));
        setDataset(data);
        if (!current_version) {
          setCurrentVersion(String(Math.max(...(data?.versions ?? []))));
        }

        current_version && (
          <VersionCard version={Number(current_version)} did={Number(did)} />
        );
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    fetchData();
  }, [current_version, did]);

  console.log(`DATASET INFO:${dataset}`);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentVersion(event.target.value as string);
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      {dataset && (
        <Stack direction={"row"} spacing={2}>
          <Card sx={{ minWidth: 500 }}>
            <CardContent>
              <Typography variant="h4" component="div">
                {dataset?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {dataset?.description}.
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <b>Author:</b> {dataset?.author}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <b>Create Date:</b>
                {dataset?.create_date}
              </Typography>
              {dataset?.parent_did != null ? (
                <div>
                  <Typography variant="body1" component="div">
                    <b>Parent:</b>
                    {dataset?.parent_did_name}, <b>did_parent:</b>
                    {dataset?.parent_did}
                  </Typography>
                </div>
              ) : (
                <div></div>
              )}

              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-label">Version</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={current_version}
                  label="Version"
                  onChange={handleChange}
                >
                  {dataset?.versions.map((value) => {
                    //const labelId = `checkbox-list-label-${value}`;
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          <VersionCard version={Number(current_version)} did={Number(did)} />
        </Stack>
      )}
    </Container>
  );
}

export default DetailDataset;
