import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

function SharedSheet() {
  const { id } = useParams();
  const [email, setEmail] = useState("");

  const shareLogin = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/drive",
    onSuccess: async (tokenResponse) => {

      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}/permissions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
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
    },
    onError: () => console.log("Error"),
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Share Sheet</h2>

      <p>Sheet ID: {id}</p>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={() => shareLogin()}>
        Share Sheet
      </button>
    </div>
  );
}

export default SharedSheet;