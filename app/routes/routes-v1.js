// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const express = require('express');
const router = express.Router();

// Add your routes here
router.post('/V1/view-company-info', function (req, res) {
  const number = req.body.companyNumber?.trim(); // remove extra whitespace
  req.session.data['companyNumber'] = number;

  const companyData = {
    '12345678': {
      name: 'Acme Ltd',
      status: 'Active',
      incorporationDate: '1 January 2000',
      type: 'Private limited company',
      address: '123 Fake Street, London, SW1A 1AA'
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


  res.redirect('/V1/view-company-info');
});

module.exports = router;
