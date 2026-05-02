import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { access_token, files } = location.state || {};

  return (
    <div style={{ marginLeft: "20px" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        {/* ✅ FIX HERE */}
        <span
          style={{
            width: "20px",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          {node.children ? (isOpen ? "▼" : "▶") : ""}
        </span>

        <span>{node.name}</span>
        <span>{node.id}</span>
        <span>{node.rowNumber}</span>
         
        <button
        className="list-update-btn"
        onClick={() =>
          navigate("/TreeLayoutEdit", {
            state: {
              access_token,
              files,
              selectedId: node.rowNumber
            },
          })
        }
      >
        Update
      </button>
      </div>

      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
            
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;