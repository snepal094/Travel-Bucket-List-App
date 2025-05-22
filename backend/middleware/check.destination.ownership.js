import Destination from '../destination/destination.model.js';
import checkMongoIdEquality from '../utils/check.mongo.id.equality.js';

const checkDestinationOwnership = async (req, res, next) => {
  const destinationId = req.params.id;

  const destination = await Destination.findById(destinationId);

  if (!destination) {
    return res.status(409).send({ message: 'Destination does not exist.' });
  }

  const isDestinationPoster = checkMongoIdEquality(
    destination.editorId,
    req.loggedInUserId
  );

  if (!isDestinationPoster) {
    return res
      .status(400)
      .send({ message: 'You did not post this destination.' });
    //TODO better language in response messages
  }

  next();
};

export default checkDestinationOwnership;
