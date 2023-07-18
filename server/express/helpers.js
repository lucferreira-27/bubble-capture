// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdParam(req) {
	const id = req.params.id;
	return id
}

module.exports = { getIdParam };
