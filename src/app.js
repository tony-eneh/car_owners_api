// import api route files
import 'dotenv/config';
import apiRouter from './api';

// import helping packages
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

// initialize express app
const app = express();


//integrate some middlewares
app.use(bodyParser());
app.use(cors());

//route all traffic using /api path to our router
app.use('/api', apiRouter);

//start server
app.listen(PORT, console.log`express successfully started. Running on port ${PORT}`);

