import React from "react";
import TN from "./TN";

const TV = ({ data }) => {
  return (
    <div>
      {data.map(node => (
        <TN key={node.id} node={node} disabled={true} />
      ))}
    </div>
  );
};

export default TV;