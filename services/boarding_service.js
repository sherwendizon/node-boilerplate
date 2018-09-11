var promise = require('bluebird');
var rp = require('request-promise');
var connection = require('../utils/connection');

var boardingService = function() {
    var self = this;

    self.getOffboardingForTheMonth = function () {
      return new Promise(function(resolve, reject) {
        var offBoardQuery =
        connection.query('SELECT  e.lastname, e.firstname, eph.date_started, eph.date_ended, p.title, cl.client_name FROM emp_posn_hist AS eph, position AS p, employees AS e, contracts AS c, clients AS cl WHERE eph.emp_id=e.user_id AND eph.emp_id=p.employee_id AND p.contracts_id=c.id AND c.client_id=cl.id AND YEAR(eph.date_ended)=YEAR(CURDATE()) AND MONTH(eph.date_ended)=MONTH(CURDATE()) ORDER BY eph.date_ended DESC;', function(error, results, fields) {
          if(error) {
            console.log('Error database error Offboarding data pull: ' +JSON.stringify(error));
            throw error;
          }
          resolve({results:results});
        });
      });
    };

    self.getOnboardingForTheMonth = function () {
      return new Promise(function(resolve, reject) {
        connection.query('SELECT e.lastname, e.firstname, eph.date_started, p.title, cl.client_name FROM emp_posn_hist AS eph, position AS p, employees AS e, contracts AS c, clients AS cl WHERE eph.emp_id=e.user_id AND eph.emp_id=p.employee_id AND p.contracts_id=c.id AND c.client_id=cl.id AND YEAR(eph.date_started)=YEAR(CURDATE()) AND MONTH(eph.date_started)=MONTH(CURDATE()) ORDER BY eph.date_started DESC;', function(error, results, fields) {
          if(error) {
            console.log('Error database error for Onboarding data pull: ' +JSON.stringify(error));
            throw error;
          }
          resolve({results:results});
        });
      });
    };

    self.getOnOffboarding = function () {
      return new Promise(function(resolve, reject) {
        connection.query('SELECT e.lastname, e.firstname, eph.date_started, e.datestart, CASE WHEN `date_ended`!=\'0000-00-00\' THEN `date_ended` END new_datefinish, p.title, cl.client_name FROM emp_posn_hist AS eph, position AS p, employees AS e, contracts AS c,clients AS cl WHERE eph.emp_id=e.user_id AND eph.emp_id=p.employee_id AND p.contracts_id=c.id AND c.client_id=cl.id AND (YEAR(e.datestart)=YEAR(CURDATE()) OR YEAR(eph.date_started)=YEAR(CURDATE()))ORDER BY eph.date_started DESC;', function(error, results, fields) {
          if(error) {
            console.log('Error database error for Onboarding and Offboarding data pull: ' +JSON.stringify(error));
            throw error;
          }
          resolve({results:results});
        });
      });
    };

    this.name = 'boarding_service';
};

module.exports = new boardingService();
