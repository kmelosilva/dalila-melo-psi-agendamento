import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-4">{children}</div>
    </>
  );
};

export default Layout;
