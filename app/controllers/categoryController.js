const { Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const category = await Category.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Categoria cadastrada com sucesso!');
      return res.redirect(`/app/categories/${category.id}`);
    } catch (err) {
      return next(err);
    }
  },
};
