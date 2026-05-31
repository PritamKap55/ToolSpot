import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";

const ListLayout = ({ hue, layout }) => {
  const location = useLocation();
  const { access_token, files } = location.state || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [fileName, setFileName] = useState("");

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
    if ((layout == "List") || (layout == "Check List")) {
      let NewAccount = [];
      while (NewAccount.length < 11) {
        NewAccount.push("");
      }
      setItems(NewAccount);
    } else {
      getSheetData();
    }
  }, []);

  return (
    <div>

      <div className="headerLayout" style={{ "--hue": hue }}>
        <h3>{!files ? "" : ` ${files.name}`}</h3>
      </div>
      
      <div className="bodyLayout" style={{ "--hue": hue }}>
        <div className="todo-paper">
          <div class="todo-body">
            {items.map((item, index) => (
              <div class="todo-line">
                {((files?.appProperties?.layout === "Check List") || layout === "Check List") && (
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
      </div>
      <div className="footrLayout" style={{ "--hue": hue }}>
        <div className="inputBox">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter File name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <button className="leaf-btn" onClick={() => getOrCreateFile()}>
           Download PDF
          </button>
          <button className="leaf-btn" onClick={() => getOrCreateFile()}>
           Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListLayout;