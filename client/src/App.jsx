import AppRouter from "./components/AppRouter.jsx";
import Header from "./layout/header/Header.jsx";

const App = () => {
  return (
    <>
      <Header />
      <main className={"main"}>
        <AppRouter />
      </main>
    </>
  );
};

export default App;
