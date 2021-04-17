const wrapPromiseResponse = function (responseHandler) {
  return function (req, res) {
    try {
      responseHandler(req, res).then(
        function (result) {
          res.json(result);
        }
      ).catch(
        function (error) {
          sendClientError(res, error);
        }
      );
    } catch (responseHandlerError) {// Server code error here
      sendClientError(res, responseHandlerError);
    }
  };
};

function sendClientError(res, error) {
  if (typeof error === "string") {
    error = {
      message: error
    };
  }

  error = error || {};
  const message = error.message || "No error message.";
  const name = error.name || "Error";
  const code = error.code || "no_code";
  const statusCode = error.status || 500;

  res.status(statusCode);
  const errorResponse = {
    name: name,
    message: message,
    code: code
  };

  res.json(errorResponse);
}

module.exports = {
  wrapPromiseResponse
};
