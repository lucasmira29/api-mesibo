import express from 'express';
import path from 'path';
import routes from './routes/mesiboRoutes.js';

const app = express();

app.use(express.json());

app.use('/static', express.static(path.join(path.resolve(), 'public')));

app.use(routes);


app.get("/video-chamada", (req, res) => {
  const { token, to } = req.query;

  if (!token || !to) {
    return res.status(400).send("Parâmetros obrigátorios ausentes");
  }

  res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});

export default app;
