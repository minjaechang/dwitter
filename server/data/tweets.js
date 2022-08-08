import * as userRepository from '../data/auth.js';

let tweets = [
  {
    id: '1',
    text: 'my first tweet',
    createdAt: new Date(),
    userId: '1',
  },
  {
    id: '2',
    text: 'test!',
    createdAt: new Date(),
    userId: '1',
  },
];

export async function getAll() {
  // return array of promise
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name } = await userRepository.findById(tweet.userId);
      return { ...tweet, username, name };
    })
  );
}

export async function getByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name } = await userRepository.findById(found.userId);
  return { ...found, username, name };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  // "find" method returns "undefined" when there is no matched data
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
