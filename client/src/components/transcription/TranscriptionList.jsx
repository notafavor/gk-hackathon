import React, { useEffect, useState } from "react";
import TranscriptionItem from "./TranscriptionItem";
import { TranscriptionListStyle } from "./style";
import { fetchRecognitionsOne } from "../../http/fileApi";

export const TranscriptionList = () => {
  const [recognition, setRecognition] = useState([]);

  useEffect(() => {
    const fetchRecognition = async () => {
      try {
        const data = await fetchRecognitionsOne(6);
        setRecognition(data.result)
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
