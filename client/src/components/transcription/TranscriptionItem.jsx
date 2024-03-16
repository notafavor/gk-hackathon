import React from "react";
import {
  TranscriptionItemText,
  TranscriptionItemTitle,
  TranscriptionItemWrapper,
  Divider,
} from "./style";

const TranscriptionItem = ({ item }) => {
  return (
    <TranscriptionItemWrapper>
      <TranscriptionItemTitle>{item.speaker}</TranscriptionItemTitle>
      <TranscriptionItemText className="home__text">
        {item.msg}
      </TranscriptionItemText>
      {/* <TranscriptionItemText className="home__text"> //TODO: стили накидать
        {item.timecode}
      </TranscriptionItemText> */}
      <Divider />
    </TranscriptionItemWrapper>
  );
};

export default TranscriptionItem;
