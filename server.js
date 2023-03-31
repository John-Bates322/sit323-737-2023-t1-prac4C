const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// Define the port the app will listen on
const port = 3000;

// Define JWT secret key
const JWT_SECRET_KEY = 'test';

// Define options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

// Create JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // Verify the token and find the user in your database
  // Here, we assume the user is authenticated if the token is valid
  return done(null, true);
});

// Use the JWT strategy with Passport
passport.use(jwtStrategy);
app.use(passport.initialize());

// Define middleware to authenticate and authorize requests
const requireAuth = passport.authenticate('jwt', { session: false });

// Define a route to generate and return a JWT token
app.get('/token', (req, res) => {
  const token = jwt.sign({}, JWT_SECRET_KEY, { expiresIn: '1h' });
  res.send(token);
});

// Define a route to handle addition requests
app.get('/add/:num1/:num2', requireAuth, (req, res) => {
  // Parse the input numbers from the request parameters
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);
  // Check that the input is valid and send an error message if not
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Please provide valid numbers');
  } else{
    // Perform the addition operation and send the result
    const result = num1 + num2;
    res.send(result.toString());
  }
});

// Define a route to handle subtraction requests
app.get('/subtract/:num1/:num2', requireAuth, (req, res) => {
  // Parse the input numbers from the request parameters
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  // Check that the input is valid and send an error message if not
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Please provide valid numbers');
  } else{
    // Perform the subtraction operation and send the result
    const result = num1 - num2;
    res.send(result.toString());
  }
});

// Define a route to handle multiplication requests
app.get('/multiply/:num1/:num2', requireAuth, (req, res) => {
  // Parse the input numbers from the request parameters
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  // Check that the input is valid and send an error message if not
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Please provide valid numbers');
  } else{
    // Perform the multiplication operation and send the result
    const result = num1 * num2;
    res.send(result.toString());
  }
});

// Define a route to handle division requests
app.get('/divide/:num1/:num2', requireAuth, (req, res) => {
  // Parse the input numbers from the request parameters
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  // Check that the input is valid and send an error message if not
  if (isNaN(num1) || isNaN(num2)) {
  res.status(400).send('Please provide valid numbers');
  } else if (num2 === 0) {
  // Check if the second number is zero and send an error message if so
  res.status(400).send('Cannot divide by zero');
  } else {
  // Perform the division operation and send the result
  const result = num1 / num2;
  res.send(result.toString());
  }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Calculator microservice listening at http://localhost:${port}`);
  });
