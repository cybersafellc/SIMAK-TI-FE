import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Download from "./pages/Download";
import Home from "./pages/Home";
import Login from "./pages/mahasiswa/Login";
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
import KpDetails from "./pages/kordinators/KpDetails";
import TaDetails from "./pages/kordinators/TaDetails";
import IndexMhs from "./pages/mahasiswa/IndexMhs";
import LoginPmb from "./pages/pembimbing/LoginPmb";
import IndexPmb from "./pages/pembimbing/IndexPmb";
import TugasAkhirPmb from "./pages/pembimbing/TugasAkhirPmb";
import TaDetailsPmb from "./pages/pembimbing/TaDetailsPmb";
import KerjaPraktekPmb from "./pages/pembimbing/KerjaPraktekPmb";
import KpDetailsPmb from "./pages/pembimbing/KpDetailsPmb";
import ProfileSaye from "./pages/kordinators/ProfileSaye";
import TugasAkhirMhs from "./pages/mahasiswa/TugasAkhirMhs";
import KerjaPraktekMhs from "./pages/mahasiswa/KerjaPraktekMhs";
import SeminarKp from "./pages/kordinators/SeminarKp";
import SeminarKpDetails from "./pages/kordinators/SeminarKpDetails";
import SeminarProposal from "./pages/kordinators/SeminarProposal";
import SeminarProposalDetails from "./pages/kordinators/SeminarProposalDetails";
import SeminarHasil from "./pages/kordinators/SeminarHasil";
import SeminarHasilDetails from "./pages/kordinators/SeminarHasilDetails";
import SeminarKpMhs from "./pages/mahasiswa/SeminarKpMhs";
import SeminarProposalMhs from "./pages/mahasiswa/SeminarProposalMhs";
import SeminarHasilMhs from "./pages/mahasiswa/SeminarHasilMhs";
import Register from "./pages/mahasiswa/Register";
import NotFound from "./pages/NotFound";

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
          <Route path="/kordinators/profile" element={<ProfileSaye />} />
          <Route path="/kordinators/berkas" element={<Berkas />} />
          <Route path="/kordinators/mahasiswa" element={<Mahasiswa />} />
          <Route path="/kordinators/kordinators" element={<Kordinatorss />} />
          <Route path="/kordinators/pembimbing" element={<Pembimbings />} />
          <Route path="/kordinators/kerja-praktek" element={<KerjaPraktek />} />
          <Route path="/kordinators/tugas-akhir" element={<TugasAkhir />} />
          <Route path="/kordinators/seminar-kp" element={<SeminarKp />} />
          <Route
            path="/kordinators/seminar-proposal"
            element={<SeminarProposal />}
          />
          <Route
            path="/kordinators/seminar-proposal/details"
            element={<SeminarProposalDetails />}
          />
          <Route
            path="/kordinators/seminar-kp/details"
            element={<SeminarKpDetails />}
          />
          <Route path="/kordinators/seminar-hasil" element={<SeminarHasil />} />
          <Route
            path="/kordinators/seminar-hasil/details"
            element={<SeminarHasilDetails />}
          />
          <Route
            path="/kordinators/kerja-praktek/details"
            element={<KpDetails />}
          />
          <Route
            path="/kordinators/tugas-akhir/details"
            element={<TaDetails />}
          />
          {/* mahasiswa */}
          <Route path="/mahasiswa/login" element={<Login />} />
          <Route path="/mahasiswa/register" element={<Register />} />
          <Route path="/mahasiswa" element={<IndexMhs />} />
          <Route path="/mahasiswa/tugas-akhir" element={<TugasAkhirMhs />} />
          <Route
            path="/mahasiswa/kerja-praktek"
            element={<KerjaPraktekMhs />}
          />
          {/* pembimbing */}
          <Route path="/pembimbing/login" element={<LoginPmb />} />
          <Route path="/pembimbings" element={<IndexPmb />} />
          <Route path="/pembimbings/tugas-akhir" element={<TugasAkhirPmb />} />
          <Route
            path="/pembimbings/tugas-akhir/details"
            element={<TaDetailsPmb />}
          />
          <Route
            path="/pembimbings/kerja-praktek"
            element={<KerjaPraktekPmb />}
          />
          <Route
            path="/pembimbings/kerja-praktek/details"
            element={<KpDetailsPmb />}
          />
          <Route path="/mahasiswa/seminar-kp" element={<SeminarKpMhs />} />
          <Route
            path="/mahasiswa/seminar-proposal"
            element={<SeminarProposalMhs />}
          />
          <Route
            path="/mahasiswa/seminar-hasil"
            element={<SeminarHasilMhs />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
