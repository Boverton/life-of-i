const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/are-we-up', (req, res) => res.sendStatus(200));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
