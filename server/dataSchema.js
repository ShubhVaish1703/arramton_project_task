const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        users: [{}],
        headers: [],
    },
    {
        timestamps: true,
    }
)

const DataModel = mongoose.model('dataModel', schema)

module.exports = DataModel;