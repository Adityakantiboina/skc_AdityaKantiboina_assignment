import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🐍 AI Python Tutor 🎉</h1>

      {/* Application Description */}
      <div className="home-description">
        <p>
          **AI Python Tutor** is a fun and interactive learning platform designed to help kids explore Python programming in an engaging way!  
          Our friendly AI tutor explains coding concepts step-by-step, provides real-time feedback, and offers exciting coding challenges to reinforce learning. 🚀  
        </p>
        <p>
          The app features **child-friendly UI/UX**, **bright animations**, and a **playful chatbot** that makes learning easy and enjoyable.  
          Whether you're just starting or want to test your Python skills, **this is the perfect place to begin!** 🎈✨  
        </p>
      </div>

      {/* Tutor Animation */}
      <div className="home-animation">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsewed9q8NT1uA-1KmxiCbiQVeGpH7-UAvsw&s" 
          alt="AI Python Tutor" 
          className="tutor-image" 
        />
      </div>

      {/* Start Learning Button */}
      <button onClick={() => navigate("/chat")} className="home-button">
        🎈 Start Learning!
      </button>
    </div>
  );
}
