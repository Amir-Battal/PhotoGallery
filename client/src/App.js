import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./Auth";


function App() {

  // const user = localStorage.getItem("user");

  return (
    <Routes>
      {/* {user && <Route path="/" exact element={ Auth.auth() ? <Main/> : <Navigate replace to="/login" />} />} */}
      <Route path="/" element={ Auth.auth() ? <Main/> : <Navigate replace to = "/login" />} />
      <Route path="/register" exact element={ Auth.guest() ? <Register/> : <Navigate replace to="/" />} />
      <Route path="/login" exact element={ Auth.guest() ? <Login/> : <Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
