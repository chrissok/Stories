const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

const GOOGLE_CLIENT_ID = "553614944986-mnf491aqc9g2165i2qr07vbd5lgbsrbd.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "G_lPJB9X5rapoivnjJUosmqc";

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile, done) =>{
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
      }
        try {
          let user = await User.findOne({googleId: profile.id})

          if(user){
            done(null,user)
          }else{
            user =  await User.create(newUser)
            done(null,user)
          }
        } catch (error) {
          console.error(error)
        }
    }
    ))
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });
}