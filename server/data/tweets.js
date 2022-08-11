import MongoDb from 'mongodb';
import * as userRepository from '../data/auth.js';
import { getTweets } from '../db/database.js';
const ObjectId = MongoDb.ObjectId;

// NoSQL (정보의 중복 > 관계)
// 모든 사용자가 트윗을 쿼리하는 횟수 > 사용자가 사용자의 정보를 업데이트하는 횟수
// 프로필 DB
// 사용자 문서 DB: 서버1, 서버2, 서버3
// 각각의 데이터베이스가 고립, 서로 관계❌
// join query - performance not good 👎

// SQL: relational
// join query - good performance 👍

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets() //
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets() //
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: 'after' } // 업데이트 된 후의 상태 리턴
    )
    .then((data) => data.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets() //
    .deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
