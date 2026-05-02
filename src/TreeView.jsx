import React from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data }) => {
  return (
    <div>
      {data.map(node => (
        <TreeNode key={node.id} node={node}  />
      ))}
    </div>
  );
};

export default TreeView;