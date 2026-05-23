import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import TV from "./TV";
import { useNavigate, useLocation } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CreateSheet() {

  const location = useLocation();
  const { access_token } = location.state || {};

  const [layout, setLayout] = useState("");
  const [fileName, setFileName] = useState("");
  const layoutOptions = ["List", "Check List", "Tree", "Table"];
  const items = ["Coffee", "Tea", "Coca Cola"];

  const treeData = [
    {
      id: 1,
      name: "Parent 1",
      children: [
        {
          id: 2,
          name: "Child 1",
          children: [
            { id: 3, name: "Grandchild 1" }
          ]
        },
        {
          id: 4, name: "Child 2",
          children: [
            { id: 3, name: "Grandchild 2" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Parent 2"
    }
  ];

  const data = [
    { id: 1, name: "Pritam", age: 25 },
    { id: 2, name: "Vshal", age: 28 },
    { id: 2, name: "Jane", age: 28 }
  ];

  const columns = Object.keys(data[0]);


  async function getOrCreateFile() {
    const query = `name='${fileName}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`;

    // 1️⃣ Check if file exists
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const searchData = await searchRes.json();

    if (searchData.files && searchData.files.length > 0) {
      // ✅ File exists
      const fileId = searchData.files[0].id;
      alert("File already exists:", fileId);
      return fileId;
    }

    // 2️⃣ Create file if not found
    const createRes = await fetch(
      "https://www.googleapis.com/drive/v3/files",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
          mimeType: "application/vnd.google-apps.spreadsheet",
          appProperties: {
            app: "PKapp",
            layout: layout
          }
        }),
      }
    );

    const createData = await createRes.json();
    alert("File created:", createData.id);


  }

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Items:", 10, 10);

    items.forEach((item, index) => {
      doc.text(`• ${item}`, 10, 20 + index * 10);
    });

    doc.save("list.pdf");
  };

  const downloadCSV = () => {
    // Add header
    const header = ["No,Item"];

    // Convert data
    const rows = items.map((item, index) => `${index + 1},${item}`);

    const csvContent = [header, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "items.csv";
    link.click();
  };

  return (

    <div className="container">
      <div className="innrContainer">
        <h3>Select Option</h3>
        <p> {layout}</p>
        
        <ul className="fileList">
          <li  onClick={() => setLayout(layoutOptions[0])}
            className={layoutOptions[0] === layout ? "innrDivActive" : "innrDiv"}
          >

            {open && (

              <ul>
                {items.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

          </li>
          <li className="fileList" onClick={() => setLayout(layoutOptions[1])}
            className={layoutOptions[1] === layout ? "innrDivActive" : "innrDiv"}
          >

            {open && (

              <ul>
                {items.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" disabled />
                    {item}
                  </li>
                ))}
              </ul>
            )}

          </li>

          <li className="fileList" onClick={() => setLayout(layoutOptions[2])}
            className={layoutOptions[2] === layout ? "innrDivActive" : "innrDiv"}
          >

            <TV data={treeData} disabled />

          </li>
          <li onClick={() => setLayout(layoutOptions[3])} 
            className={layoutOptions[3] === layout ? "innrDivActive" : "innrDiv"}
          >

            <table border="1">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td style={{padding:"4px"}} key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          </li>
        </ul>
        <input
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />

        <button onClick={() => getOrCreateFile()}>
          Create Sheet
        </button>

        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={downloadCSV}>Download CSV</button>
      </div>
    </div>
  );
}

export default CreateSheet;

