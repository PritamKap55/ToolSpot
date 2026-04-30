import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate,useLocation } from "react-router-dom";

import ListLayout from "./ListLayout";
import TableLayout from "./TableLayout";
import TreeLayout from "./TreeLayout";
//import "./styles.css";


function DetailsPage() {
  const location = useLocation();
  const { access_token, files } = location.state || {};
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
  if (!access_token) {
     navigate("/")
    return;
  }

  Page_content();
}, [access_token]);


 async function Page_content(){

  const res = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1`,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
);

const data = await res.json();



 }

  
 

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
      <h2>{files.name}</h2>
      <div style={{ display: files.appProperties.layout.includes("List")? "block" : "none",  border: "1px solid black" }}>
     
          <ListLayout />
      </div>
      <div style={{ display: files.appProperties.layout=="Tree" ? "block" : "none", width: 200, border: "1px solid black" }}>
          <TreeLayout />
      </div>
      <div style={{ display: files.appProperties.layout=="Table" ? "block" : "none", width: 200, border: "1px solid black" }}>
          <TableLayout />
      </div>
    </div>
  );
}

export default DetailsPage;