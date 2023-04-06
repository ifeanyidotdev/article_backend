import { Request, Response } from "express";
import ArticleRepository from "./article.repository";
import { type } from "os";
type ArticleBody = {
	title: string;
	content: string;
};

class ArticleController {
	static async createArticle(req: Request, res: Response) {
		try {
			const { title, content }: ArticleBody = req.body;
			if (title == "" || content == "") {
				res.status(400).json({
					status: 400,
					message: "Title and content are required",
				});
			}
			const article = await ArticleRepository.createArticle(title, content);
			res.status(201).json({
				status: 201,
				message: "Article created successfully",
				data: article,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}
	static async getAllArticles(req: Request, res: Response) {
		try {
			const { page, size } = req.query;
			const articles = await ArticleRepository.getAllArticles(
				parseInt(page as string),

				parseInt(size as string)
			);
			res.status(200).json({
				status: 200,
				message: "Articles fetched successfully",
				data: articles,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}
	static async getArticle(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const article = await ArticleRepository.getArticleById(id);
			return res.status(200).json({
				status: 200,
				message: "Article fetched successfully",
				data: article,
			});
		} catch (error) {
			return res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}
	static async updateArticle(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title, content }: ArticleBody = req.body;
			if (title == "" || content == "") {
				res.status(400).json({
					status: 400,
					message: "Title and content are required",
				});
			}
			const article = await ArticleRepository.updateArticle(id, title, content);
			return res.status(200).json({
				status: 200,
				message: "Article updated successfully",
				data: article,
			});
		} catch (error) {
			return res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}
	static async deleteArticle(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const article = await ArticleRepository.deleteArticle(id);
			res.status(200).json({
				status: 200,
				message: "Article deleted successfully",
				data: article,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: "Internal server error",
			});
		}
	}
}

export default ArticleController;
