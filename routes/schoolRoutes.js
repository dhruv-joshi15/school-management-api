const express = require("express");
const router = express.Router();
const School = require("../models/School");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Create a new school (Only Admins)
router.post("/", protect, adminOnly, async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const newSchool = new School({ name, address, phone, admin: req.user.id });
        await newSchool.save();
        res.status(201).json(newSchool);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all schools (Any Authenticated User)
router.get("/", protect, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default: page 1
        const limit = parseInt(req.query.limit) || 10; // Default: 10 per page
        const skip = (page - 1) * limit;

        const schools = await School.find().skip(skip).limit(limit);
        const totalSchools = await School.countDocuments();

        res.json({
            totalPages: Math.ceil(totalSchools / limit),
            currentPage: page,
            schools
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Update school (Only Admins)
router.put("/:id", protect, adminOnly, async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) return res.status(404).json({ error: "School not found" });

        school.name = req.body.name || school.name;
        school.address = req.body.address || school.address;
        school.phone = req.body.phone || school.phone;

        const updatedSchool = await school.save();
        res.json(updatedSchool);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete school (Only Admins)
// ✅ Delete school (Only Admins)
router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) return res.status(404).json({ error: "School not found" });

        await school.deleteOne();
        res.json({ message: "School deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
