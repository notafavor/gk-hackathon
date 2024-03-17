import React from "react";
import { TranscriptionList } from "../../components/transcription/TranscriptionList";
import Chat from "../../components/chat/Chat";
import Summary from "../../components/transcription/Summary";
import { Divider } from "@quark-uilib/components";

const TranscriptionPage = () => {
  return (
    <div className="container">
      <TranscriptionList />
      <Divider style={{ marginBottom: "50px" }} />
      <Summary />
      <Chat />
    </div>
  );
};

export default TranscriptionPage;
