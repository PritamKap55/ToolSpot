import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
//import "./styles.css";

const CLIENT_ID = "470784951477-1mcdh3c1puclmb9ttot8mchl3onvsshb.apps.googleusercontent.com";
const API_KEY = "AIzaSyDfHDufNfyeUpX0BoI8uG5BVKiK1VbvNm8";

function SheetsPage() {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

    const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/drive.readonly",
    onSuccess: async (tokenResponse) => {


      // get user info
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + tokenResponse.access_token
      ).then(res => res.json());

      setUser(userInfo);

      // fetch Google Sheets files
      const driveRes = await fetch(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet' and name contains 'PKapp'&fields=files(id,name)",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const data = await driveRes.json();
      setFiles(data.files);
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Google Sheets Viewer 🚀</h2>

      {!user ? (
        <button onClick={() => login()}>
          Login & Load Sheets
        </button>
      ) : (
        <div>
          <h3>Welcome {user.name}</h3>
          <p>{user.email}</p>

          <button className="leaf-btn" onClick={() => navigate("/create")}>
            Create New Sheet
          </button>

          <h4>Your Sheets:</h4>
          <ul className="fileList">
            {files.map((file,index) => (
              <li key={file.id} className="fileItem">
                <span className="fileNumber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                 <span className="fileName">{file.name}</span>
                <button onClick={() => navigate(`/sheet/${file.id}`)}>
                    Open
                </button>
                <button onClick={() => navigate(`/Share/${file.id}`)}>
                    Share
                </button>
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SheetsPage;