import React, { useRef, useState } from "react";
import { ReactComponent as UploadIcon } from "../../assets/img/uploadFile.svg";
import axios from "axios";
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

const UploadFIleProgressBar = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split(".")[1]}`
        : file.name;

    const formData = new FormData();

    formData.append("files", file);
    setFiles((prevState) => [...prevState, { name: fileName, loading: 0 }]);
    setShowProgress(true);
    axios
      .post("http://127.0.0.1:5000/api", formData, {
        onUploadProgress: ({ loaded, total }) => {
          setFiles((prevState) => {
            const newFiles = [...prevState];
            newFiles[newFiles.length - 1].loading = Math.floor(
              (loaded / total) * 100
            );
            return newFiles;
          });
          if (loaded === total) {
            const fileSize =
              total < 1024
                ? `${total} KB`
                : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
            setUploadedFiles([
              ...uploadedFiles,
              { name: fileName, size: fileSize },
            ]);
            setFiles([]);
            setShowProgress(false);
          }
        },
      })
      .catch(console.error);
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
        {uploadedFiles.map((file, index) => (
          <FileRow key={index}>
            <UploadFileContent className="upload">
              <i className="fas fa-file-alt"></i>
              <UploadFileDetails>
                <span className="details-span name">{file.name}</span>
                <span className="details-span size">{file.size}</span>
              </UploadFileDetails>
            </UploadFileContent>
            <i className="fas fa-check"></i>
          </FileRow>
        ))}
      </UploadedArea>
    </UploadBox>
  );
};

export default UploadFIleProgressBar;
