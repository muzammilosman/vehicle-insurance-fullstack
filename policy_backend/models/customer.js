// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const CustomerSchema = new Schema({
//     customerId: {
//         type: Number,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true,
//         enum: ['Male', 'Female']
//     },
//     income: {
//         type: String
//     },
//     region: {
//         type: String,
//         enum: ['North', 'South', 'East', 'West']
//     },
//     maritalStatus: {
//         type: Number,
//         enum: [0, 1]
//     }
// })

// const Customer = module.exports = mongoose.model('Customer', CustomerSchema);
// module.exports = {
//     CustomerSchema
// }