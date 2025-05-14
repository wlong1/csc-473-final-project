const claimController = require('../services/claimService');
const { appError } = require('../utils/httpError');


const getUserClaim = async (req, res, next) => {
    const userId = req.user.id;
    if (!userId) {
        throw appError(400, 'Missing user id');
    }
    const claims = await claimController.getUserClaim(userId);
    res.status(200).json(claims);
};

const getListingClaim = async (req, res, next) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }
    const claims = await claimController.getListingClaim(listingId);
    res.status(200).json(claims);
};

const getPendingClaims = async (req, res, next) => {
    const claims = await claimService.getPendingClaims();
    res.status(200).json(claims);
};

const createClaim = async (req, res) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }

    const { message } = req.body;
    if (!message) {
        throw appError(400, 'Message required');
    }
    console.log(req.user);
    const userId = req.user.id;
    if (!message) {
        throw appError(400, 'Missing userId');
    }
    
    const claim = await claimController.createClaim(userId, listingId, message);
    res.status(201).json(claim);
};

const updateClaimMessage = async (req, res) => {
    const claimId = req.params.claimId;
    if (!claimId) {
        throw appError(400, 'Missing claim id');
    }

    const { message } = req.body;
    if (!message) {
        throw appError(400, 'Message required');
    }

    const claim = await claimController.updateClaimMessage(claimId, message);
    res.status(200).json(claim);
};

const updateClaimStatus = async (req, res) => {
    const claimId = req.params.claimId;
    if (!claimId) {
        throw appError(400, 'Missing claim id');
    }

    const { claimStatus } = req.body;
    if (!claimStatus || (claimStatus !== 'accepted' && claimStatus !== 'rejected')) {
        throw appError(400, 'Invalid status');
    }

    const claim = await claimController.updateClaimStatus(claimId, claimStatus);
    res.status(200).json(claim);
};


const deleteClaim = async (req, res) => {
    const claimId = req.params.claimId;
    if (!claimId) {
        throw appError(400, 'Missing param id');
    }

    const claim = await claimController.deleteClaim(claimId);
    res.status(200).json(claim);
};


module.exports = {
    getUserClaim,
    getListingClaim,
    getPendingClaims,
    createClaim,
    updateClaimMessage,
    updateClaimStatus,
    deleteClaim
};