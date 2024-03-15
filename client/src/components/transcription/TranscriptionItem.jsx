import React from "react";
import {
  TranscriptionItemText,
  TranscriptionItemTitle,
  TranscriptionItemWrapper,
} from "./style";
import Divider from "@mui/material/Divider";

const TranscriptionItem = ({ item }) => {
  console.log(item);
  return (
    <TranscriptionItemWrapper>
      <TranscriptionItemTitle>{item.speaker}</TranscriptionItemTitle>
      <TranscriptionItemText className="home__text">
        {item.msg}
      </TranscriptionItemText>
      {/* <TranscriptionItemText className="home__text"> //TODO: стили накидать
        {item.timecode}
      </TranscriptionItemText> */}
      <Divider className="divider" orientation="vertical" flexItem />
    </TranscriptionItemWrapper>
  );
};

export default TranscriptionItem;
