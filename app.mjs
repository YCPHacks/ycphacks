import express from 'express';

import { router } from './routes/index.mjs';

const app = express();

app.use(router);

export { app };
