import { Request, Response } from "express";
import { AuthType } from "../../types/auth.type";
import { hash_password, verifyPassword } from "../../utility/hash_password";
import AuthRepository from "./auth.repository";
import { create_token } from "../../utility/access_token";

class AuthController {
	static async signup(req: Request, res: Response) {
		try {
			const { email, password }: AuthType = req.body;

			if (email == "" || password == "") {
				res.status(400).json({
					status: 400,
					message: "Email and password are required",
				});
			}
			const userExist = await AuthRepository.login(email);
			if (userExist) {
				return res.status(409).json({
					status: 409,
					message: " User already exists",
				});
			}
			const password_hashed: string = await hash_password(password);

			const user = await AuthRepository.signup({
				email,
				password: password_hashed,
			});

			return res.status(201).json({
				status: 201,
				message: "User created successfully",
			});
		} catch (err) {
			res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const { email, password }: AuthType = req.body;
			if (email == "" || password == "") {
				res.status(400).json({
					status: 400,
					message: "Email and password are required",
				});
			}
			const user = await AuthRepository.login(email);
			if (!user) {
				return res.status(404).json({
					status: 404,
					message: "User not found",
				});
			}
			const verify = await verifyPassword(user.password, password);
			if (!verify) {
				return res.status(401).json({
					status: 401,
					message: "Incorrect password",
				});
			}
			const token = await create_token({
				email: user.email,
				id: `${user._id}`,
			});
			return res.status(200).json({
				status: 200,
				message: "Login successful",
				data: {
					token,
				},
			});
		} catch (err) {
			return res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}
}

export default AuthController;
