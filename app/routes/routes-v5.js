// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// --------------------
// Start
// --------------------
router.post('/V5/start', function (req, res) {
  req.session.data.startedAtEmailSign = false
  res.redirect('/V5/who-to-tell')
})

// --------------------
// Sign in (email)
// --------------------
router.post('/V5/sign-in', function (req, res) {
  const emailAddress = req.session.data['email-address']
  let errors = {}

  if (!emailAddress || emailAddress.trim() === '') {
    errors['email-address'] = {
      text: 'Enter your email address'
    }
  }

  if (Object.keys(errors).length > 0) {
    res.render('V5/sign-in', { errors })
  } else {
    res.redirect('/V5/enter-password')
  }
})

// --------------------
// Company number
// --------------------
router.post('/V5/company-number', function (req, res) {
  res.redirect('/V5/view-company-info')
})

// --------------------
// View company info
// --------------------
router.post('/V5/view-company-info', function (req, res) {
  res.redirect('/V5/company-authentication')
})

// --------------------
// Email sign the application
// --------------------
router.post('/V5/email-sign-the-application', function (req, res) {
  req.session.data.startedAtEmailSign = true
  res.redirect('/V5/sign-in-to-ch')
})

// --------------------
// Company authentication
// --------------------
router.post('/V5/company-authentication', function (req, res) {
  if (req.session.data.startedAtEmailSign) {
    res.redirect('/V5/sign-the-application')
  } else {
    res.redirect('/V5/which-director-are-you')
  }
})

// --------------------
// Which director are you?
// --------------------
router.post('/V5/which-director-are-you', function (req, res) {
  const companyNumber = req.session.data.companyNumber
  const whichDirectorAreYou = req.body.whichDirectorAreYou

  req.session.data.whichDirectorAreYou = whichDirectorAreYou

  if (companyNumber === '12345678') {
    if (whichDirectorAreYou === 'JaneDoe') {
      res.redirect('/V5/sign-the-application')
    } else if (whichDirectorAreYou === 'iAmNotADirectorOfThisCompany') {
      res.redirect('/V5/provide-single-director-email')
    } else {
      res.redirect('/V5/which-directors-will-be-signing')
    }
  } else {
    res.redirect('/V5/which-directors-will-be-signing')
  }
})

// --------------------
// Single director signing
// --------------------
router.post('/V5/how-will-the-single-director-be-signing', function (req, res) {
  res.redirect('/V5/check-your-answers-single-director')
})

router.post('/V5/check-your-answers-single-director', function (req, res) {
  res.redirect('/V5/sign-the-application')
})

// --------------------
// Multi director signing
// --------------------
router.post('/V5/how-will-the-multi-directors-be-signing', function (req, res) {
  res.redirect('/V5/check-your-answers-multi-directors')
})

router.post('/V5/check-your-answers-multi-directors', function (req, res) {
  res.redirect('/V5/sign-the-application')
})

// --------------------
// Sign the application
// --------------------
router.post('/V5/sign-the-application', function (req, res) {

  const companyNumber = req.session.data.companyNumber
  const whichDirectorAreYou = req.session.data.whichDirectorAreYou
  const isSingleDirector = companyNumber === '12345678'

  // ----------------------------
  // MULTI DIRECTOR JOURNEY
  // ----------------------------
  if (!isSingleDirector) {
    return res.redirect('/V5/wait-screen-other-directors-must-sign-multi-director')
  }

  // ----------------------------
  // SINGLE DIRECTOR JOURNEY
  // ----------------------------
  if (isSingleDirector) {

    // Only "not a director" goes to wait screen
    if (whichDirectorAreYou === 'iAmNotADirectorOfThisCompany') {
      return res.redirect('/V5/wait-screen-other-directors-must-sign-multi-director')
    }

    // Real director goes to normal single wait screen
    if (req.session.data.startedAtEmailSign) {
      return res.redirect('/V5/wait-screen-other-signer-single-director')
    }

    return res.redirect('/V5/review-your-payment')
  }
})



// --------------------
// Sign in to Companies House
// --------------------
router.post('/V5/sign-in-to-ch', function (req, res) {
  res.redirect('/V5/gov-one-log-in')
})

// --------------------
// Review payment
// --------------------
router.post('/V5/review-your-payment', function (req, res) {
  res.redirect('/V5/how-do-you-want-to-pay')
})

// --------------------
// How do you want to pay?
// --------------------
router.post('/V5/how-do-you-want-to-pay', function (req, res) {
  const paymentChoice = req.body.howDoYouWantToPay

  if (paymentChoice === 'companiesHouseAccount') {
    res.redirect('/V5/ch-pay')
  } else if (paymentChoice === 'creditOrDebitCard') {
    res.redirect('https://products.payments.service.gov.uk/pay/5589c0c7b3934a47853cdf63b2e871dd')
  } else {
    res.redirect('/V5/how-do-you-want-to-pay')
  }
})

// --------------------
// Which directors will be signing
// --------------------
router.post('/V5/which-directors-will-be-signing', function (req, res) {
  res.redirect('/V5/provide-corporate-directors-emails')
})

// --------------------
// Provide directors’ emails
// --------------------
router.post('/V5/provide-directors-emails', function (req, res) {
  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || []

  directors.forEach((director, i) => {
    req.session.data['directorEmail' + i] = req.body['directorEmail' + i]
  })

  res.redirect('/V5/check-your-answers-multi-directors')
})

// --------------------
// Provide corporate directors’ emails
// --------------------
router.post('/V5/provide-corporate-directors-emails', function (req, res) {

  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || []

  directors.forEach((director, i) => {
    const key = 'directorEmail' + i

    // Only update if this field was submitted
    if (req.body[key] !== undefined) {
      req.session.data[key] = req.body[key]
    }
  })

  res.redirect('/V5/check-your-answers-multi-directors')
})


// --------------------
// Stop screen – bank account
// --------------------
router.post('/V5/stop-screen-bank-account', function (req, res) {
  res.redirect('/V5/sign-in')
})

// --------------------
// CH Pay 
// --------------------
router.post('/V5/ch-pay', function (req, res) {
  const presenterId = req.body.presenterId
  const presenterAuthCode = req.body.presenterAuthCode

  const errors = []

  if (!presenterId || presenterId.trim() === '') {
    errors.push({
      text: 'Enter your presenter ID',
      href: '#presenter-id'
    })
  } else {
    errors.push({
      text: 'Presenter ID must be 11 characters',
      href: '#presenter-id'
    })
  }

  if (!presenterAuthCode || presenterAuthCode.trim() === '') {
    errors.push({
      text: 'Enter your presenter authentication code',
      href: '#presenter-auth-code'
    })
  } else {
    errors.push({
      text: 'Presenter authentication code must be 11 characters',
      href: '#presenter-auth-code'
    })
  }

  return res.render('V5/ch-pay', {
    errorSummary: errors,
    presenterId,
    presenterAuthCode
  })
})

module.exports = router

// --------------------
// Change James email
// --------------------
router.get('/V5/change-directors-email-james', function (req, res) {
  res.render('V5/change-directors-email-james')
})


// --------------------
// Change Sara email
// --------------------
router.get('/V5/change-directors-email-sara', function (req, res) {

  const directors = req.session.data.whichDirectorsWillBeSigningTheApplication || []
  const saraIndex = directors.indexOf("SaraFrancis")

  res.render('V5/change-directors-email-sara', {
    saraIndex
  })
})

