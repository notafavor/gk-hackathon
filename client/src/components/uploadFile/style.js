import styled from "styled-components";

export const Icon = styled.div``;

export const LoadingArea = styled.div`
  width: -webkit-fill-available;
`;

export const UploadedArea = styled.div`
  overflow-y: scroll;
  width: -webkit-fill-available;

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
