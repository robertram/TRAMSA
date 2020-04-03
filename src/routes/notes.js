const {
    Router
} = require('express');
const router = Router();

const Note = require('../models/Note');
const {isAuthenticated}= require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    const {
        title,
        description
    } = req.body;

    const errors = [];
    //Chequeo si está vacío el checkbox
    if (!title) {
        errors.push({
            text: "Please Write a Title."
        });
    }
    if (!description) {
        errors.push({
            text: "Please Write a Description"
        });
    }

    if (errors.length > 0) {
        res.render("notes/new-note", {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({
            title,
            description
        });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/notes");
        console.log(newNote);
        //res.send('ok')
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('notes/all-notes', {
        notes
    });
});

//Poner los datos en el editar
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {
        note
    });
});


router.put('notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
  await Note.findOneAndUpdate(req.params.id, { title, description }, {new: true});
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
})

router.delete('notes/delete/:id', isAuthenticated, async (req, res) => {
    /*await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
        res.redirect("/notes");*/
    console.log("id",req.params.id);
    res.send('ok')
})

module.exports = router;


//Hola Robert esta es la prueba del pull