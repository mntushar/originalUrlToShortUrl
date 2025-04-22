import express, { Request, Response } from 'express';
import urlRoutes from './router/url';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});