import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/DashboardAdmin';
import Listing from './pages/Listing';
import ListingCreate from './pages/ListingCreate';
import ListingDetail from './pages/ListingDetail';
import ListingEdit from './pages/ListingEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/create" element={<ListingCreate />} />
        <Route path="/listing/:listingId" element={<ListingDetail />} />
        <Route path="/listing/:listingId/edit" element={<ListingEdit />} />
      </Routes>
    </Router>
  );
}

export default App;