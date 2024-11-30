"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTravel = exports.updateTravel = exports.createTravel = exports.getAllTravels = void 0;
let travels = [];
// GET ALL
const getAllTravels = (req, res) => {
    res.json(travels);
};
exports.getAllTravels = getAllTravels;
// CREATE NEW TRAVEL
const createTravel = (req, res) => {
    const { country, duration, cities, tourGuide } = req.body;
    // Neue Reise erstellen
    const newTravel = {
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
exports.createTravel = createTravel;
// UPDATE TRAVEL
const updateTravel = (req, res) => {
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
exports.updateTravel = updateTravel;
// DELETE TRAVEL
const deleteTravel = (req, res) => {
    const { id } = req.params;
    const travelIndex = travels.findIndex(travel => travel.id === parseInt(id, 10));
    if (travelIndex === -1) {
        res.status(404).json({ msg: 'Reise nicht gefunden' });
        return;
    }
    travels.splice(travelIndex, 1);
    res.status(204).send();
};
exports.deleteTravel = deleteTravel;
