// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// --------------------
// Start
// --------------------
router.post('/V4/start', function (req, res) {
  req.session.data.startedAtEmailSign = false
  res.redirect('/V4/who-to-tell')
})

// --------------------
// Sign in (email)
// --------------------
router.post('/V4/sign-in', function (req, res) {
  const emailAddress = req.session.data['email-address']
  let errors = {}

  if (!emailAddress || emailAddress.trim() === '') {
    errors['email-address'] = {
      text: 'Enter your email address'
    }
  }

  if (Object.keys(errors).length > 0) {
    res.render('V4/sign-in', { errors })
  } else {
    res.redirect('/V4/enter-password')
  }
})

// --------------------
// Company number
// --------------------
router.post('/V4/company-number', function (req, res) {
  res.redirect('/V4/view-company-info')
})

// --------------------
// View company info
// --------------------
router.post('/V4/view-company-info', function (req, res) {
  res.redirect('/V4/company-authentication')
})

// --------------------
// Email sign the application
// --------------------
router.post('/V4/email-sign-the-application', function (req, res) {
  req.session.data.startedAtEmailSign = true
  res.redirect('/V4/sign-in-to-ch')
})

// --------------------
// Company authentication
// --------------------
router.post('/V4/company-authentication', function (req, res) {
  if (req.session.data.startedAtEmailSign) {
    res.redirect('/V4/sign-the-application')
  } else {
    res.redirect('/V4/which-director-are-you')
  }
})

// --------------------
// Which director are you?
// --------------------
router.post('/V4/which-director-are-you', function (req, res) {
  const companyNumber = req.session.data.companyNumber
  const whichDirectorAreYou = req.session.data.whichDirectorAreYou

  if (companyNumber === '12345678') {
    if (
      whichDirectorAreYou === 'JaneDoe' ||
      whichDirectorAreYou === 'iAmNotADirectorOfThisCompany'
    ) {
      res.redirect('/V4/check-your-answers-single-director')
    }
  } else {
    res.redirect('/V4/which-directors-will-be-signing')
  }
})

// --------------------
// Single director signing
// --------------------
router.post('/V4/how-will-the-single-director-be-signing', function (req, res) {
  res.redirect('/V4/check-your-answers-single-director')
})

router.post('/V4/check-your-answers-single-director', function (req, res) {
  res.redirect('/V4/sign-the-application')
})

// --------------------
// Multi director signing
// --------------------
router.post('/V4/how-will-the-multi-directors-be-signing', function (req, res) {
  res.redirect('/V4/check-your-answers-multi-directors')
})

router.post('/V4/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/V4/wait-screen-other-directors-must-sign-multi-director')
})

// --------------------
// Sign the application
// --------------------
router.post('/V4/sign-the-application', function (req, res) {
  if (req.session.data.startedAtEmailSign) {
    const companyNumber = req.session.data.companyNumber

    if (companyNumber === '12345678') {
      res.redirect('/V4/wait-screen-other-signer-single-director')
    } else {
      res.redirect('/V4/wait-screen-other-signers-multi-directors')
    }
  } else {
    res.redirect('/V4/review-your-payment')
  }
})

// --------------------
// Sign in to Companies House
// --------------------
router.post('/V4/sign-in-to-ch', function (req, res) {
  res.redirect('/V4/gov-one-log-in')
})

// --------------------
// Review payment
// --------------------
router.post('/V4/review-your-payment', function (req, res) {
  res.redirect('/V4/how-do-you-want-to-pay')
})

// --------------------
// How do you want to pay?
// --------------------
router.post('/V4/how-do-you-want-to-pay', function (req, res) {
  const paymentChoice = req.body.howDoYouWantToPay

  if (paymentChoice === 'companiesHouseAccount') {
    // Go to Companies House payment account screen
    res.redirect('/V4/ch-pay')
  } else if (paymentChoice === 'creditOrDebitCard') {
    // Go to GOV.UK Pay
    res.redirect('https://products.payments.service.gov.uk/pay/aa2f2fa3be904b93887d8bef7b4909ab')
  } else {
    // Fallback (optional)
    res.redirect('/V4/how-do-you-want-to-pay')
  }
})


// --------------------
// Which directors will be signing
// --------------------
router.post('/V4/which-directors-will-be-signing', function (req, res) {
  res.redirect('/V4/provide-corporate-directors-emails')
})

// --------------------
// Provide directors’ emails
// --------------------
router.post('/V4/provide-directors-emails', function (req, res) {
  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || []

  directors.forEach((director, i) => {
    req.session.data['directorEmail' + i] = req.body['directorEmail' + i]
  })

  res.redirect('/V4/check-your-answers-multi-directors')
})

// --------------------
// Provide corporate directors’ emails
// --------------------
router.post('/V4/provide-corporate-directors-emails', function (req, res) {
  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || []

  directors.forEach((director, i) => {
    req.session.data['directorEmail' + i] = req.body['directorEmail' + i]
  })

  res.redirect('/V4/check-your-answers-multi-directors')
})

// --------------------
// Stop screen – bank account
// --------------------
router.post('/V4/stop-screen-bank-account', function (req, res) {
  res.redirect('/V4/sign-in')
})

router.post('/V4/ch-pay', function (req, res) {
  const presenterId = req.body.presenterId
  const presenterAuthCode = req.body.presenterAuthCode

  const errors = []

  if (!presenterId || presenterId.trim() === '') {
    errors.push({
      text: 'You must enter a Presenter ID',
      href: '#presenter-id'
    })
  }

  if (!presenterAuthCode || presenterAuthCode.trim() === '') {
    errors.push({
      text: 'You must enter a Presenter authentication code',
      href: '#presenter-auth-code'
    })
  }

  if (errors.length) {
    return res.render('V4/ch-pay', {
      errorSummary: errors,
      presenterId,
      presenterAuthCode
    })
  }

  // Success behaviour (prototype placeholder)
  res.redirect('/V4/payment-confirmation')
})



module.exports = router
