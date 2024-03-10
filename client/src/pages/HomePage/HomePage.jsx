import React from "react";
import UploadFIleProgressBar from "../../components/uploadFile/UploadFIleProgressBar";
import { Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <UploadFIleProgressBar />
    </Container>
  );
};

export default HomePage;
