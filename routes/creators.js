const express = require('express');
const router = express.Router();
const creatorsCtrl = require('../controllers/creators');
const ensureLoggedIn = require('../config/auth');

// This router is mounted to a "starts with" path of '/'

// GET /performers/new
router.get('/creators/new', ensureLoggedIn, creatorsCtrl.new);
// POST /performers
router.post('/creators/new', ensureLoggedIn, creatorsCtrl.create);
// POST /movies/:id/performers (assoc movie & performer)
router.post('/animes/:id/creators', ensureLoggedIn, creatorsCtrl.addToCast);

module.exports = router;