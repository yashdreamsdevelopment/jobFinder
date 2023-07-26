import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import VerifyEmail from "./components/VerifyEmail";
import Main from "./components/Main/Main.jsx";

import { withUserProvider } from "./context/user/UserContext";
import { withToastProvider } from "./context/toast/ToastContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default withUserProvider(withToastProvider(App));
