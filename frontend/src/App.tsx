import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Rounds } from "./pages/Rounds";
import { Questions } from "./pages/Questions";
import { Teams } from "./pages/Teams";
import { Settings } from "./pages/Settings";
import NewSet from "./pages/NewSet";
import Onboarding from "./pages/Onboarding";
import TeamPage from "./pages/TeamPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rounds" element={<Rounds />} />
          <Route path="questions" element={<Questions />} />
          <Route path="teams" element={<Teams />} />
          <Route path="team/:slug" element={<TeamPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="new" element={<NewSet />} />
          <Route path="onboarding" element={<Onboarding />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
