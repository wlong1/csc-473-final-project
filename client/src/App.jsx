import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ListingCreate from './pages/ListingCreate';
import Listing from './pages/Listing';
import ListingDetail from './pages/ListingDetail';
import ListingEdit from './pages/ListingEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listing/create" element={<ListingCreate />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:listingId" element={<ListingDetail />} />
        <Route path="/listing/:listingId/edit" element={<ListingEdit />} />
      </Routes>
    </Router>
  );
}

export default App;