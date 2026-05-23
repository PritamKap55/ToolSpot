import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";

const ListLayout = () => {
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
    const values = data.values || [];
    const flat = values.map(row => row[0]);
    let updated = [...flat];

    if (updated.length < 10) {
      while (updated.length < 11) {
        updated.push("");
      }
    } else {
      updated.push("");
    }

    setItems(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  useEffect(() => {
    getSheetData();
  }, []);

  return (
    <div className="todo-paper">

      <div className="todo-header">
        <h2>{files.name}</h2>
      </div>


      <div class="todo-body">
        {items.map((item, index) => (
          <div class="todo-line">

            {files.appProperties.layout == "Check List" && (
              <input className="check-box" type="checkbox" />
            )}

            <input className="line-space input-box" type="text" value={item}
              onChange={(e) => handleChange(index, e.target.value)}
            />

            <div>
              📌
            </div>

          </div>
        ))}


      </div>
    </div>
  );
};

export default ListLayout;