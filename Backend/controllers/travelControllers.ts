import { Request, Response } from "express";
import Travel, { ITravel } from "../models/Travel";
import axios from "axios";

// error-handler
const handleUnexpectedError = (
  err: unknown,
  res: Response,
  message: string
): void => {
  console.error(message, err);
  res.status(500).json({ error: message });
};

// GET ALL
export const getAllTravels = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const travels = await Travel.find();
    res.json(travels);
  } catch (err) {
    handleUnexpectedError(
      err,
      res,
      "Failed to fetch travels. Please try again later."
    );
  }
};

// CREATE NEW TRAVEL
export const createTravel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Empfange Daten: ", req.body);
    const travelData: ITravel = req.body;
    const newTravel = new Travel(travelData);
    await newTravel.save();
    console.log("Erfolgreich gespeichert: ", newTravel);
    res.status(201).json(newTravel);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Fehler beim Speichern der Reise:", err.response?.data); // Zeigt die genaue Antwort des Backends
    } else {
      handleUnexpectedError(
        err,
        res,
        "Failed to save travel. Please try again later."
      );
    }
  }
};

// UPDATE TRAVEL
export const updateTravel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const travelData: Partial<ITravel> = req.body;
    const updatedTravel = await Travel.findByIdAndUpdate(id, travelData, {
      new: true,
    });
    if (!updatedTravel) {
      res.status(404).json({ error: "Travel not found" });
    } else {
      res.json(updatedTravel);
    }
  } catch (err) {
    console.log("Error updating travel: ", err);
    res
      .status(400)
      .json({ error: "Failed to update travel. Please check your input." });
  }
};

// DELETE TRAVEL
export const deleteTravel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTravel = await Travel.findByIdAndDelete(id);
    if (!deletedTravel) {
      res.status(404).json({ error: "Travel not found" });
    } else {
      res.json({ message: "Travel deleted successfully" });
    }
  } catch (err) {
    console.log("Error deleting travel: ", err);
    res
      .status(400)
      .json({ error: "Failed to delete travel. Please check your input." });
  }
};
