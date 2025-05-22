import User from '../user/user.model.js';
import jwt from 'jsonwebtoken';

export const isUser = async (req, res, next) => {
  const { authorization } = req.headers; // 'Bearer token'
  const splittedArray = authorization?.split(' '); // ['Bearer', 'token']
  const token = splittedArray?.length == 2 ? splittedArray[1] : null;

  if (!token) {
    return res.status(400).send({ message: 'Unauthorized' });
  }

  let payload;
  //payload will now be stored and accessed outside the scope of try{} block

  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    payload = jwt.verify(token, secretKey); // {email: value, iat: value}
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    //in the cases where token is valid but the user's document is absent from the db
    //happens in cases of deactivated or deleted accounts
    return res.status(403).send({ message: 'Unauthorized.' });
  }

  // console.log(user);
  req.loggedInUserId = user._id;
  req.role = user.currentRole;
  req.username = user.username;
  next();
};

//* MUST use isExplorer only after isUser
export const isExplorer = (req, res, next) => {
  const role = req.role;
  if (role !== 'explorer') {
    return res
      .status(401)
      .send({ message: `Unauthorized due to current role as ${role}.` });
  }
  next();
};

//* MUST use isEditor only after isUser
export const isEditor = (req, res, next) => {
  const role = req.role;
  if (role !== 'editor') {
    return res
      .status(401)
      .send({ message: `Unauthorized due to current role as ${role}.` });
  }
  next();
};
