const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },

  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res) {
    const { email } = req.body;

    if (await User.findOne({ where: { email } })) {
      req.flash('error', 'Ooops, e-mail já cadastrado!');
      return res.redirect('back');
    }
    const password = await bcrypt.hash(req.body.password, 5);
    await User.create({ ...req.body, password });

    req.flash('success', 'Usuário cadastrado com sucesso!');
    return res.redirect('/');
  },

  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('error', 'iih, usuário inexistente');
      return res.redirect('back');
    }

    if (!await bcrypt.compare(password, user.password)) {
      req.flash('error', 'opsss, senha incorreta cara!');
      return res.redirect('back');
    }

    req.session.user = user;
    return req.session.save(() => {
      res.redirect('app/dashboard');
    });
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
