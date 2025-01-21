import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticateToken";
import User from "../models/User";

export const getUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (typeof req.user === "string" || !req.user) {
      res.status(403).json({ message: "Ungültiger Token." });
      return;
    }

    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "Benutzer nicht gefunden." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler." });
  }
};
