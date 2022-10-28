var express = require('express');
var router = express.Router();
const passport = require('passport');

// This app has no "home" page, 
// but your projects should 😀
router.get('/', function(req, res, next) {
  res.redirect('/users');
});

router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    scope: ['profile', 'email'],
    // Optional
    prompt: 'select_account'
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/home',
    // Change to what's best for YOUR app
    failureRedirect: '/users'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
    // Change path for your "landing" page
    res.redirect('/');
  });
});

module.exports = router;
