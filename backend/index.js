import express from 'express';
import connectDB from './database-connection/db.connect.js';
import userRoutes from './user/user.controller.js';
import destinationRoutes from './destination/destination.controller.js';
import bucketRoutes from './bucket/bucket.controller.js';
import stampRoutes from './stamp/stamp.controller.js';
import cors from 'cors';

const app = express();

//make app understand json
app.use(express.json());

//cross origin resource sharing
app.use(
  cors({
    origin: '*', //allow requests from all domains
  })
);

//connect database
await connectDB(); //connectDB() is an asynchronous function.

//register routes
app.use('/user', userRoutes);
app.use(destinationRoutes);
app.use(bucketRoutes);
app.use(stampRoutes);

//TODO: handle global error

//network port and server
// console.log(process);
const PORT = process.env.PORT; //PORT remains private this way

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
