import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Applayout = ({ mode, handelmode }) => {
  return (
    <>
      <Nav mode={mode} handelmode={handelmode} />
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </>
  );
};

export default Applayout;
