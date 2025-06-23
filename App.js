import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import DashboardManager from './components/DashboardManager';
import DashboardEmployee from './components/DashboardEmployee';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/manager" element={<DashboardManager />} />
        <Route path="/employee" element={<DashboardEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
