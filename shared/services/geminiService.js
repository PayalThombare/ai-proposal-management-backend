const ai = require("../../config/gemini");

const sleep = (ms) =>
new Promise((resolve) => setTimeout(resolve, ms));

const MODELS = [
"llama-3.3-70b-versatile",
"llama-3.1-8b-instant",
];

const generateContent = async (prompt) => {
const MAX_RETRIES = 3;

for (const model of MODELS) {
for (
let attempt = 1;
attempt <= MAX_RETRIES;
attempt++
) {
try {
console.log(
`Using Model: ${model} | Attempt ${attempt}`
);

    const response =
      await ai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model,
        temperature: 0.3,
      });

    const rawText =
      response?.choices?.[0]?.message
        ?.content || "";

    if (!rawText) {
      throw new Error(
        "Empty response received"
      );
    }

    return rawText.trim();
  } catch (error) {
    console.error(
      `${model} Failed:`,
      error.message
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
      await sleep(3000);
      continue;
    }

    break;
  }
}

}

throw new Error(
"All AI models failed."
);
};

module.exports = {
generateContent,
};
