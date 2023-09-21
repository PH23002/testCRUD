

import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import categoryRoutes from './routes/categoryRoutes';
import { categories } from './entities/categories';
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0112',
  database: 'postgres',
  entities: [categories],
  synchronize: true,
})
  .then(async (connection) => {
    console.log('Connected to PostgreSQL database');

    app.use('/api', categoryRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
