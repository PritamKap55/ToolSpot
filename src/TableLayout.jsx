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
    `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await res.json();

 setItems(data.values || []);
};

useEffect(() => {
  getSheetData();
}, []);

  return (
  <div className="list-container">
  <h2 className="list-title">Table List</h2>

  <table className="list-table" border="1" cellPadding="10">
  <thead>
    <tr>
      {items[0]?.map((header, i) => (
        <th key={i}>{header}</th>
      ))}
    </tr>
  </thead>

  <tbody>
    {items.slice(1).map((row, rowIndex) => (
      <tr key={rowIndex}>
        {items[0].map((_, colIndex) => (
          <td key={colIndex}>{row[colIndex] || ""}</td>
        ))}
        <td><button
        className="list-update-btn"
        onClick={() =>
          navigate("/TableLayoutEdit", {
            state: {
              access_token,
              files,
              selectedId: rowIndex + 2,
            },
          })
        }
      >
        Update
      </button></td>
      </tr>
    ))}
  </tbody>
</table>

  <button
    className="list-add-btn"
    onClick={() =>
      navigate("/TableLayoutEdit", {
        state: {
          access_token,
          files,
          selectedId: "1",
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