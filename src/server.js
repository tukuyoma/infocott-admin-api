import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import bodyParser from 'body-parser';
import { register, login, profile } from './routes/accounts';

import {
  createAdmin,
  removeAdmin,
  updateAdmin,
  getAdmin,
  loginAdmin,
} from './routes/accounts';
import {
  getHeroes,
  removeHero,
  setHero,
  setPostAlert,
} from './routes/settings';
import {
  writePost,
  updatePost,
  getAuthor,
  category,
  getAllCategories,
  updateCategory,
  viewCategory,
  allPosts,
  communityPosts,
} from './routes/posts';

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
dotenv.config();

app.get('/test', function (req, res) {
  res.status(200).json('Hello World!');
});

// app.use('/accounts/', register);
app.use('/accounts/', createAdmin);
app.use('/accounts/', removeAdmin);
app.use('/accounts/', updateAdmin);
app.use('/accounts/', getAdmin);
app.use('/accounts/', loginAdmin);
// app.use('/accounts/', profile);

//post
// app.use('/posts/', write);
// app.use('/posts/', getHomePost);
// app.use('/posts/', trendingAlert);
// app.use('/posts/', filterByCategory);
// app.use('/posts/', writeCategories);
// app.use('/posts/', postDetails);
app.use('/posts/', updatePost);
app.use('/posts/', getAllCategories);
app.use('/posts/', writePost);
app.use('/posts/', getAuthor);
app.use('/posts/', allPosts);
app.use('/posts/', communityPosts);

// admin account routes
app.use('/admin/', category);
app.use('/admin/', updateCategory);
app.use('/admin/', viewCategory);
app.use('/admin/', setHero);
app.use('/admin/', getHeroes);
app.use('/admin/', setPostAlert);
app.use('/admin/', removeHero);

app.get('/hello', (req, res) => {
  console.log('Hello');
  res.send('Hello world we are here now');
});

app.get('/', (req, res) => {
  console.log('Hello');
  res.status(200).json({ message: ' Welcome to Node.js & Express ' });
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, function () {
  console.log(`server connection established on PORT: ${PORT}`.yellow);
});
