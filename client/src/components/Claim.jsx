import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getListingClaim, getUserClaims, createClaim, updateClaim } from '../lib/api';
import { isAuthenticated, getRole } from '../lib/auth';
import styles from './Claim.module.css';

const AdminClaimView = ({ claims }) => (
	<div className={styles.adminClaim}>
		<h3>All Claims</h3>
		{claims.map(claim => (
			<div key={claim.id} className={styles.claimItem}>
				<p>{claim.message}</p>
				<span>Status: {claim.status}</span>
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
		<div className={styles.claimSection}>
			{error && <div className={styles.error}>{error}</div>}
			{isAdmin
				? <AdminClaimView claims={claims} />
				: <UserClaimView {...{ claims, message, handleSubmit, setMessage }} />
			}
		</div>
	);
}

