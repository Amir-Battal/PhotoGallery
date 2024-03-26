import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./Auth";
import MyPhoto from "./components/MyPhotos";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/register" element={Auth.guest() ? <Register/> : <Navigate replace to="/" />} />
      <Route path="/login" element={Auth.guest() ? <Login/> : <Navigate replace to="/" />} />

      <Route path="/myphoto" exact element={ Auth.auth() ? <MyPhoto/> : <Navigate replace to="/" /> } />
    </Routes>
  );
}

export default App;
