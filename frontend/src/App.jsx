
import {Route,Routes} from "react-router"
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OnboardingPage from "./pages/OnboardingPage.jsx"
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import NotificationPage from "./pages/NotificationPage.jsx"

import  {Toaster} from 'react-hot-toast'
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import { axiosInstance } from "./lib/axios.js"


const App = () => {
  //axios
  //react query/ tanstack query
  const {data, isLoading, error} = useQuery({
    queryKey:["todos"],
    queryFn: async ()=>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false,
  });
  console.log(data);

  return (
    <div className= "h-screen" data-theme="night">
      <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/signup"  element={<SignUpPage />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/onboarding"  element={<OnboardingPage />} />
        <Route path="/call"  element={<CallPage />} />
        <Route path="/chat"  element={<ChatPage />} />
        <Route path="/notification"  element={<NotificationPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
