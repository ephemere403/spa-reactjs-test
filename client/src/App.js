import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NewRequestPage from "./pages/NewRequestPage";
import EditRequestPage from "./pages/EditRequestPage";
import GroupRequestPage from "./pages/GroupRequestsPage";
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/requests">
          <Route path="/requests/new" element={<NewRequestPage />} />
          <Route path="/requests/:id" element={<EditRequestPage/>}/>
          <Route path="/requests/my/:group" element={<GroupRequestPage />} />
        </Route>
      </Routes>
    </Layout>
          
  );
}

export default App;
