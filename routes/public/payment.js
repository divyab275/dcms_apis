var router = require('express').Router();
var debug = require('debug')('public');
var models = require('../../models');
var constant = require('../../constant');

router.post('/', (req, res, next) => {
    if(req.body.ticketName) {
        models.event.findOne({
            where: {
                name: req.body.ticketName
            }
        }).then(event => {
            req.body.eventCode = event.id
        })
    }

    if (!req.body.paid)
        req.body.paid = true;
    models.student.findOne({
        where: {
            email: req.body.userEmailId
        }
    })
        .then(student => {
            return models.eventStudent.findOne({
                where: {
                    eventId: req.body.eventCode,
                    studentId: student.id
                }
            })
        })
        .then(eventStudent => {
            eventStudent.paid = req.body.paid
            models.payment.create({
                eventStudentId: eventStudent.id,
                paid: req.body.paid
            });
            return eventStudent.save()
        })
        .then(eventStudent => {
            res.json(eventStudent)
        })
        .catch(err => {
            constant.noStudentFound.data = err;
            return res.status(400).json(constant.noStudentFound);
        })
})

module.exports = router;