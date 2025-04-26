const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const claimController = require('../controllers/claimController');
const { authMiddleware, authRoles } = require('../middleware/auth');
const { upload } = require('../config/upload');

// Listings
router.get('/', authMiddleware, listingController.getAllListing);
router.get('/:listingId', authMiddleware, listingController.getListing);

router.post('/',
    authMiddleware,
    authRoles('admin'),
    upload.single('image'),
    listingController.createListing);
router.put('/:listingId',
    authMiddleware,
    authRoles('admin'),
    listingController.updateListing);


// Claims
router.get('/claim',
    authMiddleware,
    claimController.getUserClaim);
router.get('/:listingId/claim',
    authMiddleware,
    claimController.getListingClaim);
router.post('/:listingId/claim',
    authMiddleware, 
    authRoles('user'),
    claimController.createClaim);
router.put('/claim/:claimId',
    authMiddleware, 
    authRoles('user'),
    claimController.updateClaim);
router.delete('/claim/:claimId',
    authMiddleware,
    claimController.deleteClaim);

module.exports = router;