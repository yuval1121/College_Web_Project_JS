import express, { Request, Response } from 'express';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
import { itemsRouter } from './routes/items';
import { connectDB } from './config/db';

const app = express();

//connect to database
connectDB();

// init middleware
app.use(express.json());

//routes
app.get('/', (req: Request, res: Response) =>
  res.json({ msg: 'Welcome to the game' })
);

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
