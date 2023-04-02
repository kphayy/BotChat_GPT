const authRouter = require('./authRouter');
const chatRouter = require('./chatRouter');
const messageRouter = require('./messageRouter');

const router = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/chat', chatRouter);
    app.use('/api/message', messageRouter);
}

module.exports = router;