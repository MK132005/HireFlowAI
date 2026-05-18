const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI HR assistant that gives professional HR onboarding and employee management advice.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama3-8b-8192",
      });

    const reply =
      chatCompletion.choices[0].message
        .content;

    res.status(200).json({
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      reply: "AI failed to respond",
    });
  }
};

module.exports = {
  chatWithAI,
};