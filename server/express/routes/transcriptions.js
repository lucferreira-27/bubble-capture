const { Transcription } = require('../../scheme');
const { getIdParam } = require('../helpers');


const sendResponse = (res, status, message) => res.status(status).json(message);

async function getAllModels(req, res) {
  try {
    const transcriptions = await Transcription.find();
    sendResponse(res, 200, transcriptions);
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
}

async function getModelById(req, res) {
  try { 
    const id = getIdParam(req);
    const transcription = await Transcription.findById(id);
    transcription
      ? sendResponse(res, 200, transcription)  
      : sendResponse(res, 404, '404 - Not Found');
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
}

async function createModel(req, res) {
  if (req.body.id) {
    sendResponse(res, 400, 'Bad Request: ID should not be provided, it is automatically set by the database.');
  } else {
    try {
      await Transcription.create(req.body);
      res.status(201).end();
    } catch (error) {
      sendResponse(res, 500, 'Internal Server Error');
    }
  }
}

async function updateModel(req, res) {
  try {
    const id = getIdParam(req);
    if (req.body.id !== id) {
      sendResponse(res, 400, `Bad Request: param ID (${id}) does not match body ID (${req.body.id}).`);
    } else {
      await Transcription.findByIdAndUpdate(id, req.body);
      res.status(200).end();
    }
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
}

async function removeModel(req, res) {
  try {
    const id = getIdParam(req);
    await Transcription.findByIdAndRemove(id);
    res.status(200).end();
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
}

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  removeModel
};