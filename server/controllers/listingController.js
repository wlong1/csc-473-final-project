const listingService = require('../services/listingService');
const { appError } = require('../utils/httpError');


const getAllListing = async (req, res, next) => {
    const listings = await listingService.getAllListing();
    res.status(200).json(listings);
};

const getListing = async (req, res) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }
    console.log("THIS IS ALSO BEING TRIGGERED, WHYYYYY");
    const listing = await listingService.getListing(listingId);
    res.status(200).json(listing);
};

const createListing = async (req, res) => {
    const { title, description, lostDate } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    if (!title || !description || !lostDate) {
        throw appError(400, 'All fields are required');
    }

    const listing = await listingService.createListing(
      title,
      description,
      lostDate,
      imagePath
    );
    res.status(201).json(listing);
};

const updateListing = async (req, res) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }

    const { title, description, lostDate } = req.body;
    if (!title || !description || !lostDate) {
        throw appError(400, 'All fields are required');
    }

    const listing = await listingService.updateListing(listingId, title, description, lostDate);
    res.status(200).json(listing);
};

module.exports = {
    getAllListing,
    getListing,
    createListing,
    updateListing
};