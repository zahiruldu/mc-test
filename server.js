const express = require('express');

const app = express();
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 8888);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});