// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here
//Generate Mock company data after company look up 
// POST: Handles form submission and saves company data
router.post('/V1/view-company-info', function (req, res) {
  const number = req.body.companyNumber?.trim(); // remove extra whitespace
  req.session.data['companyNumber'] = number;

  const companyData = {
    '12345678': {
      name: 'Acme Ltd',
      status: 'Active',
      incorporationDate: '1 January 2000',
      type: 'Private limited company',
      address: '123 Fake Street, London, SW1A 1AA',
      director: 'Jane Doe'
    }
  };

  const matchedCompany = companyData[number] || {
    name: 'Unknown company',
    status: 'Unknown',
    incorporationDate: 'N/A',
    type: 'N/A',
    address: 'N/A'
  };

  req.session.data['companyInfo'] = matchedCompany;

  // Redirect to the GET version of the same page
  res.redirect('/V1/view-company-info');
});

// GET route to render company info
router.get('/V1/view-company-info', function (req, res) {
  const company = req.session.data['companyInfo'];
  const companyNumber = req.session.data['companyNumber'];

  res.render('V1/view-company-info', {
    company,
    companyNumber
  });
});

// POST route for authentication form submission
router.post('/v1/company-authentication-v1', (req, res) => {
  // You can validate the authentication code here if needed

  // Redirect to the director selection page
  res.redirect('/v1/which-director-are-you-v1');
});

// GET route to render director selection page
router.get('/v1/which-director-are-you-v1', (req, res) => {
  const company = req.session.data['companyInfo'] || {};
  const companyNumber = req.session.data['companyNumber'] || '';

  res.render('v1/which-director-are-you-v1', {
    company,
    companyNumber
  });
});

module.exports = router;
