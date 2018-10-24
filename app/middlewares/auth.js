module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  req.flash('error', 'calma ai cara, antes faça o login hehe');
  return res.redirect('/');
};
