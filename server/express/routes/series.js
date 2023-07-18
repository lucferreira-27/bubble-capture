const { Series } = require('../../scheme');
const { getIdParam } = require('../helpers');


const sendResponse = (res, status, message) => res.status(status).json(message);

async function getAllModels(req, res) {
    try {
        const seriesList = await Series.find();
        sendResponse(res, 200, seriesList);
    } catch (error) {
        sendResponse(res, 404, '404 - Not found')
    }
};

async function getModelById(req, res) {
    try {
        const id = getIdParam(req);
        const series = await Series.findById(id);
        sendResponse(res, 200, series)
    } catch (error) {
        sendResponse(res, 404, '404 - Not found')
    }
};

async function createModel(req, res) {
    if (req.body.id) {
        sendResponse(res, 400, `Bad request: ID should not be provided, since it is determined automatically by the database.`);
    } else {
        try {
            await Series.create(req.body);
            res.status(201).end();
        } catch (error) {
            sendResponse(res, 500, 'Internal Server Error');
        }
    }
};

async function updateModel(req, res) {
    try {
        const id = getIdParam(req);
        if (req.body.id !== undefined && req.body.id !== id) {
            sendResponse(res, 400, `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
        } else {
            await Series.findByIdAndUpdate(id, req.body);
            res.status(200).end();
        }
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error');
    }
};

async function removeModel(req, res) {
    try {
        const id = getIdParam(req);
        await Series.findByIdAndRemove(id);
        res.status(200).end();
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = {
    getAllModels,
    getModelById,
    createModel,
    updateModel,
    removeModel,
};