var debug = require('debug')('middle');
var admin = require("firebase-admin");
var models = require('../models');

/**
 *
 * 
 */
module.exports = function(req, res, next) {
    idToken = req.body.idToken || req.headers['x-auth-token'];
    if (!idToken)
        return res.status(401).send({
            code: 1,
            data: {
                msg: "No authentication token"
            },
            message: "Authentication Error"
        });
    else if (req.url.startsWith('/user/updateGuntScore'))
    {
        debug(idToken);
        //random verification for gunt communication
        if(idToken=='yhZ1EftMKZa9')
            return next();
    }
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            req.uid = decodedToken.uid;
            debug(req.uid);
            req.profile = decodedToken;
            if (req.url.startsWith('/user')) {
                //TODO check if suspended
                next();
            } else if (req.url.startsWith('/dcms-admin/auth')) {
                next();
            } else if (req.url.startsWith('/dcms-admin')) {
                models.admin.findOne({
                    where: {
                        uid: req.profile.user_id
                    }
                }).then(admin => {
                    if (admin && admin.status){
                        req.admin = admin;
                        return next();
                    }
                    throw {
                        msg: "Not Verified"
                    }
                }).catch(error => {
                    res.status(401).send({
                        code: 1,
                        data: error,
                        message: "Authentication Error"
                    })
                });
            } else
                next();
        }).catch((error) => {
            res.status(401).send({
                code: 1,
                data: error,
                message: "Authentication Error"
            })
        });
}
