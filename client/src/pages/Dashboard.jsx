import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isAuthenticated, getRole } from '../lib/auth';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        if (getRole() == 'user') {
            navigate('/dashboard/user');
            return;
        }
        if (getRole() == 'admin') {
            navigate('/dashboard/admin');
            return;
        }
    }, [navigate]);

    return
}