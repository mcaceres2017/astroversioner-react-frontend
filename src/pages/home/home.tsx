import Container from "@mui/material/Container";
import DatasetCard from "../../components/DatasetCard";
import { Grid, Typography } from "@mui/material";
import APIClient from "../../utils/api_client";
import { useState, useEffect } from "react";

function Home() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIClient.get_datasets();
        setDatasets(data);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: "50px" }}>
      <div>
        <Typography variant="h3" gutterBottom>
          Datasets
        </Typography>
        <Typography variant="body1" gutterBottom>
          All datasets.
        </Typography>
      </div>
      <Grid
        justifyContent="center"
        container
        direction="column"
        alignItems="center"
        spacing={2}
      >
        {datasets.map((dataset, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <DatasetCard dataset={dataset} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
