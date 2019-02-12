var router = require('express').Router();
var debug = require('debug')('group')
var models = require('../../models');
var constant = require('../../constant');
var fcm = require('../fcm');
var Promise = require('bluebird');
var _ = require('underscore');

router.put('/', (req, res, next) => {
    models.reunion.create(req.body)
        .then(result => {
            return res.json(result);
        }).catch(error => {
            constant.cantPutReunion.data = error;
            return res.status(400).json(constant.cantPutReunion);
        })
});
