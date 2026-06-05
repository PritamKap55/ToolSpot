import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";


function AccountsPage({hue}) {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const access_token = location.state;


  useEffect(() => {
    if (!access_token) {
      navigate("/")
      return;
    }

    Account_details();
  }, [access_token]);

  async function Account_details() {
    const userInfo = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token
    ).then(res => res.json());
    setUser(userInfo);

    const query =
      "mimeType='application/vnd.google-apps.spreadsheet' and appProperties has { key='app' and value='PKapp' } and trashed=false";

    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      query
    )}&fields=files(id,name,appProperties)`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await res.json();

    setFiles(data.files);


  }

  return (

    <div>
      <div className="headerLayout" style={{ "--hue": hue }}>
        <h4>Account</h4>
      </div>
      <div className="bodyLayout" style={{ "--hue": hue }}>
        
        {!user ? (
          <button onClick={() => navigate("/sheets")}>
            Re Login
          </button>
        ) : (
          <div className="innrContainer">

            

            <ul className="fileList">
              {files.map((file, index) => (
                <li key={file.id}
                  className={`fileItem ${selectedFile?.id === file.id ? "active" : ""}`}
                  onClick={() => setSelectedFile(file)} >
                  <span className="fileNumber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="fileName">{file.name}</span>

                </li>
              ))}
            </ul>


          </div>
        )}
      </div>
      <div className="footrLayout" style={{ "--hue": hue }}>
        <div>
          <button className="leaf-btn" onClick={() => navigate("/Details", { state: { access_token: access_token, files: selectedFile,hue:hue } })}>
            Open
          </button>
          <button className="leaf-btn" onClick={() => navigate("/Share/${selectedId}")}>
            Share
          </button>
        </div>
        <div style={{ margin: '20px' }}>
          <button className="leaf-btn" onClick={() => navigate("/create", { state: { access_token: access_token } })}>
            Create New Account
          </button>
        </div>
      </div>

    </div>
  );
}

export default AccountsPage;