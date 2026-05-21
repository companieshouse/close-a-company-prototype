const express = require('express')
const router = express.Router()

// --------------------
// New start (ds hub entry)
// --------------------
router.post('/V6/sign-in-ds-hub', function (req, res) {
  const emailAddress = req.body['email-address']

  req.session.data = req.session.data || {}
  req.session.data.startedAtAltSignIn = true

  req.session.user_email = emailAddress

  res.redirect('/V6/enter-password')
})

// --------------------
// Start (default)
// --------------------
router.post('/V6/start', function (req, res) {
  req.session.data.startedAtEmailSign = false
  req.session.data.startedAtAltSignIn = false
  res.redirect('/V6/sign-in')
})

// --------------------
// Sign in (email)
// --------------------
router.post('/V6/sign-in', function (req, res) {
  const emailAddress = req.session.data['email-address']
  req.session.user_email = emailAddress

  let errors = {}

  if (!emailAddress || emailAddress.trim() === '') {
    errors['email-address'] = {
      text: 'Enter your email address'
    }
  }

  if (Object.keys(errors).length > 0) {
    res.render('V6/sign-in', { errors })
  } else {
    res.redirect('/V6/enter-password')
  }
})

// --------------------
// Company number
// --------------------
router.post('/V6/company-number', function (req, res) {
  res.redirect('/V6/view-company-info')
})

// --------------------
// View company info
// --------------------
router.get('/V6/view-company-info', function (req, res) {
  res.render('V6/view-company-info', {
    user_email: req.session.user_email
  })
})

router.post('/V6/view-company-info', function (req, res) {
  res.redirect('/V6/company-authentication')
})

// --------------------
// Email sign the application
// --------------------
router.post('/V6/email-sign-the-application', function (req, res) {
  req.session.data.startedAtEmailSign = true
  res.redirect('/V6/sign-in-to-ch')
})

// --------------------
// Sign in to Companies House
// --------------------
router.post('/V6/sign-in-to-ch', function (req, res) {
  res.redirect('/V6/gov-one-log-in')
})

// --------------------
// Company authentication
// --------------------
router.get('/V6/company-authentication', function (req, res) {
  res.render('V6/company-authentication', {
    user_email: req.session.user_email
  })
})

router.post('/V6/company-authentication', function (req, res) {
  if (req.session.data.startedAtEmailSign) {
    return res.redirect('/V6/sign-the-application')
  }

  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/V6/test-sign-journey')
  }

  return res.redirect('/V6/which-director-are-you')
})

// --------------------
// Which director are you?
// --------------------
router.get('/V6/which-director-are-you', function (req, res) {
  res.render('V6/which-director-are-you', {
    user_email: req.session.user_email
  })
})

router.post('/V6/which-director-are-you', function (req, res) {
  const companyNumber = req.session.data.companyNumber
  const whichDirectorAreYou = req.body.whichDirectorAreYou

  req.session.data.whichDirectorAreYou = whichDirectorAreYou

  if (companyNumber === '12345678') {
    if (whichDirectorAreYou === 'JaneDoe') {
      res.redirect('/V6/sign-the-application')
    } else if (whichDirectorAreYou === 'iAmNotADirectorOfThisCompany') {
      res.redirect('/V6/provide-single-director-email')
    } else {
      res.redirect('/V6/which-directors-will-be-signing')
    }
  } else {
    res.redirect('/V6/which-directors-will-be-signing')
  }
})

// --------------------
// Single director signing
// --------------------
router.post('/V6/how-will-the-single-director-be-signing', function (req, res) {
  res.redirect('/V6/check-your-answers-single-director')
})

router.post('/V6/check-your-answers-single-director', function (req, res) {
  res.redirect('/V6/sign-the-application')
})

// --------------------
// Provide single director email
// --------------------
router.post('/V6/provide-single-director-email', function (req, res) {
  res.redirect('/V6/check-your-answers-single-director-acsp')
})

// --------------------
// Which directors will be signing
// --------------------
router.get('/V6/which-directors-will-be-signing', function (req, res) {
  res.render('V6/which-directors-will-be-signing', {
    user_email: req.session.user_email,
    data: req.session.data || {}
  })
})

router.post('/V6/which-directors-will-be-signing', function (req, res) {
  req.session.data.whichDirectorsWillBeSigningTheApplication =
    req.body.whichDirectorsWillBeSigningTheApplication || []

  res.redirect('/V6/provide-corporate-directors-emails')
})

// --------------------
// Provide corporate directors’ emails
// --------------------
router.get('/V6/provide-corporate-directors-emails', function (req, res) {
  res.render('V6/provide-corporate-directors-emails', {
    user_email: req.session.user_email
  })
})

router.post('/V6/provide-corporate-directors-emails', function (req, res) {
  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || []

  directors.forEach((director, i) => {
    const key = 'directorEmail' + i
    if (req.body[key] !== undefined) {
      req.session.data[key] = req.body[key]
    }
  })

  res.redirect('/V6/check-your-answers-multi-directors')
})

// --------------------
// Multi director signing
// --------------------
router.get('/V6/check-your-answers-multi-directors', function (req, res) {
  res.render('V6/check-your-answers-multi-directors', {
    user_email: req.session.user_email
  })
})

router.post('/V6/check-your-answers-multi-directors', function (req, res) {
  return res.redirect('/V6/sign-the-application')
})

// --------------------
// Sign the application
// --------------------
router.get('/V6/sign-the-application', function (req, res) {
  res.render('V6/sign-the-application', {
    user_email: req.session.user_email
  })
})

router.post('/V6/sign-the-application', function (req, res) {
  if (req.session.data.startedAtAltSignIn) {
    return res.redirect('/V6/company-number')
  }

  return res.redirect('/V6/review-your-payment')
})

// --------------------
// Who to tell
// --------------------
router.get('/V6/who-to-tell', function (req, res) {
  res.render('V6/who-to-tell', {
    user_email: req.session.user_email
  })
})

router.post('/V6/who-to-tell', function (req, res) {
  res.redirect('/V6/stop-screen-bank-account')
})

// --------------------


// --------------------
// DS hub sign (Ella flow)
// --------------------
router.get('/V6/sign-the-application-ds-hub', function (req, res) {
  res.render('V6/sign-the-application-ds-hub', {
    user_email: req.session.user_email
  })
})

router.post('/V6/sign-the-application-ds-hub', function (req, res) {
  res.redirect('/V6/wait-screen-other-signers-multi-directors')
})


module.exports = router
