import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { ReactComponent as UploadIcon } from "../../assets/img/uploadFile.svg";
import {
  FileInput,
  FileLoading,
  FileLoadingBar,
  FileRow,
  Icon,
  LoadFileContent,
  LoadFileDetails,
  LoadingArea,
  UploadBox,
  UploadFileContent,
  UploadFileDetails,
  UploadedArea,
} from "./style";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { LOGIN_ROUTE } from "../../utils/constsRoute";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../http";
import { refreshToken } from "../../http/userAPI";
import { fetchFileUser } from "../../http/fileApi";

const UploadFIleProgressBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { // TODO надо разобраться, как обновлять загруженные файлы
    const fetchFile = async () => {
      try {
        const response = await fetchFileUser();
        console.log(response);
        setUploadedFiles((prevFiles) => [
          ...prevFiles,
          ...response.map((file) => ({
            name: file.name,
            date: file.dt_create,
          })),
        ]);
      } catch (error) {
        await refreshToken();
        const response = await fetchFileUser();
        setUploadedFiles((prevFiles) => [
          ...prevFiles,
          ...response.map((file) => ({
            name: file.name,
            date: file.dt_create,
          })),
        ]);
      }
    };
    fetchFile();
  }, []);

  const handleFileInputClick = () => {
    if (!user.isAuth) {
      navigate(LOGIN_ROUTE);
      return;
    }
    fileInputRef.current.click();
  };

  const uploadFile = async (event) => {
    if (!user.isAuth) {
      navigate(LOGIN_ROUTE);
      return;
    }
    const file = event.target.files[0];
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
              // setUploadedFiles([...uploadedFiles, { name: fileName }]);
              setFiles([]);
              setShowProgress(false);
            }
          },
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        return uploadFile(event);
      }
      console.error(error);
      throw error;
    }
  };

  return (
    <UploadBox>
      <p className="title">Upload your file</p>
      <form className="upload-form" onClick={handleFileInputClick}>
        <FileInput
          className="file-input"
          type="file"
          hidden
          ref={fileInputRef}
          onChange={uploadFile}
        />
        <Icon>
          <UploadIcon width="64px" height="64px" />
        </Icon>
        <p>Browser File to upload</p>
      </form>
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
              <UploadFileContent className="upload">
                <i className="fas fa-file-alt"></i>
                <UploadFileDetails>
                  <span className="details-span name">{file.name}</span>
                  <span className="details-span name">{formattedDate}</span>
                </UploadFileDetails>
              </UploadFileContent>
              <i className="fas fa-check"></i>
            </FileRow>
          );
        })}
      </UploadedArea>
    </UploadBox>
  );
});

export default UploadFIleProgressBar;
