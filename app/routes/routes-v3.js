// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here


// Route for Start
router.post('/V3/start', function (req, res) {
    req.session.data['startedAtEmailSign'] = false; // mark the journey
    res.redirect('/V3/who-to-tell'); // adjust to actual next step
});

// Enter your email address to sign in to your GOV.UK One Login
router.post('/V3/sign-in', function (req, res) {
  const emailAddress = req.session.data['email-address'];

  let errors = {};

  if (!emailAddress || emailAddress.trim() === '') {
    errors['email-address'] = {
      text: 'Enter your email address'
    };
  }

  if (Object.keys(errors).length > 0) {
    // Re-render the same page with errors
    res.render('V3/sign-in', { errors });
  } else {
    // Continue to the password page
    res.redirect('/V3/enter-password');
  }
});

// Company number
router.post('/V3/company-number', function (request, response) {
    response.redirect("/V3/view-company-info");
});


// View company info
router.post('/V3/view-company-info', function (request, response) {
    response.redirect("/V3/company-authentication");
});


// Route for /V3/email-sign-the-application
router.post('/V3/email-sign-the-application', function (req, res) {
    req.session.data['startedAtEmailSign'] = true; // mark the journey
    res.redirect('/V3/sign-in-to-ch'); // adjust to actual next step
});


// Company authentication
router.post('/V3/company-authentication', function (req, res) {
    if (req.session.data['startedAtEmailSign']) {
        res.redirect('/V3/sign-the-application');
    } else {
        res.redirect('/V3/which-director-are-you');
    }
});


// Which director are you?
router.post('/V3/which-director-are-you', function (request, response) {
  
  var companyNumber = request.session.data['companyNumber'];
  var whichDirectorAreYou = request.session.data['whichDirectorAreYou'];

  if (companyNumber === "12345678") {
    if (whichDirectorAreYou === "JaneDoe") {
      response.redirect("/V3/check-your-answers-single-director");
    } else if (whichDirectorAreYou === "iAmNotADirectorOfThisCompany") {
      response.redirect("/V3/check-your-answers-single-director");
    }
  } else {
    response.redirect("/V3/which-directors-will-be-signing");
  }
});


// How will the (SINGLE) director be signing the application?
router.post('/V3/how-will-the-single-director-be-signing', function (request, response) {
    response.redirect("/V3/check-your-answers-single-director");
});


// Check your answers (single director)
router.post('/V3/check-your-answers-single-director', function (request, response) {
    response.redirect("/V3/sign-the-application");
});

// How will the (SINGLE) director be signing the application?
router.post('/V3/how-will-the-multi-directors-be-signing', function (request, response) {
    response.redirect("/V3/check-your-answers-multi-directors");
});


// Check your answers (multi directors)
router.post('/V3/check-your-answers-multi-directors', function (request, response) {
    response.redirect("/V3/wait-screen-other-directors-must-sign-multi-director");
});


// Sign the application
router.post('/V3/sign-the-application', function (req, res) {
  if (req.session.data['startedAtEmailSign']) {
    const companyNumber = req.session.data['companyNumber']; // or however you’re storing it

    if (companyNumber === "12345678") {
      res.redirect('/V3/wait-screen-other-signer-single-director');
    } else {
      res.redirect('/V3/wait-screen-other-signers-multi-directors');
    }

  } else {
    res.redirect("/V3/review-your-payment");
  }
});

// Sign in to CH
router.post('/V3/sign-in-to-ch', function (request, response) {
    response.redirect("/V3/gov-one-log-in");
});

// Review your payment
router.post('/V3/review-your-payment', function (request, response) {
    response.redirect("/V3/how-do-you-want-to-pay");
});

// How do you want to pay?
router.post('/V3/how-do-you-want-to-pay', function (request, response) {
    response.redirect("https://products.payments.service.gov.uk/pay/aa2f2fa3be904b93887d8bef7b4909ab");
});

// Which directors will be signing the application?
router.post('/V3/which-directors-will-be-signing', function (request, response) {
    response.redirect("/V3/provide-corporate-directors-emails");
});

//Provide directors' email addresses
router.post('/V3/provide-directors-emails', function (req, res) {
  // Store each email in a flat key so it can be replayed
  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || [];
  directors.forEach((director, i) => {
    req.session.data['directorEmail' + i] = req.body['directorEmail' + i];
  });

  res.redirect('/V3/check-your-answers-multi-directors');
});

//Provide corporrate directors' email addresses
router.post('/V3/provide-corporate-directors-emails', function (req, res) {
  // Store each email in a flat key so it can be replayed
  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || [];
  directors.forEach((director, i) => {
    req.session.data['directorEmail' + i] = req.body['directorEmail' + i];
  });

  res.redirect('/V3/check-your-answers-multi-directors');
});


// Confirm the company bank accounts are empty
router.post('/V3/stop-screen-bank-account', function (request, response) {
    response.redirect("/V3/sign-in");
});


module.exports = router;
