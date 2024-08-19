import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Download from "./pages/Download";
import Home from "./pages/Home";
import Login from "./pages/kordinators/Login";
import Kordinators from "./pages/kordinators/Kordinators";
import Berkas from "./pages/kordinators/Berkas";
import Index from "./pages/kordinators/Index";
import NewLogin from "./pages/kordinators/NewLogin";
import Mahasiswa from "./pages/kordinators/Mahasiswa";
import Kordinatorss from "./pages/kordinators/Korinatorss";
import Pembimbings from "./pages/kordinators/Pembimbings";
import Pembimbing from "./pages/Pembimbing";
import KerjaPraktek from "./pages/kordinators/KerjaPraktek";
import TugasAkhir from "./pages/kordinators/TugasAkhir";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/pembimbing" element={<Pembimbing />} />
          <Route path="/kordinators" element={<Index />} />
          <Route path="/kordinators/login" element={<NewLogin />} />
          <Route path="/kordinators/berkas" element={<Berkas />} />
          <Route path="/kordinators/mahasiswa" element={<Mahasiswa />} />
          <Route path="/kordinators/kordinators" element={<Kordinatorss />} />
          <Route path="/kordinators/pembimbing" element={<Pembimbings />} />
          <Route path="/kordinators/kerja-praktek" element={<KerjaPraktek />} />
          <Route path="/kordinators/tugas-akhir" element={<TugasAkhir />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
