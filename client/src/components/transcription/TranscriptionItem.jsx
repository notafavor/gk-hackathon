import React from "react";
import "./style.scss";

const TranscriptionItem = ({ item }) => {
  return (
    <div className="TranscriptionItemWrapper">
      <div className="TranscriptionItemTitle">{item.speaker}</div>
      <div className="TranscriptionItemText home__text">{item.msg}</div>
      <div className="Divider" />
    </div>
  );
};

export default TranscriptionItem;
