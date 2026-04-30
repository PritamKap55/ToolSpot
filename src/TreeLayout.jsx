import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate,useLocation } from "react-router-dom";
import TreeView from "./TreeView";

const TreeLayout = () => {
const location = useLocation();
const { access_token, files } = location.state || {};
const navigate = useNavigate();
const [treeData, setTreeData] = useState([]);

const getSheetData = async () => {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${files.id}/values/Sheet1!A1:C100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await res.json();

  const rows = data.values.slice(1);

  const list = rows.map(r => ({
  id: Number(r[0]),
  name: r[1],
  parent: Number(r[2]),
}));

const buildTree = (list) => {
  const map = {};
  const roots = [];

  list.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

   list.forEach(item => {
    if (item.parent === 0) {
      roots.push(map[item.id]);
    } else {
      map[item.parent]?.children.push(map[item.id]);
    }
  });
   return roots;
};

const treeData = buildTree(list);

const formattedTree = treeData.map(node => ({
  label: node.name,
  value: node.id,
  children: node.children,
}));

setTreeData(formattedTree);

};

useEffect(() => {
  getSheetData();
}, []);

  return (
  <div className="list-container">
  <h2 className="list-title">Shopping List</h2>

  <TreeView data={treeData} />
 
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

export default TreeLayout;