import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home/home.tsx";
import MyDataset from "./pages/my_datasets/my_dataset.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailDataset from "./pages/detail_dataset/detail_dataset.tsx";
import ResponsiveAppBar from "./components/NavBar.tsx";
import CredentialManager from "./utils/auth.tsx";
import Create_dataset from "./pages/create_dataset/create_dataset.tsx";

CredentialManager.setCredentials("mcaceres2017", "");
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <ResponsiveAppBar />
        <Home />
      </div>
    ),
  },
  {
    path: "/dataset/:did",
    element: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <ResponsiveAppBar />
        <DetailDataset />
      </div>
    ),
  },
  {
    path: "/my-datasets/:user",
    element: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <ResponsiveAppBar />
        <MyDataset />
      </div>
    ),
  },
  {
    path: "/create-dataset/",
    element: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <ResponsiveAppBar />
        <Create_dataset />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
