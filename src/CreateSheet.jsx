import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import TV from "./TV";
import { useNavigate, useLocation } from "react-router-dom";
import ListLayout from "./ListLayout";
import TableLayout from "./TableLayout";
import TreeLayout from "./TreeLayout";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CreateSheet({ hue }) {
  const location = useLocation();
  const { access_token } = location.state || {};
  const [layout, setLayout] = useState("List");
  const [fileName, setFileName] = useState("");
  const layoutOptions = ["List", "Check List", "Table", "Tree"];

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


  const [index, setIndex] = useState(0);
  const totalSlides = 4;

  const moveSlide = (direction) => {

    let newIndex = index + direction;

    if (newIndex < 0) {
      newIndex = totalSlides - 1;
    }

    if (newIndex >= totalSlides) {
      newIndex = 0;
    }

    setIndex(newIndex);
    setLayout(layoutOptions[newIndex])
  };

  const currentSlide = (n) => {
    setIndex(n);
    setLayout(layoutOptions[n])
  };

  return (
    <div>
      <div className="headerLayout" style={{ "--hue": hue }}>
        <h3>Select Option</h3>
        <h4> {layout}</h4>
      </div>
      <div className="bodyLayout" style={{ "--hue": hue }}>

        <div className="carousel">

          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >

            <div className="slide">
              <div className="card">
                <ListLayout layout="List" />
              </div>
            </div>

            <div className="slide">
              <div className="card">
                <ListLayout layout="Check List" />
              </div>
            </div>

            <div className="slide">
              <div className="card">
                <TableLayout />
              </div>
            </div>

            <div className="slide">
              <div className="card">
                <TreeLayout />
              </div>
            </div>

          </div>
          <button className="arrow prev" onClick={() => moveSlide(-1)}>
            ❮
          </button>
          <button className="arrow next" onClick={() => moveSlide(1)}>
            ❯
          </button>

        </div>

        <div className="dots">

          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`dot ${index === dot ? "active" : ""}`}
              onClick={() => currentSlide(dot)}
            ></span>
          ))}

        </div>
       
      </div>
      <div className="footrLayout" style={{ "--hue": hue }}>
        <div className="inputBox">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Acount name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <button className="leaf-btn" onClick={() => getOrCreateFile()}>
            Create Sheet
          </button>
        </div>
      </div>
      {/* <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={downloadCSV}>Download CSV</button> */}
    </div>
  );
}
export default CreateSheet;