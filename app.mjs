import express from 'express';

import { router } from './routes/index.mjs';
import cors from 'cors';
const app = express();

app.use(cors());

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.use(router);

// REG: TODO -- Error-handling middleware

export { app }
