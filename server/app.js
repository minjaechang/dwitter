import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { sequelize } from './db/database.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Something went wrong!');
});

// sync creates the table if it doesn't exist
sequelize.sync().then(() => {
  // console.log(client);

  // will be executed after the database is connected!
  const server = app.listen(config.host.port, () => {
    console.log('server is running');
  });
  initSocket(server);
});
