import express from 'express';
import User from './user.model.js';
import bcrypt from 'bcrypt';
import {
  loginUserValidationSchema,
  roleSwitchSchema,
  userValidationSchema,
} from './user.validation.js';
import validateRequestBody from '../middleware/validate.req.body.js';
import jwt from 'jsonwebtoken';
import { isUser } from '../middleware/authentication.middleware.js';

const router = express.Router();

//TODO correct status codes for every response status

//* register user
router.post(
  '/user/register',
  validateRequestBody(userValidationSchema),

  async (req, res) => {
    //extract new user from req.body
    const newUser = req.body;

    //find user using email
    const user = await User.findOne({ email: newUser.email });
    //mongoDB operations are asynchronous

    //if user exists, throw error
    if (user) {
      return res.status(409).send({ message: 'User already exists.' });
    }

    //hash password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    newUser.password = hashedPassword;

    //insert user
    await User.create(newUser);

    //send response
    return res.status(201).send({ message: 'User registered successfully.' });
  }
);

// router.api_request_method('path', middlewares) is the syntax
// Middlewares are functions that have access to the request (req), response (res), and the next function (next).
// They are executed in the order they are declared.
/* multiple middlewares because:
separation of concerns, 
cleaner code, 
early exits (eg: in case validation fails),
express is designed for it (req,res,next)
and reusability */
// validate req.body in EVERY API

//* login user
//post because we are extracting email/username and from req.body
router.post(
  '/user/login',
  validateRequestBody(loginUserValidationSchema),

  async (req, res) => {
    const loginCredentials = req.body;

    const user = await User.findOne({
      $or: [
        { email: loginCredentials.identifier },
        { username: loginCredentials.identifier },
      ],
    });
    // asynchronous operation because it queries the database, which takes time
    // a function being async means it returns a Promise

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    //if user exists, compare password using bcrypt
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      plainPassword,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(404).send({ message: 'Invalid credentials.' });
    }

    //if password is correct, generate token
    const payload = { email: user.email }; //payload can be any unique field
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }); //v fast, await not required

    //send response
    return res.status(200).send({
      message: 'Logged in successfully.',
      userDetails: user,
      accessToken: token,
    });
  }
);

/*
for secret key: go to terminal
> node
> require("crypto").randomBytes(64).toString("hex")

OR: run generate.random.string.js
*/

//* switch roles
router.patch(
  '/user/switch/role',
  isUser,
  validateRequestBody(roleSwitchSchema),
  async (req, res) => {
    const { currentRole: newRole } = req.body;
    const userId = req.loggedInUserId;

    const beforeRoleSwitch = await User.findOne({ _id: userId });

    await User.updateOne({ _id: userId }, { currentRole: newRole });

    const afterRoleSwitch = await User.findOne({ _id: userId });

    return res.status(201).send({
      message: 'Roles switched successfully.',
      data: {
        Before: beforeRoleSwitch.currentRole,
        After: afterRoleSwitch.currentRole,
      },
    });
  }
);

export default router;

//TODO: learn about publish (postman), import/export (7/21/024 timestamp: ~01:56:00)
