import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { verifyToken } from '../lib/api';
import { clearAuthToken, clearRole } from '../lib/auth';

export default function checkToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const isValid = await verifyToken();
      if (!isValid) {
        clearAuthToken();
        clearRole();
        navigate('/login');
      }
    };
    check();
  }, [navigate]);
}
