import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/room/:roomNumber" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
