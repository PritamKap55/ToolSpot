import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate,useLocation } from "react-router-dom";

const TreeLayoutEdit = () => {

  const location = useLocation();
  const { access_token, files, selectedId } = location.state || {};
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
      
  if (!access_token) {
     alert("access_token Error")
    return;
  }else {
   GetValue();
  }

}, [access_token]);

async function GetValue() {

    if (selectedId !="")
    { 

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1!${selectedId}:${selectedId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await res.json();
      setSelectedRow(data.values[0]);
      console.log(selectedRow)

    } 
      
  }


  async function Update() {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1!B${selectedId}?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[fildName]],
          }),
        }
      );
    }
  
  async function Add() {

    await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1!B1:append?valueInputOption=USER_ENTERED`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: [[20,fildName,5]]
            }),
          }
        );
    }
        

  


  return (
    <div>
      <h3>Edit</h3>

      <input
        type="text"
       
        value=""
        onChange={(e) => setFildName(e.target.value)}
      />

       <input
    type="checkbox"
    //onClick={(e) => e.stopPropagation()} // prevent expand/collapse
  />
       <button onClick={() => Update()}>
        Update
       </button>
       <button onClick={() => Add()}>
        Add
       </button>
      
      
    </div>
  );
};

export default TreeLayoutEdit;