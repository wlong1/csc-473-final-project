const listingService = require('../services/listingService');
const { appError } = require('../utils/httpError');
const { sse } = require ('../utils/sse.js');


const getAllListing = async (req, res, next) => {
    const listings = await listingService.getAllListing();
    res.status(200).json(listings);
};

const getListing = async (req, res) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }
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

    const sseReady = await sse; 
    sseReady.send({
      event: 'new_listing',
      listing: {
        ...listing.get({ plain: true })
      }
    }, 'new_listing');

    res.status(201).json(listing);
};

const updateListing = async (req, res) => {
    const listingId = req.params.listingId;
    if (!listingId) {
        throw appError(400, 'Missing param id');
    }

    const { title, description, lostDate, active} = req.body;
    if (!title || !description || !lostDate || active == undefined) {
        throw appError(400, 'All fields are required');
    }

    const listing = await listingService.updateListing(
        listingId, 
        title,
        description,
        lostDate,
        active);
    res.status(200).json(listing);
};

module.exports = {
    getAllListing,
    getListing,
    createListing,
    updateListing
};