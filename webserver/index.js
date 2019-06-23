const express = require('express');
const Router = require('./route');
const middleware = require('./middleware');

// create app
const app = express();
const port = process.env.PORT || 3000;

app.use(new Router().getRouter());

app.use(middleware.errorHandler);

// start server
app.listen(port, () => console.log(`App listening on port ${port}!`));
