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
import { Form, Input } from "@quark-uilib/components";
import { login, registration } from "../../http/userAPI";
import { AuthFormWrapper, ButtonLogin } from "./style";

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
    <AuthFormWrapper>
      <Form name="basic" className="form-login" onFinish={handleSubmit}>
        <Form.Field name="username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </Form.Field>
        {!isLogin && (
          <Form.Field name="email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
          </Form.Field>
        )}
        <Form.Field name="password">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </Form.Field>

        {isLogin ? (
          <Link className="link-login" to={REGISTRATION_ROUTE}>
            {"Don't have an account? Sign Up"}
          </Link>
        ) : (
          <Link className="link-login" to={LOGIN_ROUTE}>
            {"Do you have an account? Sign In"}
          </Link>
        )}
        <ButtonLogin type="submit">Login</ButtonLogin>
      </Form>
    </AuthFormWrapper>
  );
});

export default AuthPage;
