require("dotenv").config();
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../types";

export const generateAccessToken = (jwtPayload: IUser) => {
  return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET_KEY as Secret, {
    expiresIn: "12h",
  });
};
