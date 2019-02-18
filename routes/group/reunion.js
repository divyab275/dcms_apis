var router = require('express').Router();
var debug = require('debug')('group')
var models = require('../../models');
var constant = require('../../constant');
var fcm = require('../fcm');
var Promise = require('bluebird');
var _ = require('underscore');
var uuid = require("uuid");


router.post('/studentDetails', (req, res, next) => {
    // console.log(req.student.id)
    console.log(req.body)
    var getReunionStudent = models.studentReunion.findAll({
        where: {
            gid: req.body.gid
        }
    });
    // var getEventStudent = models.eventStudent.findAll({
    //     where: {
    //         studentId: req.student.id
    //     }
    // });
    try {
        Promise.all([getReunionStudent])
            .spread((studentReunion) => {
                studentIds = studentReunion.map(x => {
                    return x.uid;
                });
                // eventIds = eventIds.concat(groupStudent.map(x => {
                //     return x.eventId;
                // }));
                studentIds = Array.from(new Set(studentIds));
                return models.student.findAll({
                    where: {
                        $or: [{
                            uid: studentIds
                        }]
                    }
                });
            }).then(result => {
                res.json(result);
            }).catch(error => {
                debug(error)
                constant.cantfetchEvent.data = error;
                res.status(400).json(constant.cantfetchEvent);
            });
    } catch (error) {
        debug(error);
    }
});


router.post('/findAll',(req,res)=>{
    var gid = req.body.gid;
    models.studentReunion.findAll({
        where:{
            gid:gid
        }
    })
    .then(result=>{
        console.log(res)
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/', (req, res, next) => {
    let info ={}
    info.gid = uuid();
    info.name = req.body.group;
    info.creatorID = req.body.uid;
    info.description = req.body.description;
    console.log(info);
    data={}
    models.reunion.create(info)
        .then(result => {
            console.log(result)
            var creator={}
            creator.gid = result.gid
            creator.uid = result.creatorID
            data.gid = result.gid
            models.studentReunion.create(creator)
            
        }).then(response=>{
            return res.json(data);
        })
        .catch(error => {
            console.log(error)
            //constant.cantPutReunion.data = error;
            //return res.status(400).json(constant.cantPutReunion);
        })
});


// router.post('/creategroup',(req,res)=>{
//     if(req.token!=null)//use underscore

// })

router.get('/:groupid',(req,res)=>{
    models.reunion.findAll({
        where: {
            gid: req.params.groupid
        }
    })
    .then(resp=>{
        res.send(resp)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.get('/',(req,res)=>{
    res.send("Hello")
})

router.get('/:groupid',(req,res)=>{
    models.reunion.findAll({
        where:{
            gid:groupid
        }
    })
    .then(resp=>{
        console.log("ivide keri")
        res.json(resp)
    })
    .catch(err=>{
        console.log("erorrr")

        res.send(err);
    })
})

router.post('/addStudentReunion',(req,res)=>{
    console.log(req.body)
    var data = {}
    data.gid = req.body.groupid;
    data.uid = req.body.uid;
    console.log(data)
    models.studentReunion.create(data)
    .then(resp=>{
        res.send(resp)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/name',(req,res,next)=>{
    var userid = req.body.uid
    var gid  = req.body.groupid
    console.log(userid)
    console.log(gid)
    models.studentReunion.findAll({
        where:{
            gid : gid,
            uid : userid
        }
    })
    .then(response=>{
        res.send(response)
    })
    .catch(err=>{
        console.log(err)
    })
}

)



module.exports = router;