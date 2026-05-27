const express = require('express')
const router = express.Router()

// --------------------
// DS HUB START
// --------------------
router.post('/V6/sign-in-ds-hub', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = req.body['email-address']

  res.redirect('/V6/enter-password')
})

// --------------------
// DEFAULT START
// --------------------
router.post('/V6/start', function (req, res) {
  req.session.data = {}
  res.redirect('/V6/sign-in')
})

// --------------------
// SIGN IN
// --------------------
router.post('/V6/sign-in', function (req, res) {
  const email = req.session.data['email-address']
  req.session.user_email = email

  if (!email) {
    return res.render('V6/sign-in', {
      errors: {
        'email-address': { text: 'Enter your email address' }
      }
    })
  }

  res.redirect('/V6/enter-password')
})

// --------------------
// PASSWORD → PHONE
// --------------------
router.post('/V6/enter-password', function (req, res) {
  res.redirect('/V6/check-your-phone')
})

// --------------------
// ✅ PHONE → COMPANY NUMBER (CRITICAL)
// --------------------
router.post('/V6/check-your-phone', function (req, res) {
  res.redirect('/V6/company-number')
})

// --------------------
// COMPANY NUMBER
// --------------------
router.post('/V6/company-number', function (req, res) {
  res.redirect('/V6/view-company-info')
})

// --------------------
// COMPANY INFO
// --------------------
router.get('/V6/view-company-info', function (req, res) {
  res.render('V6/view-company-info')
})

router.post('/V6/view-company-info', function (req, res) {
  res.redirect('/V6/company-authentication')
})

// --------------------
// AUTH
// --------------------
router.get('/V6/company-authentication', function (req, res) {
  res.render('V6/company-authentication')
})

router.post('/V6/company-authentication', function (req, res) {

  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/V6/test-sign-journey')
  }

  return res.redirect('/V6/which-director-are-you')
})

// --------------------
// FALLBACK ROUTES (prevent crashes)
// --------------------
router.post('/V6/which-director-are-you', function (req, res) {
  res.redirect('/V6/sign-the-application')
})

router.post('/V6/sign-the-application', function (req, res) {
  res.redirect('/V6/review-your-payment')
})

router.post('/V6/review-your-payment', function (req, res) {
  res.redirect('/V6/who-to-tell')
})

router.post('/V6/who-to-tell', function (req, res) {
  res.redirect('/V6/stop-screen-bank-account')
})

// --------------------
// DS HUB SIGN FLOW
// --------------------
router.get('/V6/sign-the-application-ds-hub', function (req, res) {
  res.render('V6/sign-the-application-ds-hub')
})

router.post('/V6/sign-the-application-ds-hub', function (req, res) {
  res.redirect('/V6/wait-screen-other-signers-multi-directors')
})

// --------------------
module.exports = router