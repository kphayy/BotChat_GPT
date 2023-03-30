const authRouter = require('./authRouter');

const router = (app) => {
    app.use('/api/auth', authRouter);
}

module.exports = router;