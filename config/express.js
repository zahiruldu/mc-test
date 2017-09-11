const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');

module.exports = function() {
    //Route Prefixing feature
    express.application.prefix = express.Router.prefix = function(path, configure) {
        let router = express.Router();
        this.use(path, router);
        configure(router);
        return router;
    };

    const app = express();
    app.set('port', process.env.PORT || 8888);
    app.set('env', process.env.NODE_ENV || 'development');
    //Middlewares
    app.use(cors({
        origin: true,
        credentials: true
    }));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // Force HTTPS 
    if (app.get('env') === 'production') {
        app.use(function(req, res, next) {
            let protocol = req.get('x-forwarded-proto');
            protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
        });
    }
    //Including routes dynamically
    let filePath = require('path').join(__dirname, '../app/routes');
    fs.readdirSync(filePath).forEach((file) => {
        require('../app/routes/' + file)(app);
    });
    return app;
}