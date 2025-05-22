import express from 'express';
import { isExplorer, isUser } from '../middleware/authentication.middleware.js';
import Destination from '../destination/destination.model.js';
import Bucket from './bucket.model.js';
import validateRequestBody from '../middleware/validate.req.body.js';
import { bucketValidationSchema } from './bucket.validation.js';
import checkMongoIdValidity from '../utils/check.mongo.id.validity.js';
import validateMongoIdFromParams from '../middleware/validate.mongo.id.from.params.js';
import { paginationDataValidationSchema } from '../destination/destination.validation.js';
import Stamp from '../stamp/stamp.model.js';

const router = express.Router();

//* add destination to bucket
router.post(
  '/bucket/add/destination',
  isUser,
  isExplorer,
  validateRequestBody(bucketValidationSchema),

  (req, res, next) => {
    const { destinationId } = req.body;

    const isValidId = checkMongoIdValidity(destinationId);
    if (!isValidId) {
      return res.status(400).send({ message: 'Invalid Mongo Id.' });
    }

    next();
  },

  async (req, res) => {
    const { destinationId, isVisited, visitedDate } = req.body;

    const destination = await Destination.findOne({ _id: destinationId });

    if (!destination) {
      return res.status(404).send({ message: 'Destination does not exist.' });
    }

    const bucket = await Bucket.findOne({
      destinationId,
      explorerId: req.loggedInUserId,
    });

    const stamp = await Stamp.findOne({
      destinationId,
      explorerId: req.loggedInUserId,
    });

    if (bucket) {
      return res
        .status(404)
        .send({ message: 'Destination has already been added to bucket.' });
    }

    if (stamp) {
      return res
        .status(404)
        .send({ message: 'You have already stamp this destination.' });
    }

    //add item to cart
    await Bucket.create({
      explorerId: req.loggedInUserId,
      explorerUsername: req.username,
      destinationId,
      destinationName: destination.name,
      isVisited,
      visitedDate,
    });

    //send response
    return res.status(201).send('Added to bucket successfully.');
  }
);

//* flush bucket/ remove all destinations from bucket
router.delete('/bucket/flush', isUser, isExplorer, async (req, res) => {
  const explorerId = req.loggedInUserId;

  await Bucket.deleteMany({ explorerId });

  return res.status(200).send({ message: 'Bucket cleared successfully.' });
});

//* remove single destination from bucket
// every bucketId is different even for the same user
// id= bucketId
router.delete(
  '/bucket/delete/destination/:id',
  isUser,
  isExplorer,
  validateMongoIdFromParams,
  async (req, res) => {
    const bucketId = req.params.id;

    const bucket = await Bucket.findOne({
      _id: bucketId,
      explorerId: req.loggedInUserId,
    });

    if (!bucket) {
      return res
        .status(403)
        .send({ message: 'You are not the owner of this bucket.' });
    }

    const explorerId = req.loggedInUserId;

    await Bucket.deleteOne({ _id: bucketId, explorerId: req.loggedInUserId });

    //send response
    return res
      .status(200)
      .send({ message: 'Destination deleted from bucket successfully.' });
  }
);

//* list all the products in a bucket
router.post(
  '/bucket/list',
  isUser,
  isExplorer,
  validateRequestBody(paginationDataValidationSchema),
  async (req, res) => {
    const { page, limit } = req.body;
    const skip = (page - 1) * limit;

    const data = await Bucket.aggregate([
      {
        $match: {
          explorerId: req.loggedInUserId,
        },
      },
      {
        $lookup: {
          from: 'destinations',
          localField: 'destinationId',
          foreignField: '_id',
          as: 'destinationData',
        },
      },
      {
        $project: {
          destinationId: 1,
          destinationDetails: {
            name: { $first: '$destinationData.name' },
            city: { $first: '$destinationData.city' },
            country: { $first: '$destinationData.country' },
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    return res.status(200).send({ message: 'success', bucketData: data });
  }
);

export default router;
