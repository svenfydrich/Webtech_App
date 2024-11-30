import { Request, Response } from 'express';

interface CityVisit {
    cityName: string;
    daysSpent: number;
}

interface Guide {
    name: string;
    languages: string[];
    phone: string;
    email: string;
}

interface Travel {
    id: number;
    country: string;
    duration: number;
    cities: CityVisit[];
    tourGuide: Guide;
}

let travels: Travel[] = [];

// GET ALL
export const getAllTravels = (req: Request, res: Response): void => {
    res.json(travels);
};

// CREATE NEW TRAVEL
export const createTravel = (req: Request, res: Response): void => {
    const { country, duration, cities, tourGuide } = req.body;

    // Neue Reise erstellen
    const newTravel: Travel = {
        id: travels.length + 1,
        country,
        duration,
        cities,
        tourGuide,
    };

    // Reise zur Liste hinzufügen
    travels.push(newTravel);
    res.status(201).json(newTravel);
};

// UPDATE TRAVEL
export const updateTravel = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { country, duration, cities, tourGuide } = req.body;

    const travelIndex = travels.findIndex(travel => travel.id === parseInt(id, 10));
    if (travelIndex === -1) {
        res.status(404).json({ msg: 'Reise nicht gefunden' });
        return;
    }

    travels[travelIndex] = { ...travels[travelIndex], country, duration, cities, tourGuide };
    res.json(travels[travelIndex]);
};

// DELETE TRAVEL
export const deleteTravel = (req: Request, res: Response): void => {
    const { id } = req.params;

    const travelIndex = travels.findIndex(travel => travel.id === parseInt(id, 10));
    if (travelIndex === -1) {
        res.status(404).json({ msg: 'Reise nicht gefunden' });
        return;
    }

    travels.splice(travelIndex, 1);
    res.status(204).send();
};