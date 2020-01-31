const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const deleteRouter = require('./routers/delete');
const apiRouter = require('./routers/api');
const uploadRouter = require('./routers/upload');
const loginRouter = require('./routers/login');
const restoreRouter = require('./routers/restorePass');
const {port} = require('./config');

require('./mangoose');

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(deleteRouter);
app.use(apiRouter);
app.use(loginRouter);
app.use(uploadRouter);
app.use(restoreRouter);

app.listen(port, () => console.log(`Start listening on port ${port}!`));
