const { Snippet, Category } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;

      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });

      req.flash('success', 'Categoria criada com sucesso!');

      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
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

      const currentSnippet = await Snippet.findById(id);

      const activeCategory = categoryId;

      res.render('snippets/show', {
        activeCategory,
        categories,
        snippets,
        currentSnippet,
      });
    } catch (err) {
      return next(err);
    }
  },
};
