import React from "react";
import { Container, Typography } from "@mui/material";
import { AuthContainerStyled, AuthStyled } from "./style";
import { GoogleLogin } from "@react-oauth/google";

const AuthPage = () => {
  return (
    <AuthStyled>
      <Container maxWidth="lg">
        <AuthContainerStyled>
          <Typography className="authTitle" variant="h5" component="h5">
            Регистрация
          </Typography>
          <GoogleLogin
            shape="circle"
            text="signin"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </AuthContainerStyled>
      </Container>
    </AuthStyled>
  );
};

export default AuthPage;
