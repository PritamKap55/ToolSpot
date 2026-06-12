import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Accounts from "./AccountsPage";
import SheetsPage from "./SheetsPage";
import CreateSheet from "./CreateSheet";
import SheetDetail from "./SheetDetail";
import SharedSheet from "./SharedSheet";
import Details from "./DetailsPage";
import ListLayoutEdit from "./ListLayoutEdit";
import TableLayoutEdit from "./TableLayoutEdit";
import TreeLayoutEdit from "./TreeLayoutEdit";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [huechecke, setHuechecke] = useState(false);
  const [hue, setHue] = useState(50);
  return (
    <div className={ huechecke ? "theme":""}>
      <div className="container1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage hue={hue}  />} />
            <Route path="/sheets" element={<SheetsPage hue={hue}  />} />
            <Route path="/accounts" element={<Accounts hue={hue} />} />
            <Route path="/create" element={<CreateSheet hue={hue}  />} />
            <Route path="/sheet/:id" element={<SheetDetail hue={hue}  />} />
            <Route path="/Share" element={<SharedSheet hue={hue}  />} />
            <Route path="/Details" element={<Details hue={hue}  />} />
            <Route path="/ListLayoutEdit" element={<ListLayoutEdit hue={hue}  />} />
            <Route path="/TableLayoutEdit" element={<TableLayoutEdit hue={hue}  />} />
            <Route path="/TreeLayoutEdit" element={<TreeLayoutEdit hue={hue}  />} />
          </Routes>
        </BrowserRouter>
        <div className="settings">
          <div
            className="settingBtn"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⚙️

          </div>

          {showMenu && (
            <div>


              <div className="slidecontainer">

                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={(e) => setHue(e.target.value)}
                  className="slider rainbow"
                  id="myRange"
                  style={{ margin: "0" }}
                />

                <input
                  type="checkbox"
                  checked={huechecke}
                  onChange={(e) => setHuechecke(e.target.checked)}
                />
              </div>
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;