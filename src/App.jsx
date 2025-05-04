import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddAlert from './pages/AddAlert';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-alert" element={<AddAlert />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
