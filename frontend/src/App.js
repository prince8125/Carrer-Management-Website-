import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/landingPage.js';
import UserLogin from './pages/userLoginPage';
import UserRegister from './pages/userRegister.js';
import UserProfilePage from "./pages/userProfilePage.js";
import UserAppliedCompanies from "./pages/userAppliedCompanies.js";
import AdminLogin from './pages/adminLoginPage.js';
import AdminRegister from "./pages/adminRegisterPage.js";
import PocViewPage from "./pages/pocViewPage.js";
import PocViewPageUserData from "./pages/pocViewPageUserData.js";
import UserHomePage from "./pages/userHomePage.js";
import AdminHomePage from "./pages/adminHomePage.js";
import AdminProfilePage from "./pages/adminProfilePage.js";
import AdminHomePageMain from "./pages/adminHomePageMain.js";
import AdminHomePageUserData from "./pages/adminHomePageUserData.js";
import AddLinkPage from "./pages/addLinkPage.js";
import AddSkillPage from "./pages/addSkillPage.js";
import PocViewPageMain from "./pages/pocViewPageMain.js";
import CreateNew from "./pages/createNew.js";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context} from "./index";
function App() { 
  const { setUser, setIsAuthenticated, setLoading,setAdmin } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/api/v1/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/api/v1/admin/me", {
        withCredentials: true,
      })
      .then((res) => {
        setAdmin(res.data.admin);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setAdmin({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/userLogin" element={<UserLogin />} />
    <Route path="/userRegister" element={<UserRegister />} />
    <Route path="/userProfile" element={<UserProfilePage />} />
    <Route path="/userAppliedCompanies" element={<UserAppliedCompanies />} />
    <Route path="/adminLogin" element={<AdminLogin />} />
    {/* <Route path="/adminRegister" element={<AdminRegister />} /> */}
    <Route path="/userLink" element={<AddLinkPage />} />
    <Route path="/userSkill" element={<AddSkillPage />} />
    <Route path="/userHomePage" element={<UserHomePage />} />
    <Route path="/adminHomePage" element={<AdminHomePageMain />} />
    <Route path="/admin/company/:id" element={<AdminHomePage />} />
    <Route path="/admin/user/:id" element={<AdminHomePageUserData />} />
    <Route path="/adminProfile" element={<AdminProfilePage />} />
    <Route path="/createNew" element={<CreateNew />} />
    <Route path="/pocView/company/:id" element={<PocViewPage/>} />
    <Route path="/pocViewMain" element={<PocViewPageMain/>} />
    <Route path="/pocView/user/:id" element={<PocViewPageUserData/>} />
    </Routes>
    <Toaster />
    </div>
    </BrowserRouter>
    
   
  );
}

export default App;
