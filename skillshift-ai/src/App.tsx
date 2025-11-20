import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Integrantes from "./pages/Integrantes";
import Recomendacoes from "./pages/Recomendacoes";
import Contato from "./pages/Contato";
import DetalheRecomendacao from "./pages/DetalheRecomendacao";
import FAQ from "./pages/FAQ";
import TrilhasDeCarreira from "./pages/TrilhasDeCarreira";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import Empresas from "./pages/Empresas";
import Usuarios from "./pages/Usuarios";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/recomendacoes" element={<Recomendacoes />} />
        <Route path="/recomendacoes/:id" element={<DetalheRecomendacao />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/trilhas" element={<TrilhasDeCarreira />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
