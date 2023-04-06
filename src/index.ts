import app from "./main";
import router from "./module/router";
import connectToDatabase from "./utility/databse";

const port = 3000;

app.listen(port, async () => {
	router(app);
	await connectToDatabase();
	console.log(`Server is running on port ${port}`);
});
