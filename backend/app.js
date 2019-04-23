const express = require('express');
const app = express();
const port = 3001;

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json()); // for parsing application/json

/**
 * routes that don't require authentication
 **/
const ignoreAuthRoutes = ['/auth/login', '/auth/register'];

/**
 * Validate token middleware test
 **/
const verifyToken = (req, res, next) => {
  if (!ignoreAuthRoutes.includes(req.path)) {
    let token = req.cookies.token ? req.cookies.token : "";
    if (!token) {
      res.status(401).send(401, "Forbidden");
      return;
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      res.status(401).send("Forbidden");
      return;
    }

    req.app.locals.userId = decoded.userId;
    req.app.locals.authenticated = true;
  }
  next();
};

app.use(verifyToken);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/are-we-up', (req, res) => res.sendStatus(200));

/** routes **/
const authRoute = require('./routes/auth');

app.use('/auth', authRoute);
