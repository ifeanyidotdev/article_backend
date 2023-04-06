import { AuthType } from "../../types/auth.type";
import Auth from "./../../database_model/auth";

class AuthRepository {
	static signup = async (user: AuthType) => {
		const newUser = new Auth(user);
		await newUser.save();
		return newUser;
	};
	static login = async (email: string) => {
		const user = await Auth.findOne({ email });
		return user;
	};
}

export default AuthRepository;
