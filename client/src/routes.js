import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import { HOME_ROUTE, LOGIN_ROUTE } from "./utils/constsRoute";

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage, // нужна ли эта страница?
  },
];

export const authRoutes = [
  //   {
  //     path: ,
  //     Component: ,
  //   },
];
