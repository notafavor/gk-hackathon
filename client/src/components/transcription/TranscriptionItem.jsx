import React from "react";
import "./style.scss";

const TranscriptionItem = ({ item }) => {
  return (
    <div className="TranscriptionItemWrapper">
      <div className="TranscriptionItemTitle">{item.speaker}</div>
      <div className="TranscriptionItemText home__text">{item.msg}</div>
      {/* <TranscriptionItemText className="home__text"> //TODO: стили накидать
        {item.timecode}
      </TranscriptionItemText> */}
      <div className="Divider" />
    </div>
  );
};

export default TranscriptionItem;
