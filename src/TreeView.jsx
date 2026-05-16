import React from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data }) => {

   const toggles = document.querySelectorAll('.toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {

      const parentLi = toggle.closest('li');
      const children = parentLi.querySelector(':scope > .children');

      if (children) {
        children.classList.toggle('show');

        toggle.textContent =
          children.classList.contains('show') ? '−' : '+';
      }
    });
  });
  return (
    <div className="tree">
      <ul>
      {data.map(node => (
        <TreeNode key={node.id} node={node}  />
      ))}
      </ul>
    </div>
  );
};

export default TreeView;