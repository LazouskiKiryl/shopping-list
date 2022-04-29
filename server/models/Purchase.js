const { Schema, model } = require('mongoose');

const Purchase = new Schema({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Purchase', Purchase);
