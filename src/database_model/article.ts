import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const ArticleSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);
ArticleSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

ArticleSchema.plugin(paginate);

interface ArticleDocument extends mongoose.Document {}

const ArticleModel = mongoose.model<
	ArticleDocument,
	mongoose.PaginateModel<ArticleDocument>
>("Article", ArticleSchema);

export default ArticleModel;
