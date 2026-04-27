import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

function SheetDetail() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/spreadsheets",
    onSuccess: async (tokenResponse) => {

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1!A:B:append?valueInputOption=RAW`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[name, value]],
          }),
        }
      );

      const data = await res.json();


      alert("Data added ✅");
    },
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Update Sheet</h2>

      <p>Sheet ID: {id}</p>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Enter Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <br /><br />

      <button onClick={() => login()}>
        Add Data
      </button>
    </div>
  );
}

export default SheetDetail;