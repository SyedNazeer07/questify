import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MentalHealth from "./pages/MentalHealth";
import Characters from "./pages/Characters";
import Store from "./pages/Store";
import Progress from "./pages/Progress";
import Journal from "./pages/Journal";

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ background: '#ffffff' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/store" element={<Store />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;