const ai = require("../../config/gemini");

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateContent = async (prompt) => {
  const MAX_RETRIES = 5;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Groq Request Attempt ${attempt}`);

      const response =
        await ai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
        });

      const rawText =
        response?.choices?.[0]?.message?.content || "";

      if (!rawText) {
        throw new Error(
          "Empty response received from Groq"
        );
      }

      return rawText.trim();
    } catch (error) {
      console.error(
        `Groq Attempt ${attempt} Failed:`,
        error?.message
      );

      const status =
        error?.status ||
        error?.response?.status;

      if (
        [429, 500, 502, 503, 504].includes(
          Number(status)
        ) &&
        attempt < MAX_RETRIES
      ) {
        const delay = attempt * 5000;

        console.log(
          `Retrying in ${
            delay / 1000
          } seconds...`
        );

        await sleep(delay);
        continue;
      }

      throw new Error(
        `Failed to generate AI response: ${
          error?.message ||
          "Unknown Groq Error"
        }`
      );
    }
  }
};

module.exports = {
  generateContent,
};