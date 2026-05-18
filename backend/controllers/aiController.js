const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result =
      await model.generateContent([
        {
          text: `You are an AI HR assistant. Answer professionally.\n\nUser: ${message}`,
        },
      ]);

    const response =
      await result.response;

    const text = response.text();

    res.status(200).json({
      reply: text,
    });
  } catch (error) {
    console.log("GEMINI ERROR:", error);

    res.status(500).json({
      reply: "AI failed to respond",
    });
  }
};

module.exports = {
  chatWithAI,
};