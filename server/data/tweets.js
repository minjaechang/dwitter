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

export async function getAll() {
  return tweets;
}

export async function getByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id) {
  return tweets.filter((tweet) => tweet.id === id);
}

export async function create(text, username, name) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    username,
    name,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  // "find" method returns "undefined" when there is no matched data
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
