const { getPolicies, searchPolicy, getPolicyById, updatePolicy } = require('../models/policy')


const getAllPolicies = (req, res) => {
    getPolicies((err, data) => {
        if(err){
            res.json({
                error: err,
                message: 'Unable to fetch policies'
            })
        } else {
            res.json(data)
        }
    })
}

const searchPolicyByText = (req, res) => {
    const searchText = req.query.searchText;
    searchPolicy(searchText, (err, data) => {
        if(err){
            res.send('err:', err)
        } else {
            res.json(data)
        }
    })
}

const getPolicy = (req, res) => {
    getPolicyById(req.params.policyId, (err, data) => {
        if(err) {
            res.status(500).send('Error fetching policy');
        } else {
            res.json(data)
        }
    })
}

const updatePolicyById = (req, res) => {
    const policyId = req.params.id;
    const policy = {
        policyId: req.body.policy.policyId,
        purchaseDate: req.body.policy.purchaseDate,
        customer: req.body.policy.customer,
        fuel: req.body.policy.fuel,
        premium: req.body.policy.premium,
        factors: req.body.policy.factors
    };
    updatePolicy(policyId, policy, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    })
}

module.exports = {
    getAllPolicies,
    searchPolicyByText,
    getPolicy,
    updatePolicyById
}