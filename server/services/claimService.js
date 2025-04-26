const { Claim } = require('../models');
const { appError } = require('../utils/httpError');


const getUserClaim = async (userId) => {
    const claims = await Claim.findOne({
        where: { userId }
    });
    return claims;
};

const getListingClaim = async (listingId) => {
    const claims = await Claim.findAll({
        where: { listingId }
    });
    return claims;
};

const createClaim = async (userId, listingId, message) => {
    const newClaim = await Claim.create({
        userId,
        listingId,
        message
    });
    return newClaim;
};

const updateClaim = async (claimId, message) => {
    const claim = await Claim.findByPk(claimId);
    if (!claim) {
        throw appError(404, 'Claim not found');
    }

    claim.message = message;

    await claim.save();
    return claim;
};

const deleteClaim = async (claimId) => {
    const claim = await Claim.findByPk(claimId);
    if (!claim) {
        throw appError(404, 'Claim not found');
    }

    await claim.destroy();
    return { message: 'Claim deleted successfully' };
};


module.exports = {
    getUserClaim,
    getListingClaim,
    createClaim,
    updateClaim,
    deleteClaim
};
