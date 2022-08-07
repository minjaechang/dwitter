import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweets.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// validation
// sanitization, normalization
const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Text should be at least 2 characters long'),
  validate,
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweetById);

// POST /tweets
router.post('/', validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
