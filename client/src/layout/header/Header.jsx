import React, { useContext } from "react";
import { Container, Typography } from "@mui/material";
import { HeaderContainerStyled, HeaderStyled } from "./style";
import { observer } from "mobx-react-lite";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/constsRoute";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { logOut, refreshToken } from "../../http/userAPI";
import { Context } from "../..";

const Header = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshToken();
          await logOut();
        } catch (refreshError) {
          console.error("Failed to refresh token or log out:", refreshError);
        }
      } else {
        console.error("Failed to log out:", error);
      }
    }
    user.setUser({});
    user.setIsAuth(false);
    navigate(HOME_ROUTE);
  };

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
          {user.isAuth ? (
            <Button variant="outlined" onClick={handleLogOut}>
              Log out
            </Button>
          ) : (
            <Link to={LOGIN_ROUTE}>Sign In</Link>
          )}
        </HeaderContainerStyled>
      </Container>
    </HeaderStyled>
  );
});

export default Header;
