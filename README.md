# Simple ExpressJS Server for Landing Pages
**Simple** NodeJS (Express) HTTP server ready to use for landing pages (static HTML) or just a public cloud storage.  
This is a simplified version of one of my NodeJS based servers **without any extra dependency (just `express` and custom modules)**.


<details>
  <summary>About</summary>
  
## Features
- Request logger (log on response)
- Configuration file (similar to .env)
- Multi language (+ RTL) support (actually it's useless since there's no view engine in this project)
- Public directory (static files)
- Custom error pages (404 and 500)



## What it is not
As mentioned before, there is only one dependency and it's `express`. So you may change things and add modules to build your desired app.  
For example a complete project may contain:
 - View Engine (EJS, ...)
 - Layout for views
 - Cookie/Body parser
 - Database (MongoDB, Mongoose, ...)
 - Auth (Passport, JWT, ...)
 - Security (Helmet, CORS, CSRF, Rate limiting, custom header config, ...)
 
</details>

---

# Documentation

<details>
  <summary>Directories</summary>

### Functions
> `extensions.js`  
Functions that are bound on string prototype (Persian digits to English digits and reverse), check isRTL for user language (useless in this project), process kill/close/end/error function, ...

> `overlap.js`  
Check if two number ranges have overlap (not used)

> `pagination.js`  
Pagination function that splits an array (not used)

### Languages
> `multiLang.js` This module exports an object.  
The JSON object has languages keys (for example `en` lang code) and each lang code must have all key:value pairs of your application texts. For example `"helloWorld": "Hello World!"`.  
I've added two keys named `__fontGroup` and `__fullname` which can be used for CSS fonts and logic in CSS or views. For example Persian and Arabic can use the same font group.  
You can generate this JSON object or just use this static structure.

### Public
> Used for serving static files like CSS, JS, images and...  
Don't put private files here.

### Views
> HTML files (index, errors) are placed here but since there's no view engine you can just move these files to `public` directory and change the paths in `app.js`.

</details>

<details>
  <summary>Files</summary>

## cfg.js
Similar to `.env`. 
```JS
const config = {
    appName: "", // Application name
    version: "", // Version code
    versionName: "", // Version name
    title: "", // Application title (can be used in title tag)
    defaultLang: "", // Default language code to select from multiLang.js
    rtlLangs: [], // List of language codes that are right-to-left (e.g. 'fa')
    capitalizeLangs: [], // List of language codes that can be capitalized (e.g. 'en')
    reverseProxy: Boolean(), // true if server is using reverse proxy (sets express trust proxy)
    port: Number() // HTTP server port (e.g. 3000)
};
```

## server.js
Starts HTTP server from `app.js` module

## app.js
Main application.  
Import `experss`, [cfg.js](#cfgjs) and [multiLang.js](#languages).  
Runs `extensions.js` from [functions](#functions).  
Express settings (remove x-powered-by from header, set trust proxy, set public directory, ...)  
Main middleware:
> - Logs request info on response (IP, path, method, res code, res time, user agent)
> - Sets UIText on res.locals from [multiLang.js](#languages), based on request query (can be res.user object)
> - Sets current path and config object to res.locals
 
Bind `/` route (`get` method) to `views/index.html`  
And finally et error codes
 
 
</details>

