var express = require('express');
var router = express.Router();
var httpUtil = require('../utils/http');
var rolesService = require('../services/roles_service');

router.get('/', function(req, res, next){
    rolesService.getRoles().then(function (data) {
        res.send(data);
    }).catch(httpUtil.handleHttpCallError(res));
});

router.get('/:id', function(req, res, next){
    rolesService.getRoleById(req.params.id).then(function (data) {
        res.send(data);
    }).catch(httpUtil.handleHttpCallError(res));
});

router.use(function (err, req, res, next) {
    console.log('roles_route status error 500 message: ' +err);
    res.sendStatus(500);
});

module.exports = router;
