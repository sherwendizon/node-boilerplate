var promise = require('bluebird');
var rp = require('request-promise');
var connection = require('../utils/connection');

var rolesService = function() {
    var self = this;

    self.getRoles = function () {
      return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM roles', function(error, results, fields) {
          if(error) {
            console.log('Error database error: ' +JSON.stringify(error));
            throw error;
          }
          resolve({results:results});
        });
      });
    };

    self.getRoleById = function (id) {
      return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM roles WHERE id=?', [id], function(error, results, fields) {
          if(error) {
            console.log('Error database error: ' +JSON.stringify(error));
            throw error;
          }
          resolve({results:results});
        });
      });
    };

    this.name = 'roles_service';
};

module.exports = new rolesService();
