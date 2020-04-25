const {
    Router
} = require('express');
const router = Router();
const passport = require('passport');
const bcryptjs = require('bcryptjs');

// Models
const User = require('../models/User');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

router.get('/users/changePassword', isAuthenticated, async (req,res) =>{
  const user = await User.findById(req.user);
  res.render('users/changePassword', {user});
})

router.post('/users/signin', passport.authenticate("local", {
    successRedirect: "/productos",
    failureRedirect: "/users/signin",
    failureFlash: true
}));

router.get('/users/signup',isAuthenticated , (req, res) => {
    res.render('users/signup')
});

router.put('/users/changePassword/:id', isAuthenticated, async (req, res) => {
  let errores = [];
  var {
    oldPassword,
    password,
    confirmedPassword
  } = req.body;
  var currentPass = req.user.password;
  console.log(currentPass);
  currentPass = bcryptjs.getSalt(currentPass);
  console.log(currentPass);
  console.log(oldPassword);
  if(!password || !oldPassword || !confirmedPassword){
    errores.push({text:"Por favor llene todos los campos"});
    console.log('1');
  }
  if(oldPassword != currentPass){
    errores.push({text:"Su contraseña actual no es correcta"});
    console.log('2');
  }
  if(password != confirmedPassword){
    errores.push({text: "Por favor revise que su nueva contraseña este bien escrita en ambos campos"});
    console.log('3');
  }
  if(errores.length > 0){
    console.log('4');
    res.render('users/changePassword', {errores});
  }else{
    password = await req.user.encryptPassword(password);
    console.log(password);
    await User.findByIdAndUpdate(req.user, {
        password
    });
    req.flash("success_msg", "Ha cambiado su contraseña");
    res.redirect("/users/signin");
  }
});

router.post('/users/signup',isAuthenticated , async (req, res) => {
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

router.get('/users/logout',isAuthenticated,  (req, res) => {
    req.logout();
    req.flash("success_msg", "Sesión Cerrada");
    res.redirect("/");
});

module.exports = router;