import { Secret } from "./../../node_modules/@types/jsonwebtoken/index.d";
import jwt from "jsonwebtoken";
require("dotenv").config();

type TokenObject = {
	email: string;
	id: string;
};
const secret = (process.env.SECRET_KEY as string) || "secret";

async function create_token(tokenObject: TokenObject) {
	try {
		const token = jwt.sign(tokenObject, secret, {
			expiresIn: "1h",
		});
		return token;
	} catch (err) {
		console.log(err);
	}
}

async function verify_token(token: string) {
	const verify = await jwt.verify(token, process.env.SECRET_KEY!);
	return verify;
}

export { create_token, verify_token };
