import React, { useContext } from "react";
import { HeaderContainerStyled, HeaderStyled } from "./style";
import { observer } from "mobx-react-lite";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/constsRoute";
import { useNavigate } from "react-router-dom";
import { logOut, refreshToken } from "../../http/userAPI";
import { Button, Divider } from "@quark-uilib/components";
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
    window.location.reload();
  };

  return (
    <HeaderStyled>
      <div className="container">
        <HeaderContainerStyled>
          <Button size="l" viewType="link" onClick={() => navigate(HOME_ROUTE)}>
            Стенографист
          </Button>
          {user.isAuth ? (
            <Button size="m" color="red" onClick={handleLogOut}>
              Выйти
            </Button>
          ) : (
            <Button
              size="m"
              color="green"
              onClick={() => {
                navigate(LOGIN_ROUTE);
              }}
            >
              Авторизоваться
            </Button>
          )}
        </HeaderContainerStyled>
      </div>
      <Divider />
    </HeaderStyled>
  );
});

export default Header;
