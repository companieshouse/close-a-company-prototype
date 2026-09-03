const express = require('express')
const router = express.Router()

// --------------------
// DS HUB START
// --------------------
router.post('/V11/start', function (req, res) {
  res.redirect('/V11/sign-in-ds-hub')
})

router.get('/V11/sign-in-ds-hub', function (req, res) {
  res.render('V11/sign-in-ds-hub')
})

router.post('/V11/sign-in-ds-hub', function (req, res) {
  req.session.data = {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = req.body['email-address']

  res.redirect('/V11/enter-password')
})

// --------------------
// SIGN IN
// --------------------
router.post('/V11/sign-in', function (req, res) {
  const email = req.session.data['email-address']
  req.session.user_email = email

  if (!email) {
    return res.render('V11/sign-in', {
      errors: {
        'email-address': { text: 'Enter your email address' }
      }
    })
  }

  res.redirect('/V11/enter-password')
})

// --------------------
// PASSWORD → CHECK PHONE
// --------------------
router.post('/V11/enter-password', function (req, res) {
  res.redirect('/V11/check-your-phone')
})

// --------------------
// CHECK PHONE → WHO TO TELL
// --------------------
router.post('/V11/check-your-phone', function (req, res) {
  res.redirect('/V11/who-to-tell')
})

// --------------------
// WHO TO TELL → STOP SCREEN
// --------------------
router.post('/V11/who-to-tell', function (req, res) {
  res.redirect('/V11/stop-screen-bank-account')
})

// --------------------
// STOP SCREEN → BACK INTO JOURNEY
// --------------------
router.post('/V11/stop-screen-bank-account', function (req, res) {
  res.redirect('/V11/company-number')
})

// --------------------
// COMPANY NUMBER
// --------------------
router.post('/V11/company-number', function (req, res) {
  res.redirect('/V11/company-authentication')
})

// --------------------
// AUTHENTICATION CODE
// --------------------
router.get('/V11/company-authentication', function (req, res) {
  res.render('V11/company-authentication')
})

router.post('/V11/company-authentication', function (req, res) {
  res.redirect('/V11/view-company-info')
})

// --------------------
// COMPANY INFO
// --------------------
router.get('/V11/view-company-info', function (req, res) {
  res.render('V11/view-company-info')
})

router.post('/V11/view-company-info', function (req, res) {
  res.redirect('/V11/which-director-are-you')
})

// --------------------
// BRANCHING
// --------------------
router.post('/V11/which-director-are-you', function (req, res) {

  const answer = req.body.whichDirectorAreYou

  // ACSP / accountant journey
  if (answer === 'iAmNotADirectorOfThisCompany') {
    return res.redirect('/V11/provide-single-director-email')
  }

  // User testing scenario:
  // User is Ella, one of the directors in a multi-director company
  return res.redirect('/V11/which-directors-will-be-signing')
})

// --------------------
// SINGLE DIRECTOR ACSP FLOW
// --------------------
router.post('/V11/provide-single-director-email', function (req, res) {
  res.redirect('/V11/check-your-answers-single-director-acsp')
})

router.post('/V11/check-your-answers-single-director-acsp', function (req, res) {
  res.redirect('/V11/application-status-single-acsp')
})

// --------------------
// MULTI DIRECTOR FLOW
// --------------------

router.post('/V11/which-directors-will-be-signing', function (req, res) {
  res.redirect('/V11/provide-directors-emails')
})

router.post('/V11/provide-directors-emails', function (req, res) {
  res.redirect('/V11/check-your-answers-multi-directors')
})

router.post('/V11/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/V11/sign-the-application')
})

router.post('/V11/sign-the-application', function (req, res) {
  res.redirect('/V11/test-sign-journey')
})

// --------------------
// MAIN DIRECTOR FLOW
// --------------------
router.post('/V11/sign-the-application', function (req, res) {
  res.redirect('/V11/review-your-payment')
})

// --------------------
// DS HUB SIGN FLOW
// --------------------
router.get('/V11/sign-the-application-ds-hub', function (req, res) {
  res.render('V11/sign-the-application-ds-hub')
})

router.post('/V11/sign-the-application-ds-hub', function (req, res) {
  res.redirect('/V11/wait-screen-other-signers-multi-directors')
})

// --------------------
module.exports = router