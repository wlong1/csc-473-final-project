import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getListing } from '../lib/api';
import { isAuthenticated } from '../lib/auth';
import Claim from '../components/Claim';
import Layout from '../components/Layout';
import styles from '../styles/Listing.module.css';

export default function ListingDetail() {
	const { listingId } = useParams();
	const navigate = useNavigate();
	const [listing, setListing] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate('/login');
			return;
		}

		const fetchListing = async () => {
			try {
				const data = await getListing(listingId);
				setListing(data);
			} catch (err) {
				console.error('Fetch failed:', err);
				setError(err.message || 'Failed to load listing');
			}
		};

		fetchListing();
	}, [listingId, navigate]);

	if (error) {
		return (
			<Layout>
				<div className="listing-detail error">
					{error}
				</div>
			</Layout>
		);
	}

	if (!listing) {
		return (
			<Layout>
				<div className="listing-detail loading">
					Loading...
				</div>
			</Layout>
		);
	}

	return (
        <Layout>
            <div className={styles.backgroundWrapper}>
                <div className={styles.content}>
                    <div className={styles.listingContainer}>
                        <div className={styles.imageSection}>
                            {listing.imageUrl && (
                                <img
                                    src={listing.imageUrl}
                                    alt={listing.title}
                                    className={styles.listingImage}
                                />
                            )}
                        </div>
                        <div className={styles.detailsSection}>
                            <h1 className={styles.title}>{listing.title}</h1>
                            <p className={styles.description}>{listing.description}</p>
                            <div className={styles.metaContainer}>
                                <div className={styles.lostDate}>
                                    Lost on: {new Date(listing.lostDate).toLocaleDateString()}
                                </div>
                                <div className={`${styles.activeStatus} ${
                                    listing.active ? styles.statusActive : styles.statusInactive
                                }`}>
                                    {listing.active ? 'Active' : 'Inactive'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Claim listingId={listingId} />
                </div>
            </div>
        </Layout>
    );
}
