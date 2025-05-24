import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/crud_routes';
import userRoutes from './routes/user_routes'
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(todoRoutes)



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});