import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: CustomJwtPayload | string;
}

// Token-authentication + error-handling
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token fehlt." });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Token ungültig." });
      return;
    }
    req.user = decoded as CustomJwtPayload;
    next();
  });
};
