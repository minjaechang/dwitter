import express from 'express';
import 'express-async-errors';

const router = express.Router();

let tweets = [
  {
    id: '1',
    text: 'my first tweet',
    createdAt: new Date(),
    name: 'Bob',
    username: 'bob',
  },
  {
    id: '2',
    text: 'second tweet',
    createdAt: new Date(),
    name: 'Minjae',
    username: 'minjae',
  },
  {
    id: '3',
    text: 'test!',
    createdAt: new Date(),
    name: 'Bob',
    username: 'bob',
  },
];

// GET /tweets
// GET /tweets?username={username}
router.get('/', (req, res, next) => {
  const { username } = req.query;

  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;

  res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: `Please enter valid id` });
  }

  const tweet = tweets.find((tweet) => {
    return tweet.id === id;
  });

  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  }

  res.status(200).json(tweet);
});

// POST /tweets
router.post('/', (req, res, next) => {
  const { text, username, name } = req.body;
  const newTweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [newTweet, ...tweets];
  res.status(201).json(newTweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const { text } = req.body;
  const { id } = req.params;

  const tweet = tweets.find((tweet) => tweet.id === id);

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

  const tweet = tweets.find((tweet) => tweet.id === id);

  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id}) not found` });
  }

  tweets = tweets.filter((tweet) => {
    return tweet.id !== id;
  });

  res.sendStatus(204);
});

export default router;
