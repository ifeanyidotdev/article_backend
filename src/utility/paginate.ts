const getPagination = (page: number, size: number) => {
	const limit = size ? +size : 6;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

export { getPagination };
