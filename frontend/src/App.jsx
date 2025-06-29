
import {Navigate, Route,Routes} from "react-router"
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
  const {data : authData , isLoading, error} = useQuery({
    queryKey:["authUser"],
    queryFn: async ()=>{
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false,
  });
  const authUser = authData?.user ;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <span className="loading loading-spinner text-primary" />
        <p className="ml-2 text-sm">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className= "h-screen" data-theme="night">
      <Routes>
        <Route path="/"  element={ authUser ? <HomePage /> : <Navigate to="/login" /> }  />
        <Route path="/signup"  element={ !authUser ? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/login"  element={ !authUser ? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/onboarding"  element={<OnboardingPage />} />
        <Route path="/call"  element={ authUser ? <CallPage /> : <Navigate to="/login" /> } />
        <Route path="/chat"  element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/notification"  element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
