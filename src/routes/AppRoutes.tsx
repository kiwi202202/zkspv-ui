import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Banner from "../components/Banner";
import QueryTxHashPage from "../pages/QueryTxHashPage";
import RetrieveZKProofPage from "../pages/RetrieveZKProofPage";
import L1VerificationPage from "../pages/L1VerificationPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Banner />
      <Routes>
        <Route path="/" element={<QueryTxHashPage />} />
        <Route path="/retrieve-zk-proof" element={<RetrieveZKProofPage />} />
        <Route path="/l1-verification" element={<L1VerificationPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
