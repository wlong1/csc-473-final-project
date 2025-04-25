import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateListing from './pages/CreateListing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listing/create" element={<CreateListing />} />
      </Routes>
    </Router>
  );
}

export default App;