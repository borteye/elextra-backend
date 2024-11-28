import { Request, Response } from "express";
import pool from "../../config/db";
import { generateAccessToken } from "../../helpers/jwt";
import { signInSchema, signUpSchema } from "../../schema/auth";
import * as queries from "../queries/auth";
import { compareValue, hashValue } from "../../helpers/bcrpyt";
import { IUser } from "../../types";

const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    await signUpSchema.validate({ username, email, password }).catch((err) => {
      return res.status(400).json({ success: false, error: err.message });
    });

    const usernameExistence = await pool.query(
      queries.CHECK_USERNAME_EXISTENCE,
      [username]
    );
    if (usernameExistence.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    }

    const emailExistence = await pool.query(queries.CHECK_EMAIL_EXISTENCE, [
      email,
    ]);
    if (emailExistence.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const hashedPassword = await hashValue(password);

    await pool.query(queries.CREATE_USER, [username, email, hashedPassword]);

    res.status(200).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      errorMessage: "Something went wrong. Please try again later.",
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await signInSchema.validate({ email, password }).catch((err) => {
      return res.status(400).json({ success: false, error: err.message });
    });

    const usernameExistence = await pool.query(queries.CHECK_EMAIL_EXISTENCE, [
      email,
    ]);
    const user: IUser = usernameExistence.rows[0];
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Email & Password does not match with our record.",
      });
    }

    const isPasswordValid = await compareValue(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Email & Password does not match with our record.",
      });
    }

    const accessTokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(accessTokenPayload);
    if (!accessToken) {
      return res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again later.",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        message: "Logged in successfully",
        user: accessTokenPayload,
        token: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      errorMessage: "Something went wrong. Please try again later.",
    });
  }
};

export { signIn, signUp };
