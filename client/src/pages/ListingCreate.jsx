import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createListing } from '../lib/api';
import checkToken from '../hooks/checkToken';
import Layout from '../components/Layout';
import styles from '../styles/Form.module.css';

export default function ListingCreate() {
	checkToken();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lostDate: ''
  });
	const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

	const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const formPackage = new FormData();
      formPackage.append('title', formData.title);
      formPackage.append('description', formData.description);
      formPackage.append('lostDate', formData.lostDate);
      if (image) formPackage.append('image', image);

      const listing = await createListing(formPackage);
      navigate(`/listing/${listing.id}`);
    } catch (err) {
      console.error('Creation failed:', err);
      setError(err.message || 'Failed to create listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h1>List New Item</h1>
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
              <label htmlFor="image">Item Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
								required
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}