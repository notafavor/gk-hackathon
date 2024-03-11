import React from "react";
import { Container, Typography } from "@mui/material";
import { HeaderContainerStyled, HeaderStyled } from "./style";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/constsRoute";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderStyled>
      <Container maxWidth="lg">
        <HeaderContainerStyled>
          <Link to={HOME_ROUTE}>
            <Typography
              variant="h5"
              noWrap
              component="a"
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
          </Link>
          <Link to={LOGIN_ROUTE}>Войти</Link>
        </HeaderContainerStyled>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
