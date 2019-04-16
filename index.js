const rp = require("request-promise");

module.exports = async (_, res) => {
  let result, attachments;

  try {
    result = await requestNewHackMDURL();
  } catch (error) {
    // Capture any errors
    result = error.message;
    attachments = [{ text: error.stack }];
  }

  const text = result;
  const response_type = "in_channel";

  res.writeHead(200, { "Content-Type": "application/json" });
  // Create response object and send result back to Slack
  res.end(JSON.stringify({ response_type, text, attachments }));
};

function requestNewHackMDURL() {
  return rp({
    method: "GET",
    uri: "https://hackmd.io/new",
    resolveWithFullResponse: true
  }).then((response) => {
    return response.request.href
  })
}