// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here
//Generate Mock company data after company look up 
// POST: Handles form submission and saves company data
//router.post('/V1/view-company-info', function (req, res) {
  //const number = req.body.companyNumber?.trim(); // remove extra whitespace
 // req.session.data['companyNumber'] = number;





  // Redirect to the GET version of the same page
  //res.redirect('/V1/view-company-info');
//});




   // Which director are you?
  router.post('/v1/which-director-are-you-v1', function(request, response) {

    var whichDirectorAreYou = request.session.data['whichDirectorAreYou']
    if (whichDirectorAreYou == "JaneDoe"){
        response.redirect("/v1/check-your-answers-director-v1")
    } else {
        response.redirect("/v1/how-will-the-director-be-signing")
    }
})

module.exports = router;