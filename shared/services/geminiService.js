const ai = require("../../config/gemini");

const sleep = (ms) =>
new Promise((resolve) => setTimeout(resolve, ms));

const generateContent = async (prompt) => {
const MAX_RETRIES = 5;

for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
try {
console.log(
`Gemini Request Attempt ${attempt}`
);

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  const rawText =
    response?.text ||
    response?.candidates?.[0]?.content?.parts?.[0]
      ?.text ||
    "";

  if (!rawText) {
    throw new Error(
      "Empty response received from Gemini"
    );
  }

  const cleanedText = rawText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim();

  return cleanedText;
} catch (error) {
  console.error(
    `Gemini Attempt ${attempt} Failed:`,
    error?.message
  );

  const status =
    error?.status ||
    error?.error?.code ||
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
      "Unknown Gemini Error"
    }`
  );
}


}
};

module.exports = {
generateContent,
};
