export const getPagination = (query, defaults = { page: 1, limit: 20 }) => {
  const page = Math.max(1, Number(query.page) || defaults.page);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || defaults.limit));
  return { page, limit, skip: (page - 1) * limit };
};

export const buildMeta = (total, page, limit) => ({
  page,
  limit,
  total,
  pages: Math.ceil(total / limit)
});
