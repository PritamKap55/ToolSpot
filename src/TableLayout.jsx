import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate,useLocation } from "react-router-dom";

const TableLayout = () => {
const location = useLocation();
const { access_token, files } = location.state || {};
const navigate = useNavigate();
const [items, setItems] = useState([]);

const getSheetData = async () => {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1!A1:A100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);

  // Extract values safely
  const values = data.values || [];

  // Convert [["A"], ["B"]] → ["A", "B"]
  const flat = values.map(row => row[0]);

  setItems(flat);
};

useEffect(() => {
  getSheetData();
}, []);

  return (
  <div className="list-container">
  <h2 className="list-title">Shopping List</h2>

  {items.map((item, index) => (
    <div className="list-row" key={index}>
      {files.appProperties.layout=="Check List" && (
        <input type="checkbox" />
        ) }
      
      <span className="list-line">{item}</span>

      <button
        className="list-update-btn"
        onClick={() =>
          navigate("/ListLayoutEdit", {
            state: {
              access_token,
              files,
              selectedId: index + 1,
            },
          })
        }
      >
        Update
      </button>
    </div>
  ))}

  <button
    className="list-add-btn"
    onClick={() =>
      navigate("/ListLayoutEdit", {
        state: {
          access_token,
          files,
          selectedId: "",
        },
      })
    }
  >
    + Add Item
  </button>
</div>
  );
};

export default TableLayout;