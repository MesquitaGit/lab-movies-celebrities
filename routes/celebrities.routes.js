const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();

router.get('/celebrities', async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render('celebrities/celebrities.hbs', { celebrities: allCelebrities })
    } catch(error) {
        next(error);
    }
})

router.get('/new-celebrity', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase} = req.body;
        const createdCelebrity = await Celebrity.create({
            name,
            occupation, 
            catchPhrase, 
        });
        console.log('A new Celebrity was created: ', createdCelebrity.name);
        res.redirect('/celebrities');
    } catch(error) {
        res.render('celebrities/new-celebrity');
        console.log(error)
    }
});

module.exports = router;