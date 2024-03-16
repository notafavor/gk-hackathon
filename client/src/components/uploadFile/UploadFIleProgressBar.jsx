import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { LOGIN_ROUTE, TRANSCRIPTION_ROUTE } from "../../utils/constsRoute";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../http";
import { refreshToken } from "../../http/userAPI";
import {
  FileLoading,
  FileLoadingBar,
  FileRow,
  LoadFileContent,
  LoadFileDetails,
  LoadingArea,
  UploadFileContent,
  UploadFileDetails,
  UploadedArea,
} from "./style";
import { Link, useNavigate } from "react-router-dom";

import { UploadDragFile, Preloader, Status } from "@quark-uilib/components";
import { createRecognitions, fetchRecognitions } from "../../http/fileApi";

const UploadFIleProgressBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  const handleClose = () => setErrorModal(false);

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
    // const interval = setInterval(fetchFile, 5000);

    // return () => clearInterval(interval);
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
      setErrorModal(false);
      return recognitions;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        return uploadFile(event);
      }
      setErrorText(error.response.data.file[0]);
      setErrorModal(true);
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
      />
      {showProgress && (
        <LoadingArea>
          {files.map((file, index) => (
            <FileRow key={index}>
              <i className="fas fa-file-alt"></i>
              <LoadFileContent>
                <LoadFileDetails>
                  <span className="details-span name">{`${file.name} - uploading`}</span>
                  <span className="details-span percent">{`${file.loading}%`}</span>
                  <FileLoadingBar>
                    <FileLoading style={{ width: `${file.loading}%` }} />
                  </FileLoadingBar>
                </LoadFileDetails>
              </LoadFileContent>
            </FileRow>
          ))}
        </LoadingArea>
      )}
      <UploadedArea>
        {uploadedFiles.map((file, index) => {
          const fileDate = new Date(file.date);
          const formattedDate = fileDate.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <FileRow key={index}>
              {file.status === "pending" ? (
                <>
                  <UploadFileContent className="upload">
                    <UploadFileDetails>
                      <span className="details-span name">
                        Имя файла: {file.name}
                      </span>
                      <span className="details-span name">
                        Дата загрузки: {formattedDate}
                      </span>
                    </UploadFileDetails>
                    <Preloader type="star" />
                  </UploadFileContent>
                  <i className="fas fa-check"></i>
                </>
              ) : (
                <UploadFileContent className="upload">
                  <UploadFileDetails>
                    <span className="details-span name">
                      Имя файла: {file.name}
                    </span>
                    <span className="details-span name">
                      Дата загрузки: {formattedDate}
                    </span>
                  </UploadFileDetails>
                  <Status
                    isFilled
                    status="completed"
                    onClick={() => {
                      navigate(`${TRANSCRIPTION_ROUTE}/${file.id}`);
                    }}
                  >
                    Обработан
                  </Status>
                </UploadFileContent>
              )}
            </FileRow>
          );
        })}
      </UploadedArea>
    </div>
  );
});

export default UploadFIleProgressBar;
