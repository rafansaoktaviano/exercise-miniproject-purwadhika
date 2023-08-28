import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import MainPage from "./Pages/MainPage/MainPage";
import Cardpage from "./Pages/CardPage/Cardpage";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarWithCTAButton from "./Components/Nav/Nav";
import Refferalpage from "./Pages/RefferalPage/Refferalpage";

function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);


  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    // setEmail(""); // Clear the email state
    // Other logout logic
    setUserId(null)
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      setUserId(storedUser)
    }

  }, []);

  const onSubmitLogin = async (refEmailLogin, refPasswordLogin) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${refEmailLogin.current.value}&password=${refPasswordLogin.current.value}`
      );
        
      if (!response.data.length) {
        return toast.error(
          "Login Failed, Input Your Credentials or Don't forget to fill the correct email address"
        );
      }

      toast.success("Login Success");
      setTimeout(() => {
        // setEmail(response.data[0].email);
        localStorage.setItem("user", response.data[0].id);
        const localId = localStorage.getItem("user");
        setUserId(localId)
        console.log(localId);
        history("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavbarWithCTAButton orang={userId} onClicks={handleLogout} />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login handleLoginFromApp={onSubmitLogin} />}
        />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/cardpage/:eventId" element={<Cardpage />} />
        <Route path="/test/:idReffCard" element={<Refferalpage />} />
      </Routes>
    </>
  );
}

export default App;
