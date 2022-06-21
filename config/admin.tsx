const { urls } = require('./urls');

// config used by dashboard client side only
const config = {
  // dashboard UI language
  language: "en",
  apiBaseUrl: urls.apiBaseUrl,
  apiWebSocketUrl: "ws://localhost:3001",
  developerMode: true,
}

export default config
