const Groq = require("groq-sdk");

const ai = new Groq({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports = ai;