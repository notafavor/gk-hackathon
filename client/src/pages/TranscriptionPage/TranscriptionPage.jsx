import React from "react";
import { TranscriptionList } from "../../components/transcription/TranscriptionList";
import Chat from "../../components/chat/Chat";

const TranscriptionPage = () => {
  return (
    <div className="container">
      <TranscriptionList />
      <Chat />
    </div>
  );
};

export default TranscriptionPage;
