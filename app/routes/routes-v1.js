// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here


// Enter your email address to sign in to your GOV.UK One Login
router.post('/V1/sign-in', function (req, res) {
  const emailAddress = req.session.data['email-address'];

  let errors = {};

  if (!emailAddress || emailAddress.trim() === '') {
    errors['email-address'] = {
      text: 'Enter your email address'
    };
  }

  if (Object.keys(errors).length > 0) {
    // Re-render the same page with errors
    res.render('V1/sign-in', { errors });
  } else {
    // Continue to the password page
    res.redirect('/V1/enter-password');
  }
});

// Company number
router.post('/V1/company-number', function (request, response) {
    response.redirect("/V1/view-company-info");
});



// View company info
router.post('/V1/view-company-info', function (request, response) {
    response.redirect("/V1/company-authentication");
});


// Company authentication
router.post('/V1/company-authentication', function (request, response) {
    response.redirect("/V1/which-director-are-you");
});


// Which director are you?
router.post('/V1/which-director-are-you', function (request, response) {
  
  var companyNumber = request.session.data['companyNumber'];
  var whichDirectorAreYou = request.session.data['whichDirectorAreYou'];

  if (companyNumber === "12345678") {
    if (whichDirectorAreYou === "JaneDoe") {
      response.redirect("/V1/check-your-answers-single-director");
    } else if (whichDirectorAreYou === "iAmNotADirectorOfThisCompany") {
      response.redirect("/V1/how-will-the-single-director-be-signing");
    }
  } else {
    response.redirect("/V1/which-directors-will-be-signing");
  }
});

// Check your answers (single director)
router.post('/V1/check-your-answers-single-director', function (request, response) {
    response.redirect("/V1/sign-the-application");
});

// How will the (SINGLE) director be signing the application?
router.post('/V1/how-will-the-single-director-be-signing', function (request, response) {
    response.redirect("/V1/application-received-for-single-director-not-signing");
});


// Sign the application
router.post('/V1/sign-the-application', function (request, response) {
    response.redirect("/V1/review-your-payment");
});

// Sign in to CH
router.post('/V1/sign-in-to-ch', function (request, response) {
    response.redirect("/V1/gov-one-log-in");
});

// Review your payment
router.post('/V1/review-your-payment', function (request, response) {
    response.redirect("/V1/how-do-you-want-to-pay");
});



//Which directors will be signing the application?
router.post('/V1/which-directors-will-be-signing', function (request, response) {
    response.redirect("/V1/how-will-the-multiple-directors-be-signing");
});

module.exports = router;