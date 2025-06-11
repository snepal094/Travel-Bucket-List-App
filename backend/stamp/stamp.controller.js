import express from 'express';
import { isExplorer, isUser } from '../middleware/authentication.middleware.js';
import validateRequestBody from '../middleware/validate.req.body.js';
import { stampValidationSchema } from './stamp.validation.js';
import validateMongoIdFromParams from '../middleware/validate.mongo.id.from.params.js';
import Bucket from '../bucket/bucket.model.js';
import checkMongoIdEquality from '../utils/check.mongo.id.equality.js';
import Destination from '../destination/destination.model.js';
import User from '../user/user.model.js';
import Stamp from './stamp.model.js';

const router = express.Router();

//* add stamp from bucket
router.post(
  '/stamp/from/bucket/:id',
  isUser,
  isExplorer,
  validateMongoIdFromParams,
  validateRequestBody(stampValidationSchema),
  async (req, res) => {
    const bucketId = req.params.id;
    const { visitedDate, review } = req.body;

    const isAlreadyVisited = await Stamp.findOne({
      bucketId,
      explorerId: req.loggedInUserId,
    });

    if (isAlreadyVisited) {
      return res.status(409).send({
        message: 'Visited destination already stamped for this bucket item.',
      });
    }

    const bucket = await Bucket.findById(bucketId);
    if (!bucket) {
      return res.status(404).send({ message: 'Bucket not found.' });
    }

    const isBucketOwner = checkMongoIdEquality(
      bucket.explorerId,
      req.loggedInUserId
    );

    if (!isBucketOwner) {
      return res
        .status(403)
        .send({ message: 'You are not the owner of this bucket.' });
    }

    const destination = await Destination.findById(bucket.destinationId);
    const explorer = await User.findById(req.loggedInUserId);

    await Stamp.create({
      destinationId: bucket.destinationId,
      destinationName: destination.name,
      bucketId,
      explorerId: bucket.explorerId,
      explorerUsername: explorer.username,
      visitedDate,
      review,
    });

    await Bucket.findByIdAndDelete(bucket._id);

    return res
      .status(201)
      .send({ message: 'Visited destination stamped successfully.' });
  }
);

//* add stamp from destination
router.post(
  '/stamp/from/feed/:id',
  isUser,
  isExplorer,
  validateMongoIdFromParams,
  validateRequestBody(stampValidationSchema),
  async (req, res) => {
    const destinationId = req.params.id;
    const { visitedDate, review } = req.body;

    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).send({ message: 'Destination not found.' });
    }

    const isAlreadyVisited = await Stamp.findOne({
      destinationId,
      explorerId: req.loggedInUserId,
    });

    if (isAlreadyVisited) {
      return res.status(409).send({
        message: 'You have already logged this destination as stamped.',
      });
    }

    let bucketItem = await Bucket.findOne({
      destinationId,
      explorerId: req.loggedInUserId,
    });

    const explorer = await User.findById(req.loggedInUserId);

    await Stamp.create({
      destinationId,
      destinationName: destination.name,
      bucketId: bucketItem?._id,
      explorerId: req.loggedInUserId,
      explorerUsername: explorer.username,
      visitedDate,
      review,
    });

    if (bucketItem) {
      await Bucket.findByIdAndDelete(bucketItem._id);
    }

    return res
      .status(201)
      .send({ message: 'Visited destination stamped successfully.' });
  }
);

//* list stamps
router.get('/stamp/list', isUser, isExplorer, async (req, res) => {
  const explorerId = req.loggedInUserId;
  const stamps = await Stamp.find({ explorerId });
  // console.log(stamps);
  return res.status(200).send({ message: 'success', stampList: stamps });
});

//* flush stamps
router.delete('/stamp/flush', isUser, isExplorer, async (req, res) => {
  const explorerId = req.loggedInUserId;

  const isDataInVisitedDestinations = await Stamp.find(explorerId);

  if (!isDataInVisitedDestinations) {
    return res
      .status(400)
      .send({ message: 'No visited destinations stamped yet.' });
  }

  await Stamp.deleteMany({ explorerId });

  return res.status(200).send({ message: 'Stamps cleared successfully.' });
});

//* delete selected destination from stamps
router.delete(
  '/stamp/delete/:id',
  isUser,
  isExplorer,
  validateMongoIdFromParams,

  async (req, res) => {
    const stampId = req.params.id;

    const stamp = await Stamp.findById(stampId);

    if (!stampId) {
      return res.status(404).send({ message: 'Stamp not found.' });
    }

    const isOwner = checkMongoIdEquality(stamp.explorerId, req.loggedInUserId);

    if (!isOwner) {
      return res.status(403).send({
        message: 'You are not authorized to delete this stamp.',
      });
    }

    await Stamp.findByIdAndDelete(stampId);

    return res.status(200).send({ message: 'Stamp deleted successfully.' });
  }
);

export default router;
