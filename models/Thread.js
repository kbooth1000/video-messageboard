const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  posts: [{
    post: {
      type: Schema.Types.ObjectId,
      ref: 'posts'
    }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String
  },
  thumbnailUrl: {
    type: String
  }
})