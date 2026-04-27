import React, { useState } from "react";

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginLeft: "20px" }}>
      <div
        // onClick={() => setIsOpen(!isOpen)}
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