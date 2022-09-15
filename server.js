const app = require("./app"),
config = require("./cfg");

const server = app.listen(config.port, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});