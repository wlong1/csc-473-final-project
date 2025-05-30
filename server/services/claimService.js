const { Claim, User, Listing } = require('../models');
const { appError } = require('../utils/httpError');


const getUserClaim = async (userId) => {
    const claims = await Claim.findAll({
        order: [['createdAt', 'DESC']],
        where: { userId },
        include: [{
            model: Listing,
            attributes: ['id', 'title']
            }],
    });
    console.log(claims);
    return claims;
};

const getListingClaim = async (listingId) => {
    const claims = await Claim.findAll({
        where: { listingId },
        include: [{
            model: User,
            attributes: ['username', 'email']
        }]
    });
    return claims;
};

const getPendingClaims = async () => {
    const claims = await Claim.findAll({
        where: { 
            status: 'pending' 
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            },
            {
                model: Listing,
                attributes: ['id', 'title']
            }
        ],
        order: [['createdAt', 'DESC']]
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

const updateClaimMessage = async (claimId, message) => {
    const claim = await Claim.findByPk(claimId);
    if (!claim) {
        throw appError(404, 'Claim not found');
    }

    claim.message = message;

    await claim.save();
    return claim;
};

const updateClaimStatus = async (claimId, status) => {
    const claim = await Claim.findByPk(claimId, {
        include: [{
            model: User,
            attributes: ['username', 'email']
        }]
    });

    if (!claim) {
        throw appError(404, 'Claim not found');
    }

    claim.status = status;
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
    getPendingClaims,
    createClaim,
    updateClaimMessage,
    updateClaimStatus,
    deleteClaim
};
