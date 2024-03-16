import React, { useEffect, useState } from "react";
import TranscriptionItem from "./TranscriptionItem";
import { TranscriptionListStyle } from "./style";
import { fetchRecognitionsOne } from "../../http/fileApi";
import { useParams } from "react-router-dom";

export const TranscriptionList = () => {
  const [recognition, setRecognition] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecognition = async () => {
      try {
        const data = await fetchRecognitionsOne(id);
        setRecognition(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecognition();
  }, []);

  return (
    <TranscriptionListStyle>
      {recognition.map((item) => (
        <TranscriptionItem key={item.id} item={item} />
      ))}
    </TranscriptionListStyle>
  );
};
