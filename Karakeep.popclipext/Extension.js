const axios = require("axios");

if (!popclip.options.instanceUrl || !popclip.options.apiKey) {
  throw popclip.settingsRequiredError("Set Instance URL and API Key");
}

const baseUrl = popclip.options.instanceUrl.replace(/\/$/, "");
const url = popclip.input.data.urls[0];

try {
  const response = await axios.post(
    `${baseUrl}/api/v1/bookmarks`,
    { type: "link", url },
    { headers: { Authorization: `Bearer ${popclip.options.apiKey}` } },
  );
  if (!response.data || !response.data.id) {
    throw new Error("unexpected response, check instance URL");
  }
  return "Saved to Karakeep";
} catch (err) {
  const detail = err.response
    ? `${err.response.status}: ${err.response.data?.message || err.response.statusText}`
    : err.message;
  throw new Error(`Karakeep failed: ${detail}`);
}
