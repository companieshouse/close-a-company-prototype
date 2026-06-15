const express = require('express')
const router = express.Router()

// --------------------
// DS HUB START
// --------------------
router.post('/V7/sign-in-ds-hub', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = req.body['email-address']

  res.redirect('/V7/enter-password')
})


// --------------------
// DEFAULT START
// --------------------
router.post('/V7/start', function (req, res) {
  req.session.data = {}
  res.redirect('/V7/sign-in')
})


// --------------------
// SIGN IN
// --------------------
router.post('/V7/sign-in', function (req, res) {
  const email = req.session.data['email-address']
  req.session.user_email = email

  if (!email) {
    return res.render('V7/sign-in', {
      errors: {
        'email-address': { text: 'Enter your email address' }
      }
    })
  }

  res.redirect('/V7/enter-password')
})


// --------------------
// PASSWORD → PHONE
// --------------------
router.post('/V7/enter-password', function (req, res) {
  res.redirect('/V7/check-your-phone')
})

router.post('/V7/check-your-phone', function (req, res) {
  res.redirect('/V7/company-number')
})


// --------------------
// COMPANY NUMBER
// --------------------
router.post('/V7/company-number', function (req, res) {
  res.redirect('/V7/view-company-info')
})


// --------------------
// COMPANY INFO
// --------------------
router.get('/V7/view-company-info', function (req, res) {
  res.render('V7/view-company-info')
})

router.post('/V7/view-company-info', function (req, res) {
  res.redirect('/V7/company-authentication')
})


// --------------------
// AUTH
// --------------------
router.get('/V7/company-authentication', function (req, res) {
  res.render('V7/company-authentication')
})

router.post('/V7/company-authentication', function (req, res) {

  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/V7/test-sign-journey')
  }

  return res.redirect('/V7/which-director-are-you')
})


// --------------------
// ✅ BRANCHING: WHICH DIRECTOR ARE YOU
// --------------------
router.post('/V7/which-director-are-you', function (req, res) {

  const answer = req.body.whichDirectorAreYou

  // ✅ NOT a director → your new journey
  if (answer === 'iAmNotADirectorOfThisCompany') {
    return res.redirect('/V7/which-directors-will-be-signing')
  }

  // ✅ Director → existing journey
  res.redirect('/V7/sign-the-application')
})


// --------------------
// ✅ NON-DIRECTOR FLOW
// --------------------

// Which directors → provide emails
router.post('/V7/which-directors-will-be-signing', function (req, res) {
  res.redirect('/V7/provide-corporate-directors-emails')
})

// Provide emails → check answers
router.post('/V7/provide-corporate-directors-emails', function (req, res) {
  res.redirect('/V7/check-your-answers-multi-directors')
})

// Check answers → final ACSP screen
router.post('/V7/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/V7/test-sign-journey-acsp')
})


// --------------------
// ✅ MAIN DIRECTOR JOURNEY (unchanged)
// --------------------
router.post('/V7/sign-the-application', function (req, res) {
  res.redirect('/V7/review-your-payment')
})

router.post('/V7/review-your-payment', function (req, res) {
  res.redirect('/V7/who-to-tell')
})

router.post('/V7/who-to-tell', function (req, res) {
  res.redirect('/V7/stop-screen-bank-account')
})


// --------------------
// DS HUB SIGN FLOW
// --------------------
router.get('/V7/sign-the-application-ds-hub', function (req, res) {
  res.render('V7/sign-the-application-ds-hub')
})

router.post('/V7/sign-the-application-ds-hub', function (req, res) {
  res.redirect('/V7/wait-screen-other-signers-multi-directors')
})


// --------------------
module.exports = router