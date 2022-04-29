require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const dataRouter = require('./routers/dataRouter');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/data', dataRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.ex4br.mongodb.net/shopping-list-app?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
