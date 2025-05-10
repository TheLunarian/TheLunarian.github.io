const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  const { theme, voice } = JSON.parse(event.body);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Write a haiku (5-7-5 syllables) about "${theme}" in the style or tone of ${voice}. 
Be playful, evocative, and true to the haiku form.`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a poetic ghostwriter." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9
    });

    const haiku = response.data.choices[0].message.content.trim();
    return {
      statusCode: 200,
      body: JSON.stringify({ haiku })
    };
  } catch (error) {
    console.error("OpenAI error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate haiku." }),
    };
  }
};
