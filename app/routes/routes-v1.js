// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here





   // Which director are you?
  router.post('/v1/which-director-are-you', function(request, response) {

    var whichDirectorAreYou = request.session.data['whichDirectorAreYou']
    if (whichDirectorAreYou == "JaneDoe"){
        response.redirect("/v1/check-your-answers-director")
    } else {
        response.redirect("/v1/how-will-the-director-be-signing")
    }
})

module.exports = router;