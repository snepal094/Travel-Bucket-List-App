import express from 'express';
import Destination from './destination.model.js';
import {
  isEditor,
  isExplorer,
  isUser,
} from '../middleware/authentication.middleware.js';
import validateRequestBody from '../middleware/validate.req.body.js';
import {
  addDestinationValidationSchema,
  paginationDataValidationSchema,
} from './destination.validation.js';
import validateMongoIdFromParams from '../middleware/validate.mongo.id.from.params.js';
import checkDestinationOwnership from '../middleware/check.destination.ownership.js';

const router = express.Router();

//* add destinations
router.post('/destination/add', isUser, isEditor, async (req, res) => {
  validateRequestBody(addDestinationValidationSchema);
  const newDestination = req.body;
  // console.log(req.body);
  newDestination.editorId = req.loggedInUserId;
  newDestination.editorUsername = req.username;
  // console.log(req.body);

  try {
    await Destination.create(newDestination);
    res.status(201).send({
      message: 'Destination added successfully.',
      data: newDestination,
    });
  } catch (error) {
    if (error.code === 11000) {
      //MongoServerError: E11000 duplicate key error
      return res.status(409).send({
        message:
          'Destination already exists with the same name, city, and country.',
      });
    }
  }
});

//* list destinations
router.get(
  '/destination/list',
  // isUser, //people without accounts can browse
  async (req, res) => {
    const destinations = await Destination.find();
    return res
      .status(200)
      .send({ message: 'success', destinationList: destinations });
  }
);

//* get destination details
router.get(
  '/destination/details/:id',
  isUser,
  validateMongoIdFromParams,
  async (req, res) => {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(400).send({ message: 'Destination does not exist.' });
    }

    return res.status(200).send({ destinationDetails: destination });
  }
);

//* delete destination
router.delete(
  '/destination/delete/:id',
  isUser,
  isEditor,
  validateMongoIdFromParams,
  checkDestinationOwnership,
  async (req, res) => {
    await Destination.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ message: 'Destination deleted successfully.' });
  }
);

//*edit destination
router.put(
  '/destination/edit/:id',
  isUser,
  isEditor,
  validateMongoIdFromParams,
  checkDestinationOwnership,
  async (req, res) => {
    const newValues = req.body;
    await Destination.findByIdAndUpdate(req.params.id, newValues);
    // equivalent to: Destination.updateOne({ _id: id }, { $set: newValues })
    // findById, findByIdAndUpdate, findByIdAndDelete, are all provided by mongoose and not mongo
    return res
      .status(200)
      .send({ message: 'Destination edited successfully.' });
  }
  //TODO add/remove in [image]
);

//* list destinations by editor
router.post(
  '/destination/editor/list',
  isUser,
  isEditor,
  validateRequestBody(paginationDataValidationSchema),
  async (req, res) => {
    const { page, limit, searchText } = req.body;

    const skip = (page - 1) * limit;

    let match = { editorId: req.loggedInUserId };

    if (searchText) {
      match.name = { $regex: searchText, $options: 'i' };
      //search by name
      //TODO search by other fields
    }

    const destinations = await Destination.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      //TODO sorting
      {
        $project: {
          name: 1,
          city: 1,
          country: 1,
          images: 1,
          description: { $substr: ['$description', 0, 200] }, //$ because value, not field
        },
      },
    ]);

    // console.log(destinations);

    return res.status(200).send({ destinationsList: destinations });
  }
);

//* list destinations for explorer
router.post(
  '/destination/explorer/list',
  isUser,
  isExplorer,
  validateRequestBody(paginationDataValidationSchema),
  async (req, res) => {
    const { page, limit, searchText } = req.body;

    const skip = (page - 1) * limit;

    let match = {};

    if (searchText) {
      match.name = { $regex: searchText, $options: 'i' };
    }

    const destinations = await Destination.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      //TODO sorting
      {
        $project: {
          name: 1,
          city: 1,
          country: 1,
          images: 1,
          description: { $substr: ['$description', 0, 200] }, //$ because value, not field
        },
      },
    ]);

    // console.log(destinations);

    return res.status(200).send({ destinationsList: destinations });
  }
);

export default router;

//TODO chatgpt suggested smth like this
//TODO for filtering and generalising query (?key=value)
// router.get('/destinations', async (req, res) => {
//   try {
//     const filter = { ...req.query }; // generalize filtering
//     const destinations = await Destination.find(filter);
//     res.json(destinations);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });
