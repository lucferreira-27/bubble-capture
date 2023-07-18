const { Chapter } = require('../../scheme');
const { getIdParam } = require('../helpers');


const sendResponse = (res, status, message) => res.status(status).json(message);

async function getAllModels(req, res) {
    try {
        const chapters = await Chapter.find();
        sendResponse(res, 200, chapters);
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error');
    }
};

async function getModelById(req, res) {
    try {
        const id = getIdParam(req);
        const chapter = await Chapter.findById(id);
        chapter ? sendResponse(res, 200, chapter) : sendResponse(res, 404, '404 - Not found');
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error');
    }
};

async function createModel(req, res) {
    if (req.body.id) {
        sendResponse(res, 400, `Bad request: ID should not be provided, since it is determined automatically by the database.`);
    } else {
        try {
            await Chapter.create(req.body);
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
            await Chapter.findByIdAndUpdate(id, req.body);
            res.status(200).end();
        }
    } catch (error) {
        sendResponse(res, 500, 'Internal Server Error');
    }
};

async function removeModel(req, res) {
    try {
        const id = getIdParam(req);
        await Chapter.findByIdAndRemove(id);
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