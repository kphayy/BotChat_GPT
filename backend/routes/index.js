const authRouter = require('./authRouter');
const chatRouter = require('./chatRouter');

const router = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/chat', chatRouter);
}

module.exports = router;