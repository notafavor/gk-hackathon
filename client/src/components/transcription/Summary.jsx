import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import "./style.scss";
import { fetchRecognitionsOne } from "../../http/fileApi";
import { useParams } from "react-router-dom";
import { Context } from "../..";

const Summary = observer(() => {
  const { recognition } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecognition = async () => {
      recognition.setChannel("");
      try {
        const data = await fetchRecognitionsOne(id);
        console.log(data);
        recognition.setSummary(data.summary);
        recognition.setTasks(JSON.stringify(data.tasks));
        recognition.setFetchWebSocket(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecognition();
    recognition.setFetchWebSocket(false);
  }, []);

  return (
    <div className="TranscriptionItemWrapper">
      {recognition.summary && (
        <div>
          <div className="TranscriptionItemTitle">Summary:</div>
          <div className="TranscriptionItemText home__text">
            {recognition.summary}
          </div>
        </div>
      )}
      {recognition.summary && (
        <div>
          <div className="TranscriptionItemTitle">Tasks:</div>
          <div className="TranscriptionItemText home__text">
            {recognition.tasks}
          </div>
        </div>
      )}
    </div>
  );
});

export default Summary;
