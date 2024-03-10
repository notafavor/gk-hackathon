import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import TranscriptionPage from "./pages/TranscriptionPage/TranscriptionPage";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  TRANSCRIPTION_ROUTE,
} from "./utils/constsRoute";

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: TRANSCRIPTION_ROUTE,
    Component: TranscriptionPage,
  },
];

export const authRoutes = [
  //   {
  //     path: ,
  //     Component: ,
  //   },
];
