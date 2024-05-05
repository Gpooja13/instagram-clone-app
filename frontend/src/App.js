import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import CreatePost from "./screens/CreatePost";
import Error from "./components/Error";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { LoginContext } from "./context/LoginContext";
import UserProfile from "./screens/UserProfile";
import Explore from "./screens/Explore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SearchModal from "./components/SearchModal";
import Forgot from "./screens/Forgot";
import ChangePassword from "./screens/ChangePassword";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="715281373099-rnp1d2vte3fr364qsui8fou90lu598t5.apps.googleusercontent.com">
        <LoginContext.Provider
          value={{ setUserLogin, setModalOpen, setSearchOpen }}
        >
          <Navbar
            login={userLogin}
            modalOpen={modalOpen}
            searchOpen={searchOpen}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/updatePassword/:token" element={<ChangePassword/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile/:userid" element={<UserProfile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          <ToastContainer />
          {modalOpen && <Modal/>}
          {searchOpen && <SearchModal />}
        </LoginContext.Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
