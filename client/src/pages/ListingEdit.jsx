import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getListing, updateListing } from '../lib/api';
import checkToken from '../hooks/checkToken';
import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';

export default function ListingEdit() {
	checkToken();
	const { listingId } = useParams();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		lostDate: '',
		active: true
	});
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const listing = await getListing(listingId);
				setFormData({
					title: listing.title,
					description: listing.description,
					lostDate: listing.lostDate.split('T')[0],
					active: listing.active
				});
			} catch (err) {
				console.error('Fetch failed:', err);
				setError(err.message || 'Failed to load listing');
			}
		};
		fetchListing();
	}, [listingId]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleToggleActive = () => {
		setFormData(prev => ({
			...prev,
			active: !prev.active
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);

		try {
			await updateListing(listingId, formData);
			navigate(`/listing/${listingId}`);
		} catch (err) {
			console.error('Update failed:', err);
			setError(err.message || 'Failed to update listing');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Layout>
			<div className={styles.content}>
				<div className={styles.formContainer}>
					<h1>Edit Listing</h1>
					{error && (
						<div className={styles.error} role="alert">
							{error}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className={styles.formGroup}>
							<label htmlFor="title">Title</label>
							<input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="description">Description</label>
							<textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								required
								maxLength={250}
								rows={5}
							/>
							<div className={styles.charCount}>
								{formData.description.length}/250
							</div>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="lostDate">Lost Date</label>
							<input
								type="date"
								id="lostDate"
								name="lostDate"
								value={formData.lostDate}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<div className={styles.toggleContainer}>
								<label>Status</label>
								<span className={styles.toggleLabel}>
									{formData.active ? 'Active' : 'Inactive'}
								</span>
								<button
									type="button"
									className={`${styles.toggleButton} ${formData.active ? styles.active : ''}`}
									onClick={handleToggleActive}
								>
									<span className={styles.toggleSwitch} />
								</button>
							</div>
						</div>
						<button
							type="submit"
							className={styles.submitButton}
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Updating...' : 'Save Changes'}
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
