import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


import { PostController } from './controllers/index.js';

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log('DB error', err));



app.post('/saveMessage', PostController.create);


app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server running!');
});
