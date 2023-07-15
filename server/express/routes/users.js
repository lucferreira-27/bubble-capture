const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

const User = models.user;

const sendResponse = (res, status, message) => res.status(status).json(message);

async function getAllModels(req, res) {
	const users = await User.findAll();
	sendResponse(res, 200, users);
};

async function getModelById(req, res) {
	const id = getIdParam(req);
	const user = await User.findByPk(id);
	user ? sendResponse(res, 200, user) : sendResponse(res, 404, '404 - Not found');
};

async function createModel(req, res) {
	if (req.body.id) {
		sendResponse(res, 400, `Bad request: ID should not be provided, since it is determined automatically by the database.`);
	} else {
		await User.create(req.body);
		res.status(201).end();
	}
};

async function updateModel(req, res) {
	const id = getIdParam(req);

	if (req.body.id === id) {
		await User.update(req.body, { where: { id: id } });
		res.status(200).end();
	} else {
		sendResponse(res, 400, `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function removeModel(req, res) {
	const id = getIdParam(req);
	await User.destroy({ where: { id: id } });
	res.status(200).end();
};

module.exports = {
	getAllModels,
	getModelById,
	createModel,
	updateModel,
	removeModel,
};