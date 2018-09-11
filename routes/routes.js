module.exports = function (app) {
    app.use('/roles', require('./roles_route'));
    app.use('/board', require('./boarding_route'));
};
