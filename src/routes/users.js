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
    failureRedirect: "/",
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
    let errors = [];
    const {
        name,
        email,
        password,
        confirm_password
    } = req.body;
    if (name.length <= 0) {
        errors.push({
            text: 'Please insert your name'
        })
    }
    /*Usar Express Validator*/
    if (email.length <= 0) {
        errors.push({
            text: 'Please insert your email'
        })
    }
    if (password.length <= 0) {
        errors.push({
            text: 'Please insert your password'
        })
    }
    if (confirm_password.length <= 0) {
        errors.push({
            text: 'Please insert your confirmed password'
        })
    }

    if (password != confirm_password) {
        errors.push({
            text: "Passwords do not match."
        });
    }
    if (password.length < 4) {
        errors.push({
            text: "Passwords must be at least 4 characters."
        });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email
        });
    } else {
        // Look for email coincidence
        const emailUser = await User.findOne({
            email: email
        });
        if (emailUser) {
            req.flash("error_msg", "The Email is already in use.");
            res.redirect("/users/signup");
        } else {
            // Saving a New User
            const newUser = new User({
                name,
                email,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "You are registered.");
            res.redirect("/users/signin");
        }
    }
})

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash("success_msg", "Sesión Cerrada");
    res.redirect("/users/signin");
});

module.exports = router;