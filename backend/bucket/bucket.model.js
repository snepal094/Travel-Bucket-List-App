import mongoose from 'mongoose';
import Destination from '../destination/destination.model.js';
import User from '../user/user.model.js';

const bucketSchema = new mongoose.Schema(
  {
    explorerId: {
      type: mongoose.ObjectId,
      ref: User,
      required: true,
    },

    explorerUsername: {
      type: String,
      ref: User,
      required: true,
    },

    destinationId: {
      type: mongoose.ObjectId,
      ref: Destination,
      required: true,
    },

    destinationName: {
      type: String,
      ref: Destination,
    },
  },
  {
    timestamps: true,
  }
);

const Bucket = mongoose.model('Bucket', bucketSchema);

export default Bucket;
