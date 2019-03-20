const express = require('express');
const app = express();
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/are-we-up', (req, res) => res.sendStatus(200));

/** routes **/
const registerRoute = require('./routes/register');

app.use('/register', registerRoute);
