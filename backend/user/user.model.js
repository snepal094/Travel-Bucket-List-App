import mongoose from 'mongoose';
import countries from '../constants/countries.js';

//set schema
const userSchema = new mongoose.Schema({
  email: {
    //mongoose doesn't provide built in email validator
    type: String,
    required: true,
    maxlength: 55,
    unique: true,
    lowercase: true,
    trim: true,
  },

  username: {
    type: String,
    required: true,
    lowercase: true,
    maxlength: 10,
    unique: true,
    trim: true,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  gender: {
    type: String,
    required: false,
    enum: ['male', 'female', 'other'],
    trim: true,
  },

  countryOfOrigin: {
    type: String,
    required: false,
    enum: countries,
  },

  currentRole: {
    type: String,
    enum: ['explorer', 'editor'],
    default: 'explorer',
  },

  //bucketList: destinationSchema
  //visitedDestinations=[]
});

//remove password field while converting to JSON (while receiving a response (postman: userDetails))
//can only be removed in JSON format
//protects sensitive data from being exposed in API responses

//* make database do minimal work

//alternative of loginCredentials.password= undefined;
userSchema.methods.toJSON = function () {
  let obj = this.toObject(); //converting bson format to json format
  //not an arrow function since arrow functions don't understand 'this'
  delete obj.password;
  // obj.fullName = `${obj.firstName} ${obj.lastName}`;
  return obj;
};

// now,
//console.log(user);            // You'll see the password
//res.send(user);               // Password will be removed

//*why the conversion?
//mongoose documents are stored internally in BSON format
//we read mongoDB documents in human-readable, JSON-like representation of the underlying BSON
//BSON contains additional data types like ObjectId (_id)
//BSON is not easily readable to humans like JSON
//thus, clients and browsers expect the API responses to be in JSON, hence the conversion

//create collection
const User = mongoose.model('User', userSchema);

export default User;
