import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { LOGIN_ROUTE, TRANSCRIPTION_ROUTE } from "../../utils/constsRoute";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../http";
import { refreshToken } from "../../http/userAPI";
import "./style.scss";
import { useNavigate } from "react-router-dom";

import {
  UploadDragFile,
  Preloader,
  Button,
  ProgressBar,
} from "@quark-uilib/components";
import { createRecognitions, fetchRecognitions } from "../../http/fileApi";

const UploadFIleProgressBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      let refToken = localStorage.getItem("refreshToken");
      let accessToken = localStorage.getItem("accessToken");
      if (refToken && accessToken) {
        try {
          const file = await fetchRecognitions();
          setUploadedFiles(() => [
            ...file.map((file) => ({
              id: file.id,
              name: file._file.name,
              date: file._file.dt_create,
              status: file.status,
            })),
          ]);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            await refreshToken();
            const file = await fetchRecognitions();
            setUploadedFiles(() => [
              ...file.map((file) => ({
                id: file.id,
                name: file._file.name,
                date: file._file.dt_create,
                status: file.status,
              })),
            ]);
          }
        }
      }
    };
    fetchFile();
    const interval = setInterval(fetchFile, 5000);

    return () => clearInterval(interval);
  }, []);

  const uploadFile = async (event) => {
    if (!user.isAuth) {
      navigate(LOGIN_ROUTE);
      return;
    }

    const file = event[0];

    if (!file) return;

    const fileName =
      file.name.length > 20
        ? `${file.name.substring(0, 21)}... .${file.name.split(".")[1]}`
        : file.name;

    let accessToken = localStorage.getItem("accessToken");
    const dataUser = jwtDecode(accessToken);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", fileName);
    formData.append("author", dataUser.user_id);
    setFiles((prevState) => [...prevState, { name: fileName, loading: 0 }]);
    setShowProgress(true);
    try {
      const response = await $authHost.post(
        "https://team5.opvk.tech/api/v1/files/",
        formData,
        {
          onUploadProgress: ({ loaded, total }) => {
            setFiles((prevState) => {
              const newFiles = [...prevState];
              newFiles[newFiles.length - 1].loading = Math.floor(
                (loaded / total) * 100
              );
              return newFiles;
            });
            if (loaded === total) {
              setFiles([]);
              setShowProgress(false);
            }
          },
        }
      );
      const recognitions = await createRecognitions(response.data.id);
      return recognitions;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        return uploadFile(event);
      }
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <UploadDragFile
        isMultiple={false}
        style={{ marginBottom: "30px" }}
        onChange={uploadFile}
        description="Формат MP4, WAV"
        accept=".mp4,.wav"
      />
      {showProgress && (
        <div className="LoadingArea">
          {files.map((file, index) => (
            <li className="FileRowLoader" key={index}>
              <div className="LoadFileContent">
                <div className="LoadFileDetails">
                  <span className="details-span name">{`${file.name} - uploading`}</span>
                  <ProgressBar
                    key={index}
                    progress={file.loading}
                    size="m"
                    isText
                  />
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
      <div className="UploadedArea">
        {uploadedFiles.map((file, index) => {
          const fileDate = new Date(file.date);
          const formattedDate = fileDate.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <li className="FileRow" key={index}>
              {file.status === "pending" || file.status === "received" ? (
                <>
                  <div className="UploadFileContent upload">
                    <div className="UploadFileDetails">
                      <span className="details-span name">
                        Имя файла: {file.name}
                      </span>
                      <span className="details-span name">
                        Дата загрузки: {formattedDate}
                      </span>
                    </div>
                    <Preloader type="star" />
                  </div>
                  <i className="fas fa-check"></i>
                </>
              ) : (
                <div className="UploadFileContent upload">
                  <div className="UploadFileDetails">
                    <span className="details-span name">
                      Имя файла: {file.name}
                    </span>
                    <span className="details-span name">
                      Дата загрузки: {formattedDate}
                    </span>
                  </div>
                  <Button
                    color="green"
                    size="s"
                    onClick={() => {
                      navigate(`${TRANSCRIPTION_ROUTE}/${file.id}`);
                    }}
                  >
                    Обработан
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </div>
    </div>
  );
});

export default UploadFIleProgressBar;
