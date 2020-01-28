const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const deleteRouter = require('./routers/delete');
const apiRouter = require('./routers/api');
const formRouter = require('./routers/form');
const startRouter = require('./routers');
const loginRouter = require('./routers/login');
const {port} = require('./config');
const jwt = require('jsonwebtoken');
require('./mangoose');

app.use(express.static(path.join(__dirname, '/public'), {index: false}));
app.use(express.json());
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(userRouter);
app.use(taskRouter);
app.use(deleteRouter);
app.use(formRouter);
app.use(apiRouter);
app.use(startRouter);
app.use(loginRouter);

app.listen(port, () => console.log(`Start listening on port ${port}!`));
