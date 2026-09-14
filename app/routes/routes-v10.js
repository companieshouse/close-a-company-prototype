const express = require('express')
const router = express.Router()

// --------------------
// DS HUB START
// --------------------
router.post('/V10/start', function (req, res) {
  res.redirect('/V10/sign-in-ds-hub')
})

router.get('/V10/sign-in-ds-hub', function (req, res) {
  res.render('V10/sign-in-ds-hub')
})

router.post('/V10/sign-in-ds-hub', function (req, res) {
  req.session.data = {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = req.body['email-address']
  req.session.data.signedInEmail = req.body['email-address']

  res.redirect('/V10/enter-password')
})

// --------------------
// SIGN IN
// --------------------
router.post('/V10/sign-in', function (req, res) {
  const email = req.session.data['email-address']
  req.session.user_email = email
  req.session.data.signedInEmail = email

  if (!email) {
    return res.render('V10/sign-in', {
      errors: {
        'email-address': { text: 'Enter your email address' }
      }
    })
  }

  res.redirect('/V10/enter-password')
})

// --------------------
// PASSWORD → CHECK PHONE
// --------------------
router.post('/V10/enter-password', function (req, res) {
  res.redirect('/V10/check-your-phone')
})

// --------------------
// CHECK PHONE → WHO TO TELL
// --------------------
router.post('/V10/check-your-phone', function (req, res) {
  const signedInEmail = req.session.data.signedInEmail

  if (signedInEmail === 'sara.francis@example.com') {
    return res.redirect('/V10/company-number')
  }

  res.redirect('/V10/who-to-tell')
})

// --------------------
// WHO TO TELL → STOP SCREEN
// --------------------
router.post('/V10/who-to-tell', function (req, res) {
  res.redirect('/V10/stop-screen-bank-account')
})
router.get('/V10/who-to-tell', function (req, res) {
  if (req.query.director === 'sara') {
    req.session.data.signingDirector = 'sara'
  }
  res.render('V10/who-to-tell')
})
// --------------------
// STOP SCREEN → BACK INTO JOURNEY
// --------------------
router.post('/V10/stop-screen-bank-account', function (req, res) {
  const signedInEmail = req.session.data.signedInEmail

  if (signedInEmail === 'sara.francis@example.com') {
    return res.redirect('/V10/sign-the-application')
  }

  res.redirect('/V10/company-number')
})

// --------------------
// COMPANY NUMBER
// --------------------
router.post('/V10/company-number', function (req, res) {
  res.redirect('/V10/company-authentication')
})

// --------------------
// AUTHENTICATION CODE
// --------------------
router.get('/V10/company-authentication', function (req, res) {
  res.render('V10/company-authentication')
})

router.post('/V10/company-authentication', function (req, res) {
  res.redirect('/V10/view-company-info')
})

// --------------------
// COMPANY INFO
// --------------------

router.get('/V10/view-company-info', function (req, res) {
  res.render('V10/view-company-info')
})

router.post('/V10/view-company-info', function (req, res) {
  const signedInEmail = req.session.data.signedInEmail

  if (signedInEmail === 'sara.francis@example.com') {
    return res.redirect('/V10/test-sign-journey-signed-two-directors')
  }

  res.redirect('/V10/which-director-are-you')
})

// --------------------
// BRANCHING
// --------------------
router.post('/V10/which-director-are-you', function (req, res) {

  const answer = req.body.whichDirectorAreYou
  const companyNumber = req.session.data.companyNumber

  // ACSP / accountant journey
  if (answer === 'iAmNotADirectorOfThisCompany') {
    return res.redirect('/V10/provide-single-director-email')
  }

  // Two-director journey: skip which-directors-will-be-signing
  if (companyNumber === '87654321') {
    return res.redirect('/V10/provide-single-director-email')
  }

  // User testing scenario:
  // User is Ella, one of the directors in a multi-director company
  return res.redirect('/V10/which-directors-will-be-signing')
})

// --------------------
// SINGLE DIRECTOR ACSP FLOW
// --------------------
router.post('/V10/provide-single-director-email', function (req, res) {
  res.redirect('/V10/check-your-answers-single-director-acsp')
})

router.post('/V10/check-your-answers-single-director-acsp', function (req, res) {
  const companyNumber = req.session.data.companyNumber

  if (companyNumber === '87654321') {
    return res.redirect('/V10/sign-the-application')
  }

  res.redirect('/V10/application-status-single-acsp')
})

// --------------------
// MULTI DIRECTOR FLOW
// --------------------

router.post('/V10/which-directors-will-be-signing', function (req, res) {
  res.redirect('/V10/provide-directors-emails')
})

router.post('/V10/provide-directors-emails', function (req, res) {
  res.redirect('/V10/check-your-answers-multi-directors')
})

router.post('/V10/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/V10/sign-the-application')
})

// --------------------
// SIGN THE APPLICATION
// --------------------
router.get('/V10/sign-the-application', function (req, res) {
  res.render('V10/sign-the-application', {
    query: {
      director: req.session.data.signingDirector || req.query.director
    }
  })
})

router.post('/V10/sign-the-application', function (req, res) {
  const companyNumber = req.session.data.companyNumber
  const director = req.session.data.signingDirector || req.body.director

  if (director === 'sara') {
    return res.redirect('/V10/all-directors-signed-not-paid-for-non-applicant-one-or-two')
  }

  if (companyNumber === '87654321') {
    return res.redirect('/V10/application-started-two-directors')
  }

  res.redirect('/V10/test-sign-journey')
})

router.get('/V10/sign-the-application-ds-hub', function (req, res) {
  res.render('V10/sign-the-application-ds-hub')
})

router.post('/V10/sign-the-application-ds-hub', function (req, res) {
  res.redirect('/V10/wait-screen-other-signers-multi-directors')
})

router.post('/V10/test-sign-journey-signed-two-directors', function (req, res) {
  res.redirect('/V10/who-to-tell')
})

// --------------------
module.exports = router