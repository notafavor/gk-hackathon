import React from "react";
import { testData } from "../../utils/test";
import TranscriptionItem from "./TranscriptionItem";
import { TranscriptionListStyle } from "./style";

export const TranscriptionList = () => {
  return (
    <TranscriptionListStyle>
      {testData.map((item) => (
        <TranscriptionItem key={item.id} item={item} />
      ))}
    </TranscriptionListStyle>
  );
};
