const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Auth with google
// @desc GET /auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth Callback
// @desc GET /auth/google/callback

router.get('/google/callback', passport.authenticate('google',
    {failureRedirect: '/'}), (req,res) =>{
        res.redirect('/dashboard')
    })

//@desc Log out User
//@desc /auth/logout

router.get('/logout' ,(req,res) => {
    req.logout()
    req.redirect('/')
})


module.exports = router