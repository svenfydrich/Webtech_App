"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const travelControllers_1 = require("../controllers/travelControllers");
const router = (0, express_1.Router)();
// GET
router.get('/', travelControllers_1.getAllTravels);
// POST
router.post('/', travelControllers_1.createTravel);
// PUT
router.put('/:id', travelControllers_1.updateTravel);
// DELETE
router.delete('/:id', travelControllers_1.deleteTravel);
exports.default = router;
