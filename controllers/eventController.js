const Event = require('../models/eventModel');

exports.listEvents = async (req, res) => {
    try {
        const events = await Event.find();
        const eventsWithDetails = events.map(event => ({
            _id: event._id,
            name: event.name,
            description: event.description,
            date: event.date,
            capacity: event.capacity,
        }));
        res.render('registerEvent', { 
            events: eventsWithDetails, 
            user: req.user, 
            error: null 
        });
    } catch (error) {
        res.render('registerEvent', { 
            events: [], 
            user: req.user, 
            error: 'Error fetching events' 
        });
    }
};