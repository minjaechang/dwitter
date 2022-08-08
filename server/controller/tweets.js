import * as tweetRepository from '../data/tweets.js';

export async function getTweets(req, res, next) {
  const { username } = req.query;
  const data = await (username
    ? tweetRepository.getByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweetById(req, res, next) {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    res.status(200).json(tweet);
  }
}

export async function createTweet(req, res, next) {
  const { text } = req.body;
  const userId = req.userId;
  const newTweet = await tweetRepository.create(text, userId);
  res.status(201).json(newTweet);
}

export async function updateTweet(req, res, next) {
  const { id } = req.params;
  const { text } = req.body;

  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(400);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res, next) {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(400);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    await tweetRepository.remove(id);
    res.sendStatus(204);
  }
}
