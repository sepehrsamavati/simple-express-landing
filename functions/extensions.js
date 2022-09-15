const UIText = require("../languages/multiLang"),
config = require("../cfg.js");;

String.prototype.toPersianDigits = function(){
	let persianNumbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']; // Hackers-Mania S.s. 2017
	return this.replace(/[0-9]/g, function(w){
		return persianNumbers[+w]
	});
};

String.prototype.toEnglishDigits = function () {
	let charCodeZero = '۰'.charCodeAt(0);
	return parseInt(this.replace(/[۰-۹]/g, function (w) {
		return w.charCodeAt(0) - charCodeZero;
	}));
};

String.prototype.isRTL = function(){
	return config.rtlLangs.includes(this.toString());
};

String.prototype.capitalize = function(){
	return (this.charAt(0).toUpperCase() + this.slice(1)).toString();
};

String.prototype.localization = function(lang = ''){
	const capitalizeLangs = config.capitalizeLangs;
	let result = this;
	if(lang.isRTL())
	{
		result = result.toPersianDigits();
	}
	if(capitalizeLangs.includes(lang))
	{
		result = result.split('\n').map( line => line.capitalize() ).join('\n');
	}
	return result.toString();
};

String.prototype.multiLangHelper =  function(replaceWith, lang = '')
{
	const input = this.toString();
	if(typeof replaceWith == undefined)
	{
		return input;
	}
	if(!Array.isArray(replaceWith))
	{
		replaceWith = [replaceWith];
	}
	return input.replace(/(%s)\d/g, (a) => replaceWith[parseInt(a.slice(2))-1] ).localization(lang);
};

function closeApp(exitCode){
	if(exitCode === 0) {
		return;
	} else if(exitCode) {
		console.log(exitCode);
	}

	console.log('App closed.');
	process.exit(0);
}

process.on('exit', closeApp);
process.on('SIGINT', closeApp);
process.on('SIGTERM', closeApp);
process.on('SIGKILL', closeApp);
process.on('uncaughtException', (exitCode) => {
	console.log(`\n\n\x1b[31m${"Error START"}\x1b[0m`);
	console.log(exitCode);
	console.log(`\x1b[31m${"Error END"}\x1b[0m\n\n`);
});