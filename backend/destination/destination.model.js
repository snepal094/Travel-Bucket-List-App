import mongoose from 'mongoose';
import countries from '../constants/countries.js';
import User from '../user/user.model.js';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true,
  },

  city: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true,
  },

  country: {
    type: String,
    enum: countries,
    required: true,
  },

  images: {
    type: [String],
    default: [],
  },

  //TODO type: Activity (Trekking), National Parks, Resorts, Villa, etc.

  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },

  editorId: {
    type: mongoose.ObjectId,
    required: true,
    ref: User,
    // editorId must match the _id of some document in the User collection
    // ref only works with ObjectId type and always links to _id
  },

  editorUsername: {
    type: String,
    required: true,
    lowercase: true,
    maxlength: 10,
    trim: true,
  },

  //TODO x km from your location
});

destinationSchema.index({ name: 1, city: 1, country: 1 }, { unique: true });

destinationSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.editorId;
  delete obj.editorUsername;
  delete obj.__v;
  return obj;
};

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
