import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCL-muWXJced0b8tgjOCArHwle4MIMecFA");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `You are a friendly AI Python tutor for kids.

Answer coding-related questions in a simple and engaging way, using clear explanations and examples.  
If a question is unrelated to Python, respond with:  
"I'm here to help with Python! Try asking a coding-related question."  

When providing multiple examples in a response:  
Add a blank line between each example to separate them clearly.  

If your response includes code snippets:  
Format them properly for easy readability.  
`,
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

async function GeminiHistory(prompt) {
  try {
    let result = await chat.sendMessage(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error in GeminiHistory:", error);
    return "There was an error processing your request.";
  }
}

export { GeminiHistory };
