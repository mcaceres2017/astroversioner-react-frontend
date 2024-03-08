import { Button, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import APIClient from "../utils/api_client";
import {
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Specification {
  det: boolean;
  non_det: boolean;
  xmatch: boolean;
  stamps: boolean;
  features: Array<string>;
}

interface VersionInfo {
  collaborator: string;
  versionNumber: number;
  version_date: string;
  specs: Specification;
  oids: [];
}
export default function VersionCard({ version, did }: any) {
  console.log("version" + version + " did" + did);
  const [version_info, setVersion] = useState<VersionInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIClient.get_version_metadata(
          Number(did),
          Number(version)
        );
        setVersion(data);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    fetchData();
  }, [did, version]);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `https://astrocollab.inf.udec.cl/versioner/dataset/${did}/version/${version}/download`
      );

      if (response.status == 200) {
        console.log("si llama a la api");
      } else {
        console.log("no llama a la api  ");
      }

      const blob = await response.blob();

      // Create a Blob object and initiate the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `your_zip_file_name.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Error downloading the specified version of the dataset:",
        error
      );
    }
  };

  console.log(`VERSION INFO:${version_info?.specs.det}`);

  return version != 0 ? (
    <Card sx={{ minWidth: 500 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div">
            Version {version}
          </Typography>
          <Grid>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Colaborator:</b> {version_info?.collaborator}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Date Version:</b>
              {version_info?.version_date}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Specs:</b>
            </Typography>
            <Grid
              justifyContent="start"
              container
              direction="column"
              alignItems="start"
              spacing={2}
            >
              <Grid item xs={6}>
                Det:{" "}
                <input
                  type="checkbox"
                  defaultChecked={version_info?.specs.det}
                />
              </Grid>
              <Grid item xs={6}>
                Non Det:{" "}
                <input
                  type="checkbox"
                  defaultChecked={version_info?.specs.non_det}
                />
              </Grid>
              <Grid item xs={6}>
                XMatch:{" "}
                <input
                  type="checkbox"
                  defaultChecked={version_info?.specs.xmatch}
                />
              </Grid>
              <Grid item xs={6}>
                Stamps:{" "}
                <input
                  type="checkbox"
                  defaultChecked={version_info?.specs.stamps}
                />
              </Grid>
            </Grid>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Features:</b>

              <Accordion
                style={{
                  maxHeight: "200px",
                  maxWidth: "400px",
                  overflowY: "auto",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Features Accordion
                </AccordionSummary>
                {version_info?.specs.features.map((feature, index) => (
                  <AccordionDetails> {feature} </AccordionDetails>
                ))}
              </Accordion>
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Oids:</b>

              <Accordion
                style={{
                  maxHeight: "200px",
                  maxWidth: "400px",
                  overflowY: "auto",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Oids Accordion
                </AccordionSummary>
                {version_info?.oids.map((oid, index) => (
                  <AccordionDetails> {oid} </AccordionDetails>
                ))}
              </Accordion>
            </Typography>

            <br></br>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={handleDownload}>
                Download version
              </Button>
              <Button variant="contained">Download oid List</Button>
            </Stack>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  ) : (
    <div></div>
  );
}
