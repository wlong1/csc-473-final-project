const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const claimController = require('../controllers/claimController');
const { authMiddleware, authRoles } = require('../middleware/auth');
const { upload } = require('../config/upload');
const { sse } = require ('../utils/sse.js');


// SSE endpoint
router.get('/updates', async (req, res, next) => {
    const sseReady = await sse;
    sseReady.init(req, res);
});


// Claims routes
router.get('/claim',
    authMiddleware,
    claimController.getUserClaim
);

router.get('/:listingId/claim',
    authMiddleware,
    claimController.getListingClaim
);

router.post('/:listingId/claim',
    authMiddleware,
    authRoles('user'),
    claimController.createClaim
);

router.put('/claim/:claimId',
    authMiddleware,
    authRoles('user'),
    claimController.updateClaimMessage
);

router.delete('/claim/:claimId',
    authMiddleware,
    claimController.deleteClaim
);

router.put('/claim/:claimId/claimStatus',
    authMiddleware,
    authRoles('admin'),
    claimController.updateClaimStatus
);

router.get('/claim/pending',
    authMiddleware,
    authRoles('admin'),
    claimController.getPendingClaims
);


//Listing routes
router.get('/',
    authMiddleware,
    listingController.getAllListing
);

router.post('/',
    authMiddleware,
    authRoles('admin'),
    upload.single('image'),
    listingController.createListing
);

router.get('/:listingId',
    authMiddleware,
    listingController.getListing
);

router.put('/:listingId',
    authMiddleware,
    authRoles('admin'),
    listingController.updateListing
);

module.exports = router;