import express, { Application } from 'express';
import travelRoutes from './routes/travels';

const app: Application = express();
const PORT: number = 1337;

//Configure Middleware and Routes
app.use(express.json());
app.use(express.static('public'));
app.use('/api/travels', travelRoutes);

//Run server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});