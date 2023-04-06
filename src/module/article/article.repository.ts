import { getPagination } from "../../utility/paginate";
import Article from "./../../database_model/article";

class ArticleRepository {
	static createArticle = async (title: string, content: string) => {
		const article = new Article({ title, content });
		await article.save();
		return article;
	};
	static getAllArticles = async (page: number, size: number) => {
		const { offset, limit } = getPagination(page, size);
		const articles = await Article.paginate({}, { offset, limit });
		return articles;
	};
	static getArticleById = async (id: string) => {
		const article = await Article.findById({ _id: id });
		return article;
	};
	static updateArticle = async (id: string, title: string, content: string) => {
		const article = await Article.findByIdAndUpdate(id, { title, content });
		return article;
	};
	static deleteArticle = async (id: string) => {
		const article = await Article.findByIdAndDelete(id);
		return article;
	};
}

export default ArticleRepository;
