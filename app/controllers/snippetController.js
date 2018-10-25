const { Snippet, Category } = require('../models');

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

  async show(req, res, next) {
    try {
      const { categoryId, id } = req.params;

      const categories = await Category.findAll({
        include: [Snippet],
        where: {
          UserId: req.session.user.id,
        },
      });

      const snippets = await Snippet.findAll({
        where: { CategoryId: categoryId },
      });

      const snippet = await Snippet.findById(id);
      res.render('snippets/show', {
        activeCategory: categoryId,
        categories,
        snippets,
        currentSnippet: snippet,
      });
    } catch (err) {
      return next(err);
    }
  },
};
