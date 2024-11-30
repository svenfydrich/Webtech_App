import { Router } from 'express';
import {
    getAllTravels,
    createTravel,
    updateTravel,
    deleteTravel
} from '../controllers/travelControllers';

const router: Router = Router();

// GET
router.get('/', getAllTravels);

// POST
router.post('/', createTravel);

// PUT
router.put('/:id', updateTravel);

// DELETE
router.delete('/:id', deleteTravel);

export default router;
