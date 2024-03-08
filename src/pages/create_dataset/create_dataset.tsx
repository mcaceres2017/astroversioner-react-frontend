import { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  Button,
  Container,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import APIClient from "../../utils/api_client";
import CheckboxAccordion from "./test";
import CredentialManager from "../../utils/auth";
import { useNavigate } from "react-router-dom";

interface DatasetInformation {
  did: number;
  name: string;
  author: string;
  description: string;
  create_date: string;
  last_update: string;
  last_version: number;
}

export default function Login() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parent_did, setParent] = useState("");
  const [datasets, setDatasets] = useState<[DatasetInformation] | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [featuresError, setFeaturesError] = useState(false);
  const [selectableFeatures, setSelectableFeatures] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileError(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIClient.get_datasets();
        setDatasets(data);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const data = await APIClient.get_features();
        setSelectableFeatures(data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchData();
    fetchFeatures();
  }, []);

  const handleParentChange = (event: SelectChangeEvent) => {
    setParent(event.target.value);
  };

  const readJsonFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        const lines = fileContent.split("\n");

        if (lines.length < 2) {
          setFileError(true);
          setSelectedFile(null);
          return;
        }

        const columnNames = lines[0].split(",");

        if (columnNames.length != 1 || columnNames[0] != "oid") {
          setFileError(true);
          setSelectedFile(null);
          return;
        }

        const oids = [];
        for (let i = 1; i < lines.length - 1; i++) {
          const oid = lines[i];
          oids.push(oid);
        }

        //console.log(oids);
        resolve({ oids });
      };

      reader.onerror = () => {
        reject("Error reading the file");
      };

      reader.readAsText(file);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setFileError(false);
    setFeaturesError(false);

    if (!selectedFile) {
      setFileError(true);
      return;
    }

    const { oids } = await readJsonFile(selectedFile);

    console.log(oids);

    if (selectedFeatures.length == 0) {
      setFeaturesError(true);
      return;
    }

    const jsonString = JSON.stringify({
      name: name,
      author: CredentialManager.getUsername(),
      description: description || null,
      parent_did: parent_did || null,
      oids: oids,
      specs: { features: selectedFeatures },
    });
    let response = await APIClient.post_new_dataset(jsonString);
    if (response["success"]) {
      navigate(`/dataset/${response["dataset"].did}`);
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>New dataset</h2>

        {/* Dataset name */}
        <TextField
          label="Name (3-50 characters)"
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          inputProps={{ maxLength: 50, minLength: 3 }}
          value={name}
        />

        {/* Description */}
        <TextField
          label="Description (Optional)"
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          multiline
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          inputProps={{ maxLength: 300 }}
          value={description}
        />

        <Typography variant="h6" gutterBottom>
          Upload the CSV file that contains the oids
        </Typography>

        {/* Oids file selector */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && !fileError && (
            <p style={{ marginLeft: "20px" }}>
              Selected File: {selectedFile.name}
            </p>
          )}
          {!selectedFile && !fileError && (
            <p style={{ marginLeft: "20px" }}>No file selected.</p>
          )}

          {!selectedFile && fileError && (
            <p style={{ marginLeft: "20px", color: "red" }}>
              You must submit a valid file before moving forward.
            </p>
          )}
        </div>

        <br></br>

        {/* Select dataset parent */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Parent Dataset (Optional)
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={parent_did}
            label="Parent Dataset"
            onChange={handleParentChange}
          >
            <MenuItem value="">None</MenuItem>
            {datasets?.map((dataset) => {
              return (
                <MenuItem key={dataset.did} value={dataset.did}>
                  {dataset.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <br></br>
        <br></br>

        <Typography variant="h6" gutterBottom>
          Select the desired specifications
        </Typography>

        {featuresError && (
          <p style={{ color: "red" }}>
            You must select at least one feature before moving forward.
          </p>
        )}

        {selectableFeatures.length > 0 && (
          <CheckboxAccordion
            names={selectableFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />
        )}

        {selectableFeatures.length == 0 && (
          <p style={{ color: "yellow" }}>
            there has been an error loading when bringing the features from the
            api.
          </p>
        )}

        <br></br>

        <Button variant="outlined" color="secondary" type="submit">
          Create new dataset
        </Button>
      </form>
    </Container>
  );
}
