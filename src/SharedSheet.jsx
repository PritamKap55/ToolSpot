import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";

function SharedSheet() {
  const location = useLocation();
  const { access_token, files, hue } = location.state || {};
  console.log(files);
  const { id } = useParams();
  const [email, setEmail] = useState("");

  async function shareLogin() {

     const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${files.id}/permissions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: "writer", // or "reader"
            type: "user",
            emailAddress: email,
          }),
        }
      );

      const data = await res.json();

      if (data.id) {
        alert("Sheet shared successfully ✅");
      } else {
        alert("Error sharing sheet ❌");
      }

  }


  return (
    <div>

      <div className="headerLayout" style={{ "--hue": hue }}>
        <h4> {files.name}</h4>
      </div>
      <div className="bodyLayout" style={{ "--hue": hue }}>
        
        <div className="inputBox">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Acount name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="footrLayout" style={{ "--hue": hue }}>
        <button onClick={() => shareLogin()}>
          Share Sheet
        </button>
      </div>

    </div>
  );
}

export default SharedSheet;