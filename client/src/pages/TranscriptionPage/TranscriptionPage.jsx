import React from "react";
import { Container } from "@mui/material";
import { TranscriptionList } from "../../components/transcription/TranscriptionList";
import Chat from "../../components/chat/Chat";

const TranscriptionPage = () => {
  return (
    <Container>
      <TranscriptionList />
      <Chat />
    </Container>
  );
};

export default TranscriptionPage;
