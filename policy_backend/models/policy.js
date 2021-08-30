const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { CustomerSchema } = require('./customer')

const PolicySchema = new Schema({
    policyId: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
        enum: ['CNG', 'Petrol','Diesel']
    },
    customer: {
        customerId: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female']
        },
        income: {
            type: String
        },
        region: {
            type: String,
            enum: ['North', 'South', 'East', 'West']
        },
        maritalStatus: {
            type: Number,
            enum: [0, 1]
        }
    },
    premium: {
        type: Number,
        required: true
    },
    factors: {
        bodilyInjury: {
            type: Number,
            enum: [0, 1]
        },
        personalInjury: {
            type: Number,
            enum: [0, 1]
        },
        propertyDamage: {
            type: Number,
            enum: [0, 1]
        },
        collision: {
            type: Number,
            enum: [0, 1]
        },
        comprehensive: {
            type: Number,
            enum: [0, 1]
        }
    }
}, {collection: 'Policy'});

// PolicySchema.index({ policy_id: 'text'});
const Policy = module.exports = mongoose.model('Policy', PolicySchema);


const getPolicies = (callback) => {
    Policy.find(callback);
}

const getPolicyById = (policyId, callback) => {
    console.log(policyId)
    Policy.findOne({policyId}).exec(callback)
}

const searchPolicy = async (searchString, callback) => {
    console.log(Number(searchString))
    Policy.find({$or : [{'policyId': new RegExp(searchString, "i")}, {'customer.customerId': Number(searchString)}]}).exec(callback);
}

const insertRecords = (policies, callback) => {
    Policy.insertMany(policies, callback);
}

const updatePolicy = (policyId, policy, callback) => {
    console.log(policyId);
    Policy.updateOne({policyId: policyId.toString()}, policy, {upsert: false}).exec(callback);
}

module.exports = {
    getPolicies,
    searchPolicy,
    insertRecords,
    getPolicyById,
    updatePolicy
}