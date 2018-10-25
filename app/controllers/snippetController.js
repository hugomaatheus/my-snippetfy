const { Snippet } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;

      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });

      req.flash('success', 'Snippet criada com sucesso!');

      return res.redirect(`/app/categories/${req.params.categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },
};
