var router = require('express').Router();
var debug = require('debug')('event')
var models = require('../../models');
var constant = require('../../constant.js');

/**
 * @api {get} /dcms-admin/student get student list
 * @apiGroup Admin
 *
 *
 * @apiSuccessExample {json} success
[
  {
    "id": 2,
    "name": null,
    "uid": "cJ2crx0lpVSbvPs1VbhU0BHgItE2",
    "phone": null,
    "accomodation": "none",
    "status": "pending",
    "score": 0,
    "normalisedScore": 0,
    "createdAt": "2017-02-07T09:52:54.000Z",
    "updatedAt": "2017-02-07T09:52:54.000Z",
    "collegeId": null
  }
]
 * @apiUse tokenErrors
 */
router.get('/', (req, res, next) => {
    models.student.findAll({}).then((result) => {
        res.json(result)
    }).catch(err => {
        constant.studentNotFound.error = err;
        res.status(400).json(constant.studentNotFound);
    });
});

/**
 * @api {get} /dcms-admin/student/:id get student list
 * @apiGroup Admin
 *
 *
 * @apiSuccessExample {json} success
  {
    "id": 2,
    "name": null,
    "uid": "cJ2crx0lpVSbvPs1VbhU0BHgItE2",
    "phone": null,
    "accomodation": "none",
    "status": "pending",
    "score": 0,
    "normalisedScore": 0,
    "createdAt": "2017-02-07T09:52:54.000Z",
    "updatedAt": "2017-02-07T09:52:54.000Z",
    "collegeId": null
  }
 * @apiUse tokenErrors
 */
router.get('/:id', (req, res, next) => {
    models.student.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: models.event
        }]
    }).then((result) => {
        res.json(result)
    }).catch(err => {
        constant.studentNotFound.error = err;
        res.status(400).json(constant.studentNotFound);
    });
});

/**
 * @api {get} /dcms-admin/student/:id get student details
 * @apiDescription get the student and his registered events, by specifying student id
 * @apiGroup Admin
 *
 *
 * @apiSuccessExample {json} success
{
  "id": 2,
  "name": null,
  "uid": "cJ2crx0lpVSbvPs1VbhU0BHgItE2",
  "phone": null,
  "accomodation": "none",
  "status": "pending",
  "score": 0,
  "normalisedScore": 0,
  "createdAt": "2017-02-07T09:52:54.000Z",
  "updatedAt": "2017-02-07T09:52:54.000Z",
  "collegeId": null,
  "events": [
    {
      "id": 1,
      "name": "kg",
      "description": "lkjh",
      "format": "jh",
      "problemStatement": "kjh",
      "prize1": 654,
      "prize2": 65,
      "prize3": 54,
      "group": false,
      "image": "lkj",
      "maxParticipants": 0,
      "maxGroups": 0,
      "createdAt": null,
      "updatedAt": null,
      "event_student": {
        "report": "2017-02-01T00:00:00.000Z",
        "createdAt": null,
        "updatedAt": null,
        "eventId": 1,
        "studentId": 2
      }
    }
  ]
} 
* @apiUse tokenErrors
 */
router.get('/:id', (req, res, next) => {
    models.student.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result)
    }).catch(err => {
        constant.studentNotFound.error = err;
        res.status(400).json(constant.studentNotFound);
    });
});


module.exports = router;