import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { getPendingClaims } from '../lib/api';
import { isAuthenticated, getRole } from '../lib/auth';
import Layout from '../components/Layout';
import styles from '../styles/Listing.module.css';
import claimStyles from '../components/Claim.module.css';

export default function DashboardAdmin() {
    const navigate = useNavigate();
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        
        if (getRole() !== 'admin') {
            navigate('/');
            return;
        }

        const fetchPendingClaims = async () => {
            try {
                const data = await getPendingClaims();
                setClaims(data);
            } catch (err) {
                console.error('Fetch failed:', err);
                setError(err.message || 'Failed to load pending claims');
            }
        };

        fetchPendingClaims();
    }, [navigate]);

    if (!isAuthenticated() || getRole() !== 'admin') {
        return null;
    }

    if (!claims) {
        return (
            <Layout>
                <div className={styles.backgroundWrapper}>
                    <div className={styles.content}>
                        <div className="listing-detail loading">
                            Loading pending claims...
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className={styles.backgroundWrapper}>
                    <div className={styles.content}>
                        <div className="listing-detail error">
                            {error}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    const ClaimItem = ({ claim }) => (
        <div className={claimStyles.claimItem}>
            <div className={`${claimStyles.claimContent} ${claimStyles.claimSpacer}`}>
                <div className={claimStyles.userInfo}>
                    <span className={claimStyles.username}>{claim.User.username}</span>
                    <span className={claimStyles.email}>{claim.User.email}</span>
                </div>
                
                <Link to={`/listing/${claim.listingId}`} className={styles.titleLink}>
                    <h3>{claim.Listing.title}</h3>
                </Link>
                
                <p className={claimStyles.claimText}>{claim.message}</p>
                
                <div className={claimStyles.claimMeta}>
                    <span className={claimStyles.claimDate}>
                        Submitted: {new Date(claim.createdAt).toLocaleDateString()}
                    </span>
                    <span className={claimStyles.claimStatus}>
                        Status: {claim.status}
                    </span>
                </div>
            </div>
            
            <div className={claimStyles.adminActions}>
                <button
                    onClick={() => navigate(`/listing/${claim.listingId}`)}
                    className={`${claimStyles.claimButton} ${styles.viewButton}`}
                >
                    View Listing
                </button>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className={styles.backgroundWrapper}>
                <div className={styles.content}>
                    <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
                    <button
                        onClick={() => navigate('/listing/create')}
                        className={styles.createButton}
                    >
                        Create New Listing
                    </button>
                    <h2 className={styles.dashboardSubtitle}>Pending Claims</h2>
                    {claims.length > 0 ? (
                        <section className={styles.claimsSection}>
                            <div className={claimStyles.claimsList}>
                                {claims.map(claim => (
                                    <ClaimItem key={claim.id} claim={claim} />
                                ))}
                            </div>
                        </section>
                    ) : (
                        <div className={styles.noClaims}>
                            <p>No pending claims at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}