import styled from "styled-components";

export const UploadBox = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.05);

  .title {
    text-align: center;
    font-weight: 500;
    margin-top: 10px;
  }

  .upload-form {
    height: 170px;
    display: flex;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    border: 2px dashed #0086fe;

    & :where(p) {
      color: #0086fe;
      margin-top: 15px;
      font-size: 16px;
    }
  }
`;

export const FileInput = styled.input``;

export const Icon = styled.div``;

export const LoadingArea = styled.div``;

export const UploadedArea = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0%;
  }
`;

export const FileRow = styled.li`
  margin-bottom: 10px;
  background: #d5ebff;
  list-style: none;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    color: #0086fe;
    font-size: 30px;
  }
`;

export const LoadFileContent = styled.div`
  width: 100%;
  margin-left: 15px;
`;

export const LoadFileDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;

  .details-span {
    font-size: 12px;
  }
`;

export const FileLoadingBar = styled.div`
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
`;

export const FileLoading = styled.div`
  height: 100%;
  width: 10%;
  background: #0086fe;
  border-radius: inherit;
`;

export const UploadFileContent = styled.div``;

export const UploadFileDetails = styled.div`
  display: flex;
  margin-left: 15px;
  flex-direction: column;

  .details-span {
    font-size: 12px;
  }

  .size {
    color: #404040;
    font-size: 11px;
  }

  i.fa-cehck {
    font-size: 16px;
  }
`;
