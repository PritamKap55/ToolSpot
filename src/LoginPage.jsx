import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
//import "./styles.css";

function LoginPage() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

    const login = useGoogleLogin({
      onSuccess: (res) => {

        const access_token = res.access_token;

        navigate("/accounts",{ state: access_token });
      },
      });

  return (
    <ThemeProvider >
      <div>
        <h1>Welcome!..</h1>
     
        <div className="container">
          <div className="button" onClick={() => login()}>
            <span className="buttonText">Login</span>
          </div>
        </div>
          
     </div>
    </ThemeProvider>
   
  );
}

export default LoginPage;