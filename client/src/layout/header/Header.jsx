import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Container, Typography } from "@mui/material";
import { HeaderContainerStyled, HeaderStyled } from "./style";

const Header = () => {
  return (
    <HeaderStyled>
      <Container maxWidth="lg">
        <HeaderContainerStyled>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#!"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
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
        </HeaderContainerStyled>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
