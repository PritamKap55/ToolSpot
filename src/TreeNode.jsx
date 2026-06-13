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
        <span
          className="toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {node.children ? (isOpen ? "−" : "+") : ""}
        </span>

        <div className="node-card">

          <div>
            <span>⬇️</span>
            {node.name}
            <span>➡️</span>
            <span>❌</span>
          </div>
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