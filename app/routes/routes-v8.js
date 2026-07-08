const express = require('express')
const router = express.Router()


// --------------------
// DS HUB START
// --------------------
router.post('/v8/start', function (req, res) {

  res.redirect('/v8/sign-in-ds-hub')
})

router.get('/v8/sign-in-ds-hub', function (req, res) {
  res.render('v8/sign-in-ds-hub')
})

router.post('/v8/sign-in-ds-hub', function (req, res) {
  req.session.data = {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = req.body['email-address']

  res.redirect('/v8/enter-password')
})

router.post('/v8/sign-in-ds-hub', function (req, res) {
  req.session.data = {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = req.body['email-address']

  res.redirect('/v8/enter-password')
})

router.post('/v8/company-authentication', function (req, res) {

  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/v8/which-director-are-you')
  }

})

router.post('/v8/which-director-are-you', function (req, res) {

  const answer = req.body.whichDirectorAreYou

  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/v8/which-directors-will-be-signing')
  }

  if (answer === 'iAmNotADirectorOfThisCompany') {
    return res.redirect('/v8/which-directors-will-be-signing')
  }

  res.redirect('/v8/sign-the-application')
})

router.post('/v8/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/v8/sign-the-application')
})

router.post('/v8/sign-the-application', function (req, res) {
  res.redirect('/v8/test-sign-journey')
})



// --------------------
// SIGN IN
// --------------------
router.post('/v8/sign-in', function (req, res) {
  const email = req.session.data['email-address']
  req.session.user_email = email

  if (!email) {
    return res.render('v8/sign-in', {
      errors: {
        'email-address': { text: 'Enter your email address' }
      }
    })
  }

  res.redirect('/v8/enter-password')
})


// --------------------
// PASSWORD → CHECK PHONE (unchanged ✅)
// --------------------
router.post('/v8/enter-password', function (req, res) {
  res.redirect('/v8/check-your-phone')
})


// --------------------
// ✅ CHECK PHONE → WHO TO TELL (UPDATED ✅)
// --------------------
router.post('/v8/check-your-phone', function (req, res) {
  res.redirect('/v8/who-to-tell')
})


// --------------------
// ✅ WHO TO TELL → STOP SCREEN (unchanged ✅)
// --------------------
router.post('/v8/who-to-tell', function (req, res) {
  res.redirect('/v8/stop-screen-bank-account')
})


// --------------------
// ✅ STOP SCREEN → BACK INTO JOURNEY
// --------------------
router.post('/v8/stop-screen-bank-account', function (req, res) {
  res.redirect('/v8/company-number')
})


// --------------------
// COMPANY NUMBER
// --------------------
router.post('/v8/company-number', function (req, res) {
  res.redirect('/v8/view-company-info')
})


// --------------------
// COMPANY INFO
// --------------------
router.get('/v8/view-company-info', function (req, res) {
  res.render('v8/view-company-info')
})

router.post('/v8/view-company-info', function (req, res) {
  res.redirect('/v8/company-authentication')
})


// --------------------
// AUTH
// --------------------
router.get('/v8/company-authentication', function (req, res) {
  res.render('v8/company-authentication')
})

router.post('/v8/company-authentication', function (req, res) {

  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/v8/test-sign-journey')
  }

  return res.redirect('/v8/which-director-are-you')
})


// --------------------
// ✅ BRANCHING
// --------------------
router.post('/v8/which-director-are-you', function (req, res) {

  const answer = req.body.whichDirectorAreYou

  if (answer === 'iAmNotADirectorOfThisCompany') {
    return res.redirect('/v8/which-directors-will-be-signing')
  }

  res.redirect('/v8/sign-the-application')
})


// --------------------
// NON-DIRECTOR FLOW
// --------------------
router.post('/v8/which-directors-will-be-signing', function (req, res) {
  res.redirect('/v8/provide-corporate-directors-emails')
})

router.post('/v8/provide-corporate-directors-emails', function (req, res) {
  res.redirect('/v8/check-your-answers-multi-directors')
})

router.post('/v8/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/v8/test-sign-journey-acsp')
})


// --------------------
// MAIN DIRECTOR FLOW
// --------------------
router.post('/v8/sign-the-application', function (req, res) {
  res.redirect('/v8/review-your-payment')
})

router.post('/v8/review-your-payment', function (req, res) {
  res.redirect('/v8/who-to-tell')
})


// --------------------
// DS HUB SIGN FLOW
// --------------------
router.get('/v8/sign-the-application-ds-hub', function (req, res) {
  res.render('v8/sign-the-application-ds-hub')
})

router.post('/v8/sign-the-application-ds-hub', function (req, res) {
  res.redirect('/v8/wait-screen-other-signers-multi-directors')
})


// --------------------
module.exports = router