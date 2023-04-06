import mongoose from "mongoose";

export default async function connectToDatabase() {
	const connection = await mongoose.connect(
		process.env.MONGO_URI as string,
		{}
	);
	if (connection) {
		console.log("Connected to database");
	} else {
		console.log("Failed to connect to database");
	}
}
