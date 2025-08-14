// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here

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