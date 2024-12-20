import express from 'express';
import path from 'path';
import routes from './routes/mesiboRoutes.js';

const app = express();

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/mesibo', routes);


app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});

export default app;
