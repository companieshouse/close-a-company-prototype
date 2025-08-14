// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here


// Enter your email address to sign in to your GOV.UK One Login
router.post('/v1/sign-in', function (req, res) {
  const emailAddress = req.session.data['email-address'];

  let errors = {};

  if (!emailAddress || emailAddress.trim() === '') {
    errors['email-address'] = {
      text: 'Enter your email address'
    };
  }

  if (Object.keys(errors).length > 0) {
    // Re-render the same page with errors
    res.render('v1/sign-in', { errors });
  } else {
    // Continue to the password page
    res.redirect('/v1/enter-password');
  }
});

// Company number
router.post('/v1/company-number', function (request, response) {
    response.redirect("/v1/view-company-info");
});



// View company info
router.post('/v1/view-company-info', function (request, response) {
    response.redirect("/v1/company-authentication");
});


// Company authentication
router.post('/v1/company-authentication', function (request, response) {
    response.redirect("/v1/which-director-are-you");
});


// Which director are you?
router.post('/v1/which-director-are-you', function (request, response) {
  
  var companyNumber = request.session.data['companyNumber'];
  var whichDirectorAreYou = request.session.data['whichDirectorAreYou'];

  if (companyNumber === "12345678") {
    if (whichDirectorAreYou === "JaneDoe") {
      response.redirect("/v1/check-your-answers-director");
    } else if (whichDirectorAreYou === "iAmNotADirectorOfThisCompany") {
      response.redirect("/v1/how-will-the-director-be-signing");
    }
  } else {
    response.redirect("/v1/which-directors-will-be-signing");
  }
});



module.exports = router;