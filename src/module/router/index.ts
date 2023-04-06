import { Express, Router } from "express";
import ArticleController from "../article/article.controller";
import AuthController from "../auth/auth.controller";

function router(app: Express) {
	app.post("/api/article", ArticleController.createArticle);
	app.get("/api/article", ArticleController.getAllArticles);
	app.put("/api/article/:id", ArticleController.updateArticle);
	app.get("/api/article/:id", ArticleController.getArticle);
	app.delete("/api/article/:id", ArticleController.deleteArticle);
	app.post("/api/signup", AuthController.signup);
	app.post("/api/signin", AuthController.login);
}

export default router;
