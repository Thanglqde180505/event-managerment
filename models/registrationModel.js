const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
    }
})

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

const registrationsWithNames = await Promise.all(registrations.map(async (reg) => {
    let student, event;
    try {
        student = await User.findById(reg.studentId);
    } catch (e) {}
    try {
        event = await Event.findById(mongoose.Types.ObjectId(reg.eventId)) || await Event.findOne({ _id: reg.eventId });
    } catch (e) {}
    return {
        studentName: student ? student.username : '[NOT FOUND] ' + reg.studentId,
        eventName: event ? event.name : '[NOT FOUND] ' + reg.eventId,
        registrationDate: reg.registrationDate
    };
}));