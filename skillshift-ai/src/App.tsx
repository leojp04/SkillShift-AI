import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Integrantes from "./pages/Integrantes";
import Recomendacoes from "./pages/Recomendacoes";
import Contato from "./pages/Contato";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/recomendacoes" element={<Recomendacoes />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </div>
  );
}

export default App;
