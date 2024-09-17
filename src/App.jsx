import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./components/layout/Applayout";
import Addnote from "./pages/Addnote";
import Log from "./pages/log";
import { UserContextProvider } from "./context/UsercontextProvider";
import { NoteProvider } from "./context";



function App() {
  const [mode, setMode] = useState("dark");

  const handelmode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout mode={mode} handelmode={handelmode} />, // Layout component
      children: [
        {
          path: "login",
          element: <Log mode={mode} />,
        },
        {
          path: "addnote",
          element: <Addnote mode={mode} />,
        },
        {
          path: "/", // Default route
          element: <Log mode={mode} />, // Default route element
        }
      ],
    },
  ]);

  return (
    <NoteProvider>
    <UserContextProvider>
    <div
      className={`${
        mode === "light" ? "bg-white text-black" : "bg-slate-900 text-white"
      } min-h-screen`}
    >
      <RouterProvider router={router} />
    </div>
    </UserContextProvider>
    </NoteProvider>
  );
}

export default App;
