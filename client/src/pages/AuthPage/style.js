import styled from "styled-components";
import { Button } from "@quark-uilib/components";

export const AuthFormWrapper = styled.div`
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;

  .form-login {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .link-login {
    color: #000;
    margin-top: 8px;
    transition: 0.3s all;

    &:hover {
      color: #15ac89;
    }
  }
`;

export const ButtonLogin = styled(Button)`
  margin-top: 18px;
`;
