import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Rounds } from "./pages/Rounds";
import { Questions } from "./pages/Questions";
import { Teams } from "./pages/Teams";
import { Settings } from "./pages/Settings";
import New from "./pages/New";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rounds" element={<Rounds />} />
          <Route path="questions" element={<Questions />} />
          <Route path="teams" element={<Teams />} />
          <Route path="settings" element={<Settings />} />
          <Route path="new" element={<New />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
