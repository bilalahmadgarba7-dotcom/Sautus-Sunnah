exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method Not Allowed"
        })
      };
    }

    const { question } = JSON.parse(event.body || "{}");

    if (!question || !question.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Please enter a question."
        })
      };
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions: `
You are the official AI assistant for SAUTUS-SUNNAH.

Your purpose is to help users learn about Islam based only on:
- The Qur'an
- Authentic Sunnah
- Understanding of the Salaf as-Salih

Rules:
1. Give respectful and educational answers.
2. Do not invent Qur'an verses, Hadith, references, scholars, or rulings.
3. When giving a religious claim, provide a source or reference when possible.
4. If you are not certain about a matter, clearly say so.
5. Do not present yourself as a Mufti or qualified scholar.
6. Encourage users to consult qualified scholars for serious or disputed matters.
7. Do not answer questions unrelated to Islamic knowledge unless briefly explaining that the assistant is focused on Islamic guidance.
        `,
        input: question
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: data.error?.message || "OpenAI request failed."
        })
      };
    }

    const answer =
      data.output_text ||
      "Sorry, I could not generate an answer.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answer
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error. Please try again."
      })
    };
  }
};