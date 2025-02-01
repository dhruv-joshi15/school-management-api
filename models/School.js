const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true }, // ✅ Indexed
    address: { type: String, required: true },
    phone: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const School = mongoose.model("School", schoolSchema);
module.exports = School;
