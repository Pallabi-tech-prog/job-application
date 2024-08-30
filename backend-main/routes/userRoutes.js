const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Endpoint to create a new user
router.post('/create-user', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Check if a user with the given clerkId already exists
        let user = await User.findOne({ email });

        // If the user doesn't exist, create a new one
        if (!user) {
            user = new User({
                name,
                email,
            });
            await user.save();
            return res.status(201).json({ message: 'User created successfully', user });
        }

        // If user exists, return the existing user data
        res.status(200).json({ message: 'User already exists', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
