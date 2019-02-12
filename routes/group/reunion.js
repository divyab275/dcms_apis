var router = require('express').Router();
var debug = require('debug')('group')
var models = require('../../models');
var constant = require('../../constant');
var fcm = require('../fcm');
var Promise = require('bluebird');
var _ = require('underscore');
var uuid = require("uuid");
router.post('/', (req, res, next) => {
    let info ={}
    info.gid = uuid();
    info.name = req.body.name;
    info.creatorID = 10;
    info.desciption = req.body.description;
    console.log(info);
    models.reunion.create(info)
        .then(result => {
            return res.json(result);
        }).catch(error => {
            console.log(error)
            //constant.cantPutReunion.data = error;
            //return res.status(400).json(constant.cantPutReunion);
        })
});
module.exports = router;