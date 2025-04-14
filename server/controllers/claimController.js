const claimController = require('../services/claimService');
const { appError } = require('../utils/httpError');


const getClaims = async (req, res, next) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }
    const claims = await claimController.getClaims(listingId);
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

    const claim = await claimController.createClaim(listingId, message);
    res.status(201).json(claim);
};

const updateClaim = async (req, res) => {
    const claimId = req.params.claimId;
    if (!claimId) {
        throw appError(400, 'Missing param id');
    }

    const { message } = req.body;
    if (!message) {
        throw appError(400, 'Message required');
    }

    const claim = await claimController.updateClaim(claimId, message);
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
    getClaims,
    createClaim,
    updateClaim,
    deleteClaim
};