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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { createContext, useState } from "react";
import { LoginContext } from "./context/LoginContext";
import UserProfile from "./components/UserProfile";
import MyFollowingPost from "./screens/MyFollowingPost";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
        <Navbar login={userLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/profile/:userid" element={<UserProfile />} />
          <Route path="/myfollowingpost" element={<MyFollowingPost />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
        {modalOpen && <Modal/>}
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
