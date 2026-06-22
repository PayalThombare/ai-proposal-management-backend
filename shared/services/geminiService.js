const ai = require("../../config/gemini");

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateContent = async (prompt) => {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      return text;
    } catch (error) {
      console.error(
        `Gemini Attempt ${attempt} Failed:`,
        error?.message
      );

      const status =
        error?.status ||
        error?.error?.code;

      if (
        (status === 503 ||
          status === 429) &&
        attempt < MAX_RETRIES
      ) {
        const delay = attempt * 3000;

        console.log(
          `Retrying in ${delay / 1000} seconds...`
        );

        await sleep(delay);
        continue;
      }

      throw new Error(
        `Failed to generate AI response: ${
          error?.message || "Unknown Error"
        }`
      );
    }
  }
};

module.exports = {
  generateContent,
};