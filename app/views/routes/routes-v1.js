//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/view-company-info', function (req, res) {
  const number = req.body.companyNumber;
  req.session.data['companyNumber'] = number;

  // Mock company info based on company number
  const companyData = {
    '12345678': {
      name: 'Acme Ltd',
      status: 'Active',
      incorporationDate: '1 January 2000',
      type: 'Private limited company',
      address: '123 Fake Street, London, SW1A 1AA'
    }
  };

  // Use a default if not found
  req.session.data['companyInfo'] = companyData[number] || {
    name: 'Unknown company',
    status: 'Unknown',
    incorporationDate: 'N/A',
    type: 'N/A',
    address: 'N/A'
  };

  res.redirect('/view-company-info');
});
