var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://yuri:password@ds115546.mlab.com:15546/school_test_system', ['classes']);

// Get classes
router.get('/classes', function(req, res, next){
    db.classes.find(function(err, classes) {
        if(err) {
            res.send(err);
        } else {
            res.json(classes);
        }  
    });
});

// Get single class
router.get('/class/:id', function(req, res, next) {
    db.classes.findOne({_id: mongojs.ObjectId(req.params.id)}, 
        function(err, cl){
        if(err) {
            res.send(err);
        } else {
            res.json(cl);
        }  
    });
});

// Save class
router.post('/class', function(req, res, next) {
    var cl = req.body;
    if(!cl.name){
        res.status(400);
        res.json({
            "error" : "Bad data"
        });
    } else {
        db.classes.save(cl, function(err, cl){
            if(err){
                res.send(err);
            }
            res.json(cl)
        })
    }
});

// Delete class
router.delete('/class/:id', function(req, res, next) {
    db.classes.delete({_id: mongojs.ObjectId(req.params.id)}, 
        function(err, cl){
        if(err) {
            res.send(err);
        } else {
            res.json(cl);
        }  
    });
});

// Update class
router.put('/class/:id', function(req, res, next) {
    var updClass = req.body;

    db.classes.update({_id: mongojs.ObjectId(req.params.id)}, updClass, {}, function(err, cl){
        if(err) {
            res.send(err);
        } else {
            res.json(cl);
        }  
    });
});

module.exports = router;