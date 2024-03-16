import styled from "styled-components";

export const TranscriptionListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 50px
`;

export const TranscriptionItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  .divider {
    margin-left: 25px;
  }
`;

export const TranscriptionItemTitle = styled.div`
  display: flex;
  font-weight: 700;
  line-height: 32px;
  margin-right: 8px;
  width: 150px;
  max-width: 14vw;
  padding: 4px 12px;
  color: rgb(54, 65, 82);
`;

export const TranscriptionItemText = styled.div`
  width: 678px;
  overflow: hidden;
  font-size: 18px;
  letter-spacing: 0.35px;
  line-height: 32px;
  height: fit-content;
  margin-right: auto;
  color: #202939 !important;
`;

export const Divider = styled.div`
  width: 1px;
  display: flex;
  align-self: stretch;
  min-height: 1em;
  background-color: currentcolor;
  opacity: 0.25;
`;
