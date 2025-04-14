const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const claimController = require('../controllers/claimController');

// Listings
router.get('/', listingController.getAllListing);
router.get('/:listing_id', listingController.getListing);
router.post('/', listingController.createListing);
router.put('/:listing_id', listingController.updateListing);

// Claims
router.get('/:listing_id/claims', claimController.getClaimsForListing);
router.post('/:listing_id/claims', claimController.createClaim);
router.put('/:listing_id/claims/:claim_id', claimController.updateClaim);
router.delete('/:listing_id/claims/:claim_id', claimController.deleteClaim);

module.exports = router;