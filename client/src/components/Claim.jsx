import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { getListingClaim, getUserClaims, createClaim, updateClaim, updateClaimStatus } from '../lib/api';
import { isAuthenticated, getRole } from '../lib/auth';
import styles from './Claim.module.css';

const AdminClaimView = ({ claims, onStatusUpdate }) => (
    <div className={styles.adminClaim}>
        <h2>All Claims</h2>
        {claims.map(claim => (
            <div key={claim.id} className={styles.claimItem}>
                <div className={`${styles.claimContent} ${styles.claimSpacer}`}>
                    <div className={styles.userInfo}>
                        <span className={styles.username}>{claim.User.username}</span>
                        <span className={styles.email}>{claim.User.email}</span>
                    </div>
                    <p className={styles.claimText}>{claim.message}</p>
                    <div className={styles.claimMeta}>
                        <span className={styles.claimDate}>
                            {new Date(claim.updatedAt).toLocaleDateString()}
                        </span>
                        <span className={styles.claimStatus}>
                            Status: {claim.status}
                        </span>
                    </div>
                </div>
                <div className={styles.adminActions}>
                    <button
                        onClick={() => onStatusUpdate(claim.id, 'accepted')}
                        disabled={claim.status === 'accepted'}
                        className={`${styles.claimButton} ${styles.acceptButton}`}
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => onStatusUpdate(claim.id, 'rejected')}
                        disabled={claim.status === 'rejected'}
                        className={`${styles.claimButton} ${styles.rejectButton}`}
                    >
                        Reject
                    </button>
                </div>
            </div>
        ))}
    </div>
);

const UserClaimView = ({ claims, message, handleSubmit, setMessage }) => (
    <div className={styles.userClaim}>
        {claims.length > 0 && (
            <div className={styles.currentClaim}>
                <h3>Your Claim</h3>
                <div className={styles.claimContent}>
                    <p>{claims[0].message}</p>
                    <div className={styles.claimMeta}>
                        <span className={styles.claimDate}>
                            {new Date(claims[0].updatedAt).toLocaleDateString()}
                        </span>
                        <span className={styles.claimStatus}>
                            Status: {claims[0].status}
                        </span>
                    </div>
                </div>
            </div>
        )}
        <form onSubmit={handleSubmit} className={styles.claimForm}>
            <h3>{claims.length > 0 ? "Update Claim" : "Submit New Claim"}</h3>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter claim details"
                required
            />
            <button type="submit" className={styles.claimButton}>
                {claims.length > 0 ? "Update Claim" : "Submit Claim"}
            </button>
        </form>
    </div>
);

export default function ClaimSection({ listingId }) {
	const [claims, setClaims] = useState([]);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const role = getRole();
	const isAdmin = role === 'admin';
	const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchClaims = async () => {
            try {
                let data;
                if (isAdmin) {
                    data = await getListingClaim(listingId);
                } else {
                    data = await getUserClaims();
                    data = data.filter(claim => claim.listingId === parseInt(listingId));
                }

                setClaims(data);
                if (!isAdmin && data.length > 0) {
                    setMessage(data[0].message);
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClaims();
    }, [listingId, navigate, isAdmin]);

    const handleStatusUpdate = async (claimId, claimStatus) => {
        try {
            const updatedClaim = await updateClaimStatus(claimId, claimStatus);
            setClaims(claims.map(claim =>
                claim.id === claimId ? updatedClaim : claim
            ));
        } catch (err) {
            setError(err.message);
        }
    };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isAuthenticated()) {
			navigate('/login');
			return;
		}

		try {
			if (claims.length > 0) {
				const updatedClaim = await updateClaim(claims[0].id, message);
				setClaims([updatedClaim]);
			} else {
				const newClaim = await createClaim(listingId, message);
				setClaims([newClaim]);
			}
		} catch (err) {
				setError(err.message);
		}
	};

	if (!isAuthenticated()) {
		return null;
	}

    return (
        <>
            {isAdmin && (
                <Link
                    to={`/listing/${listingId}/edit`}
                    className={styles.adminEditButton}
                >
                    Edit Listing
                </Link>
            )}
            <div className={styles.claimSection}>
                {error && <div className={styles.error}>{error}</div>}
                {isAdmin
                    ? <AdminClaimView claims={claims} onStatusUpdate={handleStatusUpdate} />
                    : <UserClaimView {...{ claims, message, handleSubmit, setMessage }} />
                }
            </div>
        </>
    );
    
}

