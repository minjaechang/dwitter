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
  const tweet = await tweetRepository.update(id, text);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res, next) {
  const { id } = req.params;

  const tweet = await tweetRepository.getById(id);

  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    await tweetRepository.remove(id);
    res.sendStatus(204);
  }
}
