import { useContext, useEffect, useState } from "react";
import AppRouter from "./components/AppRouter.jsx";
import Header from "./layout/header/Header.jsx";
import { Preloader } from "@quark-uilib/components";
import { observer } from "mobx-react-lite";
import { Context } from "./index.jsx";
import { refreshToken } from "./http/userAPI.js";
import { jwtDecode } from "jwt-decode";
import { ScrollStyle } from "@quark-uilib/components";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let refToken = localStorage.getItem("refreshToken");
    let accessToken = localStorage.getItem("accessToken");
    if (refToken && accessToken) {
      try {
        const data = jwtDecode(accessToken);
        user.setUser(data);
        user.setIsAuth(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshToken();
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Preloader progress={20} type="circular" />;
  }

  return (
    <>
      <ScrollStyle />
      <Header />
      <main className={"main"}>
        <AppRouter />
      </main>
    </>
  );
});

export default App;
