import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NewRequestPage from "./pages/NewRequestPage";


function App() {
  return (
    <Routes>
      <Route path ="/" element = {<DashboardPage />}/>
      <Route path ="/dashboard" element = {<DashboardPage />}/>
      <Route path ="/new" element = {<NewRequestPage />}/>
    </Routes> 
  );
}

export default App;
