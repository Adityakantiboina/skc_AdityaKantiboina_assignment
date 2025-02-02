import React, { useState } from "react";
import { GeminiHistory } from "./GeminiHistory"; // Importing AI Function
import SyntaxHighlighter from "react-syntax-highlighter"; // Syntax highlighting
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Style for code highlighting
import "./Chat.css"; // Import styles

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to detect and format Python code in AI responses
  const formatMessage = (text) => {
    const codeRegex = /```python([\s\S]*?)```/g;
    let parts = [];
    let lastIndex = 0;

    text.replace(codeRegex, (match, code, offset) => {
      if (offset > lastIndex) {
        parts.push({ type: "text", content: text.substring(lastIndex, offset) });
      }

      parts.push({ type: "code", content: code.trim() });
      lastIndex = offset + match.length;
    });

    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.substring(lastIndex) });
    }

    return parts;
  };

  // Function to copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard! 📋");
  };

  // Send message to Gemini AI and update the chat
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await GeminiHistory(input);
      setMessages([...newMessages, { sender: "ai", formattedText: formatMessage(response) }]);
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
      setMessages([...newMessages, { sender: "ai", text: "Oops! My circuits got tangled! Try again. 🤖" }]);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">🐍 Python Buddy Chat 🎈</h1>
      <p className="chat-subtitle">Ask me anything about Python! 🤓</p>

      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender === "user" ? "user-message" : "ai-message"}`}>
              {msg.formattedText
                ? msg.formattedText.map((part, i) =>
                    part.type === "code" ? (
                      <div key={i} className="code-container">
                        <div className="code-header">
                          <span className="code-label">Python Code 🐍</span>
                          <button className="copy-btn" onClick={() => copyToClipboard(part.content)}>📋 Copy</button>
                        </div>
                        <SyntaxHighlighter language="python" style={docco} className="code-block">
                          {part.content}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <span key={i} className="chat-bubble">{part.content}</span>
                    )
                  )
                : <span className="chat-bubble">{msg.text}</span>
              }
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
            placeholder="Type your question here..."
          />
          <button onClick={sendMessage} className="chat-send-btn">🚀 Send</button>
        </div>
      </div>
    </div>
  );
}
