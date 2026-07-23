const axios = require("axios");

if (!popclip.options.instanceUrl || !popclip.options.apiKey) {
  throw popclip.settingsRequiredError("Set Instance URL and API Key");
}

const baseUrl = popclip.options.instanceUrl.replace(/\/$/, "");

try {
  const response = await axios.get(`${baseUrl}/api/v1/users/me`, {
    headers: { Authorization: `Bearer ${popclip.options.apiKey}` },
  });
  const user = response.data;
  if (!user || !user.id) {
    throw new Error("unexpected response, check instance URL");
  }
  return `Connected to Karakeep as ${user.name || user.email || user.id}`;
} catch (err) {
  const detail = err.response
    ? `${err.response.status}: check instance URL and API key`
    : err.message;
  throw new Error(`Karakeep failed: ${detail}`);
}
