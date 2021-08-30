const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
const { insertRecords } = require('../models/policy');

const readCSVFile = () => {
    let policies = [];
    fs.createReadStream(path.resolve(__dirname, 'policy.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', (err) => console.log(err))
    .on('data', (data) => {
        const policyDetails = {
            policyId: data.Policy_id,
            purchaseDate: data['Date of Purchase'],
            customer: {
                customerId: data.Customer_id,
                gender: data.Customer_Gender,
                income: data['Customer_Income group'],
                region: data.Customer_Region,
                maritalStatus: Number(data.Customer_Marital_status)
            },
            fuel: data.Fuel,
            premium: Number(data.Premium),
            factors: {
                bodilyInjury: Number(data['bodily injury liability']),
                personalInjury: Number(data[' personal injury protection']),
                propertyDamage: Number(data[' property damage liability']),
                collision: Number(data[' collision']),
                comprehensive: Number(data[' comprehensive'])
            }
        };
        policies.push(policyDetails);
    })
    .on('end', (rowCount) => {
        console.log('Parsed lines: ', rowCount);
        updateDBPolicies(policies)
    });
}

const updateDBPolicies = async (policies) => {
    insertRecords(policies, (err, data) => {
        if(err){
            console.log("Error:", err)
        } else {
            console.log('Upload successfull')
        }
    })
}

module.exports = {
    readCSVFile
}