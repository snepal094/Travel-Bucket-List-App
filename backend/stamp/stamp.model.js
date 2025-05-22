import mongoose from 'mongoose';
import Destination from '../destination/destination.model.js';
import User from '../user/user.model.js';
import Bucket from '../bucket/bucket.model.js';

const stampSchema = new mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Destination,
    required: true,
  },

  destinationName: {
    type: String,
    ref: Destination,
  },

  bucketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Bucket,
  },

  explorerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },

  explorerUsername: {
    type: String,
    ref: User,
  },

  visitedDate: {
    type: Date,
    default: null,
    required: true,
  },

  review: {
    comment: {
      type: String,
      minlength: 50,
      maxlength: 1000,
      trim: true,
    },
    images: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
});

const Stamp = mongoose.model('Stamp', stampSchema);

export default Stamp;
