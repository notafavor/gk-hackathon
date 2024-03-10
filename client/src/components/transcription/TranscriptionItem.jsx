import React from "react";
import {
  TranscriptionItemText,
  TranscriptionItemTitle,
  TranscriptionItemWrapper,
} from "./style";
import Divider from "@mui/material/Divider";

const TranscriptionItem = ({ item }) => {
  return (
    <TranscriptionItemWrapper>
      <TranscriptionItemTitle>{item.speaker}</TranscriptionItemTitle>
      <TranscriptionItemText className="home__text">
        {item.text}
      </TranscriptionItemText>
      <Divider className="divider" orientation="vertical" flexItem />
    </TranscriptionItemWrapper>
  );
};

export default TranscriptionItem;
