const express = require('./config/express');

const app = express();

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});

module.exports = app;