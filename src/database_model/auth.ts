import mongoose from "mongoose";

const AuthSechema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const AuthModel = mongoose.model("Auth", AuthSechema);
export default AuthModel;
