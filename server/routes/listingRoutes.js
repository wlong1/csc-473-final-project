const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const claimController = require('../controllers/claimController');
const { authMiddleware, authRoles } = require('../middleware/auth');

// Listings
router.get('/', authMiddleware, listingController.getAllListing);
router.get('/:listingId', authMiddleware, listingController.getListing);

router.post('/',
    authMiddleware,
    authRoles('admin'),
    listingController.createListing);
router.put('/:listingId',
    authMiddleware,
    authRoles('admin'),
    listingController.updateListing);


// Claims
router.get('/:listingId/claims',
    authMiddleware,
    claimController.getClaims);
router.post('/:listingId/claims',
    authMiddleware, 
    authRoles('user'),
    claimController.createClaim);
router.put('/:listingId/claims/:claimId',
    authMiddleware, 
    authRoles('user'),
    claimController.updateClaim);
router.delete('/:listingId/claims/:claimId',
    authMiddleware,
    claimController.deleteClaim);

module.exports = router;