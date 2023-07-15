const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

const Chapter = models.chapter;

const sendResponse = (res, status, message) => res.status(status).json(message);

async function getAllModels(req, res) {
	const Chapter = await Chapter.findAll();
	sendResponse(res, 200, Chapter);
};

async function getModelById(req, res) {
	const id = getIdParam(req);
	const Chapter = await Chapter.findByPk(id);
	Chapter ? sendResponse(res, 200, Chapter) : sendResponse(res, 404, '404 - Not found');
};

async function createModel(req, res) {
	if (req.body.id) {
		sendResponse(res, 400, `Bad request: ID should not be provided, since it is determined automatically by the database.`);
	} else {
		await Chapter.create(req.body);
		res.status(201).end();
	}
};

async function updateModel(req, res) {
	const id = getIdParam(req);

	if (req.body.id === id) {
		await Chapter.update(req.body, { where: { id: id } });
		res.status(200).end();
	} else {
		sendResponse(res, 400, `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function removeModel(req, res) {
	const id = getIdParam(req);
	await Chapter.destroy({ where: { id: id } });
	res.status(200).end();
};

module.exports = {
	getAllModels,
	getModelById,
	createModel,
	updateModel,
	removeModel,
};