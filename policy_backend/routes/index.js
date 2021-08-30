var express = require('express');
var router = express.Router();
const { getAllPolicies, 
    searchPolicyByText, 
    getPolicy, 
    updatePolicyById } = require('../controllers/policy.controller')

/* GET home page. */
router.get('/get-policies', getAllPolicies);
router.get('/search-policy', searchPolicyByText );
router.get('/get-policy/:policyId', getPolicy);
router.post('/update-policy/:id', updatePolicyById);

module.exports = router;
