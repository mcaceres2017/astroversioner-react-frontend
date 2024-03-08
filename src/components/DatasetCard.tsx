import { CardActionArea, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function DatasetCard({ dataset }: any) {
  return (
    <Card sx={{ minWidth: 1200 }}>
      <CardActionArea href={"/dataset/" + dataset.did}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" component="div">
              {dataset.name}
            </Typography>
            <Grid>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Author: {dataset.author}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Created: {dataset.create_date}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Last Update: {dataset.last_update}
              </Typography>
              {/* <Typography variant="body2">Version: {Math.max (...dataset.versions)}</Typography> */}
            </Grid>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
