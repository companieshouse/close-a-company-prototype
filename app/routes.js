// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Add your routes here
router.use('/', require('./routes/routes-v1.js'));

module.exports = router;
 