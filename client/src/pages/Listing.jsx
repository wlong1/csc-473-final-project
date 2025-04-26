import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getRole, isAuthenticated } from '../lib/auth';
import { getAllListings } from '../lib/api';
import Layout from '../components/Layout';
import styles from '../styles/Listing.module.css';

export default function Listing() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchListings = async () => {
      try {
        const data = await getAllListings();
        const role = getRole();

        const filteredListings = role === 'admin'
          ? data
          : data.filter(listing => listing.active);

        setListings(filteredListings);
      } catch (err) {
        console.error('Fetch failed:', err);
        setError(err.message || 'Failed to load listings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [navigate]);

	const handleListingClick = (listingId) => {
		navigate(`/listing/${listingId}`);
	};

  if (error) {
    return (
      <Layout>
        <div className="error">
          {error}
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">
          Loading listings...
        </div>
      </Layout>
    );
  }

  return (
		<Layout>
			<div className={styles.backgroundWrapper}>
				<div className={styles.content}>
					<h1 className={styles.pageTitle}>Lost Items</h1>
					{listings.map(listing => (
						<div
							key={listing.id}
							className={`${styles.listingContainer} ${styles.listingCard}`}
							onClick={() => handleListingClick(listing.id)}
						>
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
								<h2 className={styles.title}>{listing.title}</h2>
								<p className={styles.description}>{listing.description}</p>
								<div className={styles.metaContainer}>
									<div className={styles.lostDate}>
										Lost on: {new Date(listing.lostDate).toLocaleDateString()}
									</div>
									<div className={styles.activeStatus}>
										{listing.active ? 'Active' : 'Inactive'}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
		</div>
	</Layout>	
  );
}
