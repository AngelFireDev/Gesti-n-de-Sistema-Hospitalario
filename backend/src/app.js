import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import routes from './routes/index.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ message: 'API OK' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
