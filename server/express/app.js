const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRouteHandlers = {
	series: require('./routes/series'),
	transcriptions: require('./routes/transcriptions'),
	chapters: require('./routes/chapters')
};

function wrapAsyncRouteHandler(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

const redirectToUsers = (req, res) => res.redirect('/api/users');
app.get('/', redirectToUsers);

Object.entries(apiRouteHandlers).forEach(([routeName, routeHandler]) => {
	const { getAllModels, getModelById, createModel, updateModel, removeModel } = routeHandler;
	if (getAllModels) {
		app.get(`/api/${routeName}`, wrapAsyncRouteHandler(getAllModels));
	}

	if (getModelById) {
		app.get(`/api/${routeName}/:id`, wrapAsyncRouteHandler(getModelById));
	}

	if (createModel) {
		app.post(`/api/${routeName}`, wrapAsyncRouteHandler(createModel));
	}

	if (updateModel) {
		app.put(`/api/${routeName}/:id`, wrapAsyncRouteHandler(updateModel));
	}

	if (removeModel) {
		app.delete(`/api/${routeName}/:id`, wrapAsyncRouteHandler(removeModel));
	}
});

module.exports = app;