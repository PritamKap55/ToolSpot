import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { access_token, files } = location.state || {};

  return (

     <li>
      <div className="node-row">
        <button
          className="toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {node.children ? (isOpen ? "−" : "+") : ""}
        </button>

        <div className="node-card">
          <div className="node-header">
            <span className="dot"></span>
            MODEL
          </div>

          <div className="node-body">{node.name}</div>
        </div>
      </div>

      {isOpen && node.children && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
    
    
  );
};

export default TreeNode;