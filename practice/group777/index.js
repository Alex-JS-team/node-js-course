const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const deleteRouter = require('./routers/delete');
const apiRouter = require('./routers/api');
const loginRouter = require('./routers/login');
const {port} = require('./config');

require('./mangoose');

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(deleteRouter);
app.use(apiRouter);
app.use(loginRouter);

app.listen(port, () => console.log(`Start listening on port ${port}!`));
