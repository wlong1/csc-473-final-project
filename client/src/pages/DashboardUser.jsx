import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { getUserClaims } from '../lib/api';
import { isAuthenticated, getRole } from '../lib/auth';
import Layout from '../components/Layout';
import styles from '../styles/Listing.module.css';
import claimStyles from '../components/Claim.module.css';


export default function DashboardUser() {
    const navigate = useNavigate();
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        if (getRole != 'user') {
            navigate('/');
            return;
        }

        const fetchUserClaims = async () => {
            try {
                const data = await getUserClaims();
                setClaims(data);
            } catch (err) {
                console.error('Fetch failed:', err);
                setError(err.message || 'Failed to load your claims');
            }
        };

        fetchUserClaims();
    }, [navigate]);

    if (error) {
        return (
            <Layout>
                <div className="listing-detail error">
                    {error}
                </div>
            </Layout>
        );
    }

    if (!claims) {
        return (
            <Layout>
                <div className="listing-detail loading">
                    Loading...
                </div>
            </Layout>
        );
    }

    const pendingClaims = claims.filter(claim => claim.status === 'pending');
    const resolvedClaims = claims.filter(claim => claim.status !== 'pending');

    const ClaimItem = ({ claim }) => (
        <div className={claimStyles.claimItem}>
            <div className={`${claimStyles.claimContent} ${claimStyles.claimSpacer}`}>
                <Link to={`/listing/${claim.listingId}`} className={styles.titleLink}>
                    <h3>{claim.Listing.title}</h3>
                </Link>
                <p className={claimStyles.claimText}>{claim.message}</p>
                <div className={claimStyles.claimMeta}>
                    <span className={claimStyles.claimDate}>
                        Submitted: {new Date(claim.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`${claimStyles.claimStatus} ${
                        claim.status === 'accepted' ? claimStyles.statusActive : 
                        claim.status === 'rejected' ? claimStyles.statusInactive : ''
                    }`}>
                        Status: {claim.status}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className={styles.backgroundWrapper}>
                <div className={styles.content}>
                    <h1 className={styles.dashboardTitle}>Your Claims Dashboard</h1>
                    
                    {pendingClaims.length > 0 && (
                        <section className={styles.claimsSection}>
                            <h2>Active Claims</h2>
                            <div className={claimStyles.claimsList}>
                                {pendingClaims.map(claim => (
                                    <ClaimItem key={claim.id} claim={claim} />
                                ))}
                            </div>
                        </section>
                    )}

                    {resolvedClaims.length > 0 && (
                        <section className={styles.claimsSection}>
                            <h2>Resolved Claims</h2>
                            <div className={claimStyles.claimsList}>
                                {resolvedClaims.map(claim => (
                                    <ClaimItem key={claim.id} claim={claim} />
                                ))}
                            </div>
                        </section>
                    )}

                    {claims.length === 0 && (
                        <div className={styles.noClaims}>
                            <p>You haven't submitted any claims yet.</p>
                            <Link to="/listings" className={styles.browseLink}>
                                Browse lost items to submit a claim
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}