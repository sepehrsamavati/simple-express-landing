const
express = require('express'), /* Express JS */
config = require("./cfg.js");
const UIText = require("./languages/multiLang"); /* UIText object */

require("./functions/extensions");

const app = express();

/* Express settings */
app.disable('x-powered-by');

if(config.reverseProxy)
	app.set('trust proxy', 'loopback');

app.use(express.static(__dirname + '/public')); // Public directory
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {

	const
	reqIp = ( req.remoteAddress || req.ip || "Unknown" ).replace("::ffff:",''),
	reqStart = new Date();

	// Log on response
	res.on('finish', () => {
		console.log(`${reqIp}`
			+`  ${new Date().toLocaleTimeString()}`
			+`  '${req.method} ${req.path}'`
			+`  ${res.statusCode}`
			+`  ${new Date() - reqStart}ms`
			+`  ${req.get('User-Agent')}`);
	});

	// UIText local var (to use in views)
	res.locals.languages = Object.keys(UIText).map( code => {
		return {
			code,
			fullname: UIText[code].__fullname
		};
	});
	res.locals.langCode = req.query && req.query.lang && UIText[req.query.lang] ? req.query.lang : config.defaultLang;
	res.locals.UIText = req.query && req.query.lang && UIText[req.query.lang] ? UIText[req.query.lang] : UIText[config.defaultLang];


	res.locals.currentPath = req.path.split('/')[1];
	res.locals.config = config;

	next();
});


/* Routes */

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
	// Use `res.render` when using view engines
});


/* 404 page */
app.use(function(req, res, next) {
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.sendFile(__dirname + '/views/errors/404.html');
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.json({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

/* Error page */
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.log(`\x1b[31m`);
	console.log(err);
	console.log(`\x1b[0m`);
	res.sendFile(__dirname + '/views/errors/error.html');
});

module.exports = app;