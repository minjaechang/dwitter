import express from 'express';
import 'express-async-errors';
import * as tweetRepository from '../data/tweets.js';
const router = express.Router();

// GET /tweets
// GET /tweets?username={username}
router.get('/', (req, res, next) => {
  const { username } = req.query;

  const data = username
    ? tweetRepository.getByUsername(username)
    : tweetRepository.getAll();

  res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const tweet = tweetRepository.getById(id);
  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    res.status(200).json(tweet);
  }
});

// POST /tweets
router.post('/', (req, res, next) => {
  const { text, username, name } = req.body;
  const newTweet = tweetRepository.create(text, name, username);
  res.status(201).json(newTweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = tweetRepository.update(id, text);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  const tweet = tweetRepository.getById(id);

  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    tweetRepository.remove(id);
    res.sendStatus(204);
  }
});

export default router;
