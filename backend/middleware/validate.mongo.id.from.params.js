import mongoose from 'mongoose';

const validateMongoIdFromParams = (req, res, next) => {
  const id = req.params.id; // :params
  const isValidId = mongoose.isValidObjectId(id);

  if (!isValidId) {
    return res.status(400).send({ message: 'Invalid mongo id.' });
  }
  next();
};

export default validateMongoIdFromParams;
