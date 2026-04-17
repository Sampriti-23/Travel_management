const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
      },
    name: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Location', locationSchema);