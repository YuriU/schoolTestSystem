var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://yuri:password@ds115546.mlab.com:15546/school_test_system', ['students']);

// Get classes
router.get('/students', function(req, res, next){
    db.students.find(function(err, students) {
        if(err) {
            res.send(err);
        } else {
            res.json(students);
        }  
    });
});

// Get single class
router.get('/student', function(req, res, next) {
    db.students.findOne({_id: mongojs.ObjectId(req.params.id)}, 
        function(err, cl){
        if(err) {
            res.send(err);
        } else {
            res.json(cl);
        }  
    });
});

// Save class
router.post('/student', function(req, res, next) {
    var cl = req.body;
    if(!cl.name){
        res.status(400);
        res.json({
            "error" : "Bad data"
        });
    } else {
        db.students.save(cl, function(err, cl){
            if(err){
                res.send(err);
            }
            res.json(cl)
        })
    }
});

// Delete class
router.delete('/student', function(req, res, next) {
    db.students.remove({_id: mongojs.ObjectId(req.params.id)}, 
        function(err, cl){
        if(err) {
            res.send(err);
        } else {
            res.json(cl);
        }  
    });
});

// Update class
router.put('/student', function(req, res, next) {
    var updClass = req.body;
    updClass._id = mongojs.ObjectId(req.params.id);
    console.log('Put class ' + mongojs.ObjectId(req.params.id));
    db.students.update({_id: mongojs.ObjectId(req.params.id)}, updClass, {}, function(err, cl){
        if(err) {
            res.send(err);
        } else {
            res.json(cl);
        }  
    });
});

module.exports = router;