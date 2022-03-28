import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Details from "./Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  
  const [{ user }, dispatch] = useStateValue(); 
  return (
    <div className="app">
      {!user ? (
        // <h1>Log In</h1>
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            {" "}
            <Sidebar />
            <Routes>
              {" "}
              
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Details />
                  </>
                }
              />{" "}
              
              <Route
                path="/"
                element={
                  <>
                    <Details />
                  </>
                }
              />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
