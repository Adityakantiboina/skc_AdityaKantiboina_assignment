import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Chat from "../Components/Chat";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
