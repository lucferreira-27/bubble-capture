const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routeModules = {
	users: require('./routes/users'),
	series: require('./routes/series'),
	transcriptions: require('./routes/series'),
	chapters: require('./routes/series'),
	// items: require('./routes/items'),
	// Add more routes here...
};

function handleAsyncErrors(handler) {
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

Object.entries(routeModules).forEach(([routeName, routeModule]) => {
	const { getAllModels, getModelById, createModel, updateModel, removeModel } = routeModule;
	if (getAllModels) {
		app.get(`/api/${routeName}`, handleAsyncErrors(getAllModels));
	}

	if (getModelById) {
		app.get(`/api/${routeName}/:id`, handleAsyncErrors(getModelById));
	}

	if (createModel) {
		app.post(`/api/${routeName}`, handleAsyncErrors(createModel));
	}

	if (updateModel) {
		app.put(`/api/${routeName}/:id`, handleAsyncErrors(updateModel));
	}

	if (removeModel) {
		app.delete(`/api/${routeName}/:id`, handleAsyncErrors(removeModel));
	}
});

module.exports = app;