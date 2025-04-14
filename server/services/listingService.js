const { Listing } = require('../models');
const { appError } = require('../utils/httpError');


const getAllListing = async () => {
    const listings = await Listing.findAll();
    return listings;
};

const getListing = async (listingId) => {

    const listing = await Listing.findByPk(listingId);
    if (!listing) {
        throw appError(404, 'Listing not found');
    }
    return listing;
};

const createListing = async (title, description, lostDate) => {
    const newListing = await Listing.create({
        title,
        description,
        lostDate
    });
    return newListing;
};

const updateListing = async (listingId, title, description, lostDate) => {
    const listing = await Listing.findByPk(listingId);
    if (!listing) {
        throw appError(404, 'Listing not found');
    }

    listing.title = title;
    listing.description = description;
    listing.lostDate = lostDate;

    await listing.save();
    return listing;
};


module.exports = {
    getAllListing,
    getListing,
    createListing,
    updateListing
};
