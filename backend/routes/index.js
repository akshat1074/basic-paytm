import express from 'express';
const userRouter = require('./user');
const router = express.Router();

router.use('/user',userRouter);
router.use('/account',accountRouter);

module.exports = router;