var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://yuri:password@ds115546.mlab.com:15546/school_test_system', ['classes']);

router.get('/tasks', function(req, res, next){
    db.classes.find(function(err, classes){
        if(err)
        {
            res.send(err);
        }
        else{
            res.json(classes);
        }  
    });
})

module.exports = router;