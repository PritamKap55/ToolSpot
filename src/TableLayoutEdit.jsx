import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";

const TableLayoutEdit = ({ hue }) => {

  const location = useLocation();
  const { access_token, files, selectedId } = location.state || {};
  const navigate = useNavigate();
  const [fildName, setFildName] = useState("");
  const [formData, setFormData] = useState([]);

  useEffect(() => {

    if (!access_token) {
      alert("access_token Error")
      return;
    } else {
      GetValue();
    }

  }, [access_token]);


  async function GetValue() {

    if (selectedId != "") {

      const response1 = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values:batchGet?ranges=Sheet1!1:1&ranges=Sheet1!${selectedId}:${selectedId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await response1.json();   // 🔥 IMPORTANT
      console.log("Sheet Data:", data);
      const headers = data.valueRanges[0]?.values?.[0] || [];
      let row = [];

      row = data.valueRanges[1]?.values?.[0] || [];

      const formatted = headers.map((key, index) => ({
        label: key,
        value: row[index] || "",
      }));

      setFormData(formatted);

    }


  }

  async function Submit() {

    if (selectedId != "0") {
      const updatedRow = formData.map(item => item.value);
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1!${selectedId}:${selectedId}?valueInputOption=RAW`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            range: `Sheet1!${selectedId}:${selectedId}`,
            majorDimension: "ROWS",
            values: [updatedRow],
          }),
        }
      );
    } else {

      const newRow = formData.map(item => item.value);

      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1:append?valueInputOption=RAW`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [newRow],
          }),
        }
      );
    }


  }

  const handleChange = (index, newValue) => {
    const updated = [...formData];
    updated[index].value = newValue;
    setFormData(updated);
  };

  const AddColoum = () => {
    setFormData([
    ...formData,
    { value: "" }
  ]);
  };

  return (
    <div>
      <div className="headerLayout" style={{ "--hue": hue }}>
        <h3>Edit</h3>
      </div>
      <div className="bodyLayout" style={{ "--hue": hue }}>

        {formData.map((item, index) => (
          <div className="inputBox">
            <label style={{ fontWeight: "bold" }}>{selectedId == "1" ? "Name" : item.label}</label>
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="footrLayout" style={{ "--hue": hue }}>
        {selectedId == "1" ? (
          <button className="leaf-btn" onClick={() => AddColoum()}>
            Add
          </button>
        ) : null}
        <button className="leaf-btn" onClick={() => Submit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TableLayoutEdit;