var express = require('express');
var router = express.Router();
var httpUtil = require('../utils/http');
var boardingService = require('../services/boarding_service');

router.get('/offboard_for_month', function(req, res, next){
    boardingService.getOffboardingForTheMonth().then(function (data) {
        res.send(data);
    }).catch(httpUtil.handleHttpCallError(res));
});

router.get('/onboard_for_month', function(req, res, next){
    boardingService.getOnboardingForTheMonth().then(function (data) {
        res.send(data);
    }).catch(httpUtil.handleHttpCallError(res));
});

router.get('/onboard_vs_offboard', function(req, res, next){
    boardingService.getOnOffboarding().then(function (data) {
        res.send(data);
    }).catch(httpUtil.handleHttpCallError(res));
});

router.use(function (err, req, res, next) {
    console.log('boarding_route status error 500 message: ' +err);
    res.sendStatus(500);
});

module.exports = router;
