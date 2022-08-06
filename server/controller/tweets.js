import * as tweetRepository from '../data/tweets.js';

export function getTweets(req, res, next) {
  const { username } = req.query;
  const data = username
    ? tweetRepository.getByUsername(username)
    : tweetRepository.getAll();
  res.status(200).json(data);
}

export function getTweetById(req, res, next) {
  const { id } = req.params;
  const tweet = tweetRepository.getById(id);
  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    res.status(200).json(tweet);
  }
}

export function createTweet(req, res, next) {
  const { text, username, name } = req.body;
  const newTweet = tweetRepository.create(text, name, username);
  res.status(201).json(newTweet);
}

export function updateTweet(req, res, next) {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = tweetRepository.update(id, text);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function deleteTweet(req, res, next) {
  const { id } = req.params;

  const tweet = tweetRepository.getById(id);

  if (tweet.length < 1) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  } else {
    tweetRepository.remove(id);
    res.sendStatus(204);
  }
}