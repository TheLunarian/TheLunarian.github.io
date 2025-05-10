const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function(event) {
  const { theme, voice } = JSON.parse(event.body);

  const prompt = `Write a haiku (5-7-5 syllables) about "${theme}" in the style or tone of ${voice}.
Be playful, evocative, and true to the haiku form.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a poetic ghostwriter." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9
    });

    const haiku = response.choices[0].message.content.trim();
    return {
      statusCode: 200,
      body: JSON.stringify({ haiku })
    };
  } catch (error) {
    console.error("OpenAI error:", error.message, error.response?.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate haiku." }),
    };
  }
};
