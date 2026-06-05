import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";

const TableLayout = ({ hue }) => {
  const location = useLocation();
  const { access_token, files } = location.state || {};
  const navigate = useNavigate();
   const [fileName, setFileName] = useState("");
  const [items, setItems] = useState([
    ["id", "name", "age"],
    [1, "Pritam", 25],
    [2, "Vshal", 28],
    [3, "Jane", 28]
  ]);

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
    if (files == undefined) {



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
        <div className="table-body">
          
          <div className="table-container">
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
                    <td>
                      <button
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
                        ✏️
                      </button>

                      <button
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
                        ❌
                      </button>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default TableLayout;