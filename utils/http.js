module.exports = {
  handleHttpCallError: function (res) {
    return function (err) {
      var message = 'Unknown error.';
      var statusCode = 500;
      if (err.constructor.name === 'StatusCodeError') {
        message = err.response.statusMessage;
        statusCode = err.response.statusCode;
        console.log('StatusCodeError Message: ' +message);
      } else if (err.message) {
        message = err.message;
        console.log('Error: ' +message);
        if (err.statusCode) {
          statusCode = err.statusCode;
          console.log('Internal Status Code Error: ' +statusCode);
          console.log('Status Error Message: ' +err.response.statusMessage);
        }
      }
      if (message.indexOf("ECONNREFUSED") !== -1) {
        message = "Failed to connect to server.";
        console.log('Fail Error Message: ' +message);
      }
      res.status(statusCode).json({message: message});
    }
  }
};
