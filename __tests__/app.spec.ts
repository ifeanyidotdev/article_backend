import supertest from "supertest";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../src/main";

const LOCAL_URL = "http://localhost:3000";

let mongod: MongoMemoryServer;

async function initMockDatabase() {
	mongod = await MongoMemoryServer.create();
}
const request = supertest(app);

describe("Application E2E Test", () => {
	beforeAll(async () => {
		await initMockDatabase();
		await mongoose.connect(mongod.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	describe("Article", () => {
		it("should create an article", async () => {
			await request
				.post("/api/article")
				.send({
					title: "Test Article",
					content: "Test Article Content",
				})
				.expect(201);
		});
	});
});
