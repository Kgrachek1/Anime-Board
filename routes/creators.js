
const express = require('express');
const router = express.Router();
const creatorsCtrl = require('../controllers/creators');
const ensureLoggedIn = require('../config/auth');



router.get('/creators/new', ensureLoggedIn, creatorsCtrl.new);

router.post('/creators/new', ensureLoggedIn, creatorsCtrl.create);

router.post('/animes/:id/creators', ensureLoggedIn, creatorsCtrl.addToCast);





module.exports = router;