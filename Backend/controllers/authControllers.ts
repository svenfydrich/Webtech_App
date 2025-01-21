import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: "Alle Felder sind erforderlich." });
      return;
    }

    const cleanedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: cleanedEmail });
    if (existingUser) {
      res.status(400).json({ message: "Benutzer existiert bereits." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email: cleanedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registrierung erfolgreich." });
  } catch (err) {
    console.error("Fehler bei der Registrierung:", err);
    res.status(500).json({ message: "Serverfehler." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const cleanedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanedEmail });

    if (!user) {
      res.status(401).json({ message: "Benutzer nicht gefunden." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Passwort ungültig." });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRATION || "15m" }
    );

    res.status(200).json({ message: "Login erfolgreich", token });
  } catch (err) {
    console.error("Fehler beim Login:", err);
    res.status(500).json({ message: "Serverfehler." });
  }
};
