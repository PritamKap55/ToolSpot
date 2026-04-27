import { useState } from "react";
export const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  const changeColor = () => {
    const randomColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setBgColor(randomColor);
  };

  return (
    <div
      onClick={changeColor}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
      }}
    >
      {children}
    </div>
  );
};