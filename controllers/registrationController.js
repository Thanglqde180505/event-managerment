const Registration = require('../models/registrationModel');
const Event = require('../models/eventModel');
const User = require('../models/userModel')
const mongoose = require('mongoose');

// List all registrations
exports.getRegistrations = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let filter = {};

        // If startDate and endDate are provided, add a date range filter
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Validate date range
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.render('listRegistration', { registrations: [], error: 'Invalid date format. Please select valid dates.' });
            }
            if (start > end) {
                return res.render('listRegistration', { registrations: [], error: 'Start date must be earlier than end date.' });
            }

            filter.registrationDate = {
                $gte: start,
                $lte: end,
            };
        }

        // Fetch orders based on the filter
        const registrations = await Registration.find(filter);

        // Get student and event names for each registration
        const registrationsWithNames = await Promise.all(registrations.map(async (reg) => {
            let student = null, event = null;
            try {
                student = await User.findById(reg.studentId) || await User.findOne({ _id: reg.studentId });
            } catch (e) {}
            try {
                event = await Event.findById(reg.eventId) || await Event.findOne({ _id: reg.eventId });
            } catch (e) {}
            return {
                studentName: student ? student.username : '[NOT FOUND] ' + reg.studentId,
                eventName: event ? event.name : '[NOT FOUND] ' + reg.eventId,
                registrationDate: reg.registrationDate
            };
        }));

        res.render('listRegistration', { registrations: registrationsWithNames, error: null });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).render('listRegistration', { registrations: [], error: 'An error occurred while retrieving registrations.' });
    }
};

// Cancel a registration
exports.cancelRegistration = async (req, res) => {
    const { registrationId } = req.params;

    try {
        const registration = await Registration.findById(registrationId);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        await Registration.findByIdAndDelete(registrationId);

        const event = await Event.findById(registration.registrationId);
        if (event) {
            event.capacityt += 1;
            await event.save();
        }

        res.redirect('/register/cancel');
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ message: 'Error canceling order', error });
    }
};

//Place a registration
exports.placeRegistration = async (req, res) => {
    try {
        const { eventId } = req.body;

        // Find the product
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check stock availability
        if (event.capacity <= 0) {
            return res.status(400).json({ message: 'Event is out of capacity' });
        }

        // Create the order
        const registration = new Registration({
            studentId: req.user.id,
            eventId: event._id,
            registrationDate: new Date(),
        });
        await registration.save();

        event.capacity -= 1;
        await event.save();

        res.redirect('/register/place');
    } catch (error) {
        console.error('Error placing order:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error placing order', error });
    }
};