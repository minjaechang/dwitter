// abcd1234: '$2b$10$3Fk1NEZ/7a9Ha3CkxHXhe.3Ay35UGub7iX17uYK.3eGjqvfU.Z9GS'

let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$10$3Fk1NEZ/7a9Ha3CkxHXhe.3Ay35UGub7iX17uYK.3eGjqvfU.Z9GS',
    name: 'Bob',
    email: 'bob@gmail.com',
  },
  {
    id: '2',
    username: 'ellie',
    password: '$2b$10$3Fk1NEZ/7a9Ha3CkxHXhe.3Ay35UGub7iX17uYK.3eGjqvfU.Z9GS',
    name: 'Ellie',
    email: 'ellie@gmail.com',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const { username, password, name, email } = user;
  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    name,
    email,
  };
  users.push(newUser);
  return newUser.id;
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
