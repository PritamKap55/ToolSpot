import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Accounts from "./AccountsPage";
import SheetsPage from "./SheetsPage";
import CreateSheet from "./CreateSheet";
import SheetDetail from "./SheetDetail";
import SharedSheet from "./SharedSheet";
import Details from "./DetailsPage";
import ListLayoutEdit from "./ListLayoutEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sheets" element={<SheetsPage />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/create" element={<CreateSheet />} />
        <Route path="/sheet/:id" element={<SheetDetail />} />
        <Route path="/Share/:id" element={<SharedSheet />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/ListLayoutEdit" element={<ListLayoutEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;