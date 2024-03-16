import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from "../../utils/constsRoute";
import { Form, Input, Button } from "@quark-uilib/components";
import { login, registration } from "../../http/userAPI";
import "./style.scss";

const AuthPage = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
      } else {
        data = await registration(username, email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(HOME_ROUTE);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="AuthFormWrapper">
      <Form name="basic" className="form-login" onFinish={handleSubmit}>
        <Form.Field name="username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Имя"
          />
        </Form.Field>
        {!isLogin && (
          <Form.Field name="email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Почта"
            />
          </Form.Field>
        )}
        <Form.Field name="password">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
        </Form.Field>

        {isLogin ? (
          <Link className="link-login" to={REGISTRATION_ROUTE}>
            {"У вас нет аккаунта? Зарегистрируйтесь"}
          </Link>
        ) : (
          <Link className="link-login" to={LOGIN_ROUTE}>
            {"У вас есть аккаунт? Войдите"}
          </Link>
        )}
        {isLogin ? (
          <Button className="ButtonLogin" type="submit">
            Войти
          </Button>
        ) : (
          <Button className="ButtonLogin" type="submit">
            Зарегистрироваться
          </Button>
        )}
      </Form>
    </div>
  );
});

export default AuthPage;
