import React, { useCallback, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import SideHeader from "./components/SideHeader";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import IndexBranch from "./components/branch";
import { Protected } from "./axios/Protected";
import { isAutheticated } from "./utils/auth";
import ChangePaasword from "./components/ChangePaasword";
import ChatBot from "./utils/ChatBot";
import IndexExercise from "./components/exercise";
import OtpVerify from "./components/VerifyOtp";
import NewPassword from "./components/NewPassword";
import Member from "./components/member/Member";
import IndexArticles from "./components/articles";
import IndexSettings from "./components/settings";
import IndexRoles from "./components/roles";
import IndexUser from "./components/users";
import Dashboard from "./components/dashboard";
import IndexAvatar from "./components/avatar";
import VoiceClone from "./components/voice-clone/VoiceClone";

function App() {
  const navigate = useNavigate();
  const { token } = isAutheticated();
  const HeaderLayout = useCallback(() => {
    if (token && window.location.pathname === "/") {
      navigate("/dashboard");
    } else if (!token && window.location.pathname === "/") {
      navigate("/");
    } else if (token && window.location.pathname === "/forgotPassword") {
      navigate("/dashboard");
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    HeaderLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {token && (
        <>
          <Header />
          <SideHeader />
        </>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/new-password" element={<NewPassword />} />

        <Route exact path="/" element={<Protected />}>
          <Route path="changePassword" element={<ChangePaasword />} />
          <Route path="member" element={<Member />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="voice-clone" element={<VoiceClone />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/branch/*" element={<IndexBranch />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/exercise/*" element={<IndexExercise />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/article/*" element={<IndexArticles />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/settings/*" element={<IndexSettings />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/roles/*" element={<IndexRoles />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/user/*" element={<IndexUser />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/avatar/*" element={<IndexAvatar />} />
        </Route>
      </Routes>

      {token && <Footer />}
    </>
  );
}

export default App;
