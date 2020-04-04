const {
    Router
} = require('express');
const router = Router();
const passport = require('passport');

// Models
const User = require('../models/User');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate("local", {
    successRedirect: "/productos",
    failureRedirect: "/users/signin",
    failureFlash: true
}));

router.get('/users/signup', isAuthenticated, (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', isAuthenticated, async (req, res) => {
    let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Contraseñas no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "Contraseña debe ser de más de 4 caractéres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo ya está en uso");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Te has registrado");
      res.redirect("/users/signup");
    }
  }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash("success_msg", "Sesión Cerrada");
    res.redirect("/");
});

module.exports = router;