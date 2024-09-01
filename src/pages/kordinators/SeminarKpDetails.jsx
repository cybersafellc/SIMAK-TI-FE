import { Helmet } from "react-helmet";
import UpNav from "../../components/UpNav";
import Sidebar from "../../components/Sidebar";
import FootersAuth from "../../components/FootersAuth";
import React from "react";
import { useLocation } from "react-router-dom"; // 1
import {
  getKPID,
  getPembimbing,
  getSeminarKPID,
  kpDitolak,
  kpSetJadwal,
  kpSetujui,
  SeminarKpPenilaian,
  SeminarKpSetujui,
} from "../../utils/all-utils";
import { Badge, Nav, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function SeminarKpDetails() {
  const [id, setId] = React.useState("");
  const [kp, setKp] = React.useState({});
  const [pembimbing, setPembimbing] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [dosenPembimbing, setDosenPembimbing] = React.useState("");
  const [keterangan, setKeterangan] = React.useState("");
  const changePembimbing = ({ target }) => setDosenPembimbing(target.value);
  const changeKeterangan = ({ target }) => setKeterangan(target.value);

  const query = useQuery(); // 3

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [tanggalMulai, setTanggalMulai] = React.useState("");
  const changeTanggalMulai = ({ target }) => setTanggalMulai(target.value);
  const [tanggalAkhir, setTanggalAkhir] = React.useState("");
  const changeTanggalAkhir = ({ target }) => setTanggalAkhir(target.value);

  const [tanggalSeminar, setTanggalSeminar] = React.useState("");
  const changeTanggalSeminar = ({ target }) => setTanggalSeminar(target.value);
  const [jamMulaiSeminar, setJamMulaiSeminar] = React.useState("");
  const changeJamMulaiSeminar = ({ target }) =>
    setJamMulaiSeminar(target.value);
  const [jamAkhirSeminar, setJamAkhirSeminar] = React.useState("");
  const changeJamAkhirSeminar = ({ target }) =>
    setJamAkhirSeminar(target.value);
  const [ruangan, setRuangan] = React.useState("");
  const changeRuangan = ({ target }) => setRuangan(target.value);
  const [penguji1, setPenguji1] = React.useState("");
  const changePenguji1 = ({ target }) => setPenguji1(target.value);
  const [penguji2, setPenguji2] = React.useState("");
  const changePenguji2 = ({ target }) => setPenguji2(target.value);
  const [lampiran, setLampiran] = React.useState("");
  const changeLampiran = ({ target }) => setLampiran(target.value);

  const [nilai, setNilai] = React.useState("");
  const changeNilai = ({ target }) => setNilai(target.value);
  const [nilaiKompre, setNilaiKompre] = React.useState("-");
  const changeNilaiKompre = ({ target }) => setNilaiKompre(target.value);
  const [nilaiPembimbing1, setNilaiPembimbing1] = React.useState("");
  const changeNilaiPembimbing1 = ({ target }) =>
    setNilaiPembimbing1(target.value);

  const penilaian = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        id: query.get("id"),
        nilai: nilai,
        nilai_sidang_komprehensif: nilaiKompre,
        nilai_pembimbing_satu: nilaiPembimbing1,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          SeminarKpPenilaian(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menginput Nilai");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
        return;
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };
  const tolak = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        id: query.get("id"),
        keterangan: keterangan,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          kpDitolak(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menolak");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
        return;
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };
  const setujui = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        id: query.get("id"),
        tanggal_seminar: tanggalSeminar,
        jam_mulai_seminar: jamMulaiSeminar,
        jam_akhir_seminar: jamAkhirSeminar,
        ruangan: ruangan,
        penguji_satu: penguji1,
        penguji_dua: penguji2,
        lampiran: lampiran,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          SeminarKpSetujui(form, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menyetujui");
        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
        return;
      }
      // Tangani error dengan lebih hati-hati, misalnya:
      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  React.useEffect(() => {
    if (query.get("id")) {
      setId(query.get("id"));
    }
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }

        const [kpData] = await Promise.all([
          new Promise((resolve, reject) => {
            getSeminarKPID(query.get("id"), accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setKp(kpData);
        console.log(kpData);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (err.message == `seminar dengan id:${query.get("id")} tidak ada!`) {
          alert(err);
          window.location.href = "/kordinators/seminar-kp";
        } else if (err.message == "tolong masukkan access_token valid") {
          localStorage.removeItem("access_token");
          window.location.href = "/kordinators/login";
          // Unauthorized
        } else {
          console.error("Error fetching data:", err);
          //   Tampilkan pesan error kepada pengguna atau lakukan tindakan lain yang sesuai
        }
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };
    fetchData();
  }, []); // useEffect tetap berjalan sekali saja
  return (
    <>
      <Helmet>
        <script
          src="/assets/controller/console-bsb.js"
          type="text/javascript"
        />
        <script src="/assets/controller/chart-1.js" type="text/javascript" />
        <script src="/assets/controller/chart-3.js" type="text/javascript" />
        <script src="/assets/controller/chart-4.js" type="text/javascript" />
        {/* <script src="https://unpkg.com/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> */}
      </Helmet>
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          {" "}
          <UpNav />
          <Sidebar />
          <main id="main" className="min-vh-100 bg-light">
            <Message
              view={view}
              error={error}
              pesan={message}
              onClose={() => setView(false)}
            />
            {/* Section - Bootstrap Brain Component */}
            {/* Breadcrumb */}
            <section className="py-3 py-md-4 py-xl-5 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 className="h4">Details Pengajuan Seminar KP</h1>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb m-0 fs-7">
                        <li className="breadcrumb-item">
                          <a
                            className="link-primary text-decoration-none"
                            href="/kordinators"
                          >
                            Home
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          Seminar Kerja Praktek
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Details
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
            {/* Section - Bootstrap Brain Component */}
            <section className="pb-3 pb-md-4 pb-xl-5 bg-light">
              <div className="container">
                <div className="row gy-4 gy-lg-0">
                  <div className="col-12 col-lg-4 col-xl-3">
                    <div className="row gy-4">
                      <div className="col-12">
                        <div className="card widget-card border-light shadow-sm">
                          <div className="card-header text-bg-success">
                            Informasi Mahasiswa
                          </div>
                          <div className="card-body">
                            <div className="text-center mb-3">
                              <img
                                src="/assets/img/profile/profile-img-1.jpg"
                                className="img-fluid rounded-circle"
                                alt="Luna John"
                              />
                            </div>
                            <h5 className="text-center mb-1">
                              {kp?.mahasiswa?.nama}
                            </h5>
                            <p className="text-center text-secondary mb-4">
                              Teknik Industri
                            </p>
                            <ul className="list-group list-group-flush mb-4">
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">NIM</h6>
                                <span>{kp?.mahasiswa?.nim}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">No Hp</h6>
                                <span>{kp?.mahasiswa?.no_hp}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h6 className="m-0">PA</h6>
                                <span>
                                  {kp?.mahasiswa?.pembimbing_akademik
                                    ? kp?.mahasiswa?.pembimbing_akademik
                                    : "-"}
                                </span>
                              </li>
                            </ul>
                            <div className="d-grid m-0"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="card widget-card border-light shadow-sm">
                          <div className="card-header text-bg-success">
                            Informasi Kerja Praktek
                          </div>
                          <div className="card-body">
                            <ul className="list-group list-group-flush mb-0">
                              <li className="list-group-item">
                                <h6 className="mb-1">Judul Laporan</h6>
                                <span>
                                  {kp?.details_seminar?.judul_laporan || "-"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing</h6>
                                <span>
                                  {kp?.details_seminar?.pembimbing_satu?.nama ||
                                    "-"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8 col-xl-9">
                    <div className="card widget-card border-light shadow-sm">
                      <div className="card-body p-4">
                        <ul
                          className="nav nav-tabs"
                          id="profileTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="overview-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#overview-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="overview-tab-pane"
                              aria-selected="true"
                            >
                              Detail
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#profile-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="profile-tab-pane"
                              aria-selected="false"
                            >
                              Setujui
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="password-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#password-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="password-tab-pane"
                              aria-selected="false"
                            >
                              Input Nilai
                            </button>
                          </li>
                        </ul>
                        <div
                          className="tab-content pt-4"
                          id="profileTabContent"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="overview-tab-pane"
                            role="tabpanel"
                            aria-labelledby="overview-tab"
                            tabIndex={0}
                          >
                            <h5 className="mb-3">Data Seminar KP</h5>
                            <div className="row g-0">
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">
                                  Bukti Acc Dari Pembimbing
                                </div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                    href={kp?.bukti_acc_pembimbing}
                                  >
                                    {kp?.bukti_acc_pembimbing
                                      ? "Lihat Disini"
                                      : "-"}
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Tanggal Seminar</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.tanggal_seminar
                                    ? `${new Date(
                                        kp?.tanggal_seminar
                                      ).getDate()}-${
                                        new Date(
                                          kp?.tanggal_seminar
                                        ).getMonth() + 1
                                      }-${new Date(
                                        kp?.tanggal_seminar
                                      ).getFullYear()} `
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Jam Mulai Seminar</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.jam_mulai_seminar
                                    ? `${new Date(
                                        kp?.jam_mulai_seminar
                                      ).getDate()}-${
                                        new Date(
                                          kp?.jam_mulai_seminar
                                        ).getMonth() + 1
                                      }-${new Date(
                                        kp?.jam_mulai_seminar
                                      ).getFullYear()} ${
                                        new Date(
                                          kp?.jam_mulai_seminar
                                        ).getHours() + 1
                                      }:${new Date(kp?.jam_mulai_seminar)
                                        .getMinutes()
                                        .toString()
                                        .padStart(2, "0")}`
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Jam Selesai Seminar</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.jam_akhir_seminar
                                    ? `${new Date(
                                        kp?.jam_akhir_seminar
                                      ).getDate()}-${
                                        new Date(
                                          kp?.jam_akhir_seminar
                                        ).getMonth() + 1
                                      }-${new Date(
                                        kp?.jam_akhir_seminar
                                      ).getFullYear()} ${
                                        new Date(
                                          kp?.jam_akhir_seminar
                                        ).getHours() + 1
                                      }:${new Date(kp?.jam_akhir_seminar)
                                        .getMinutes()
                                        .toString()
                                        .padStart(2, "0")}`
                                    : "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Ruangan</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{kp?.ruangan || "-"}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Lampiran</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{kp?.lampiran || "-"}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Penguji 1</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.penguji?.penguji_satu || "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Penguji 2</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.penguji?.penguji_dua || "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Nilai</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.penilaian_seminar_kp?.nilai || "-"}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Nilai Pembimbing 1</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.penilaian_seminar_kp
                                    ?.nilai_pembimbing_satu || "-"}
                                </div>
                              </div>

                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Tanggal Pengajuan</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {`${new Date(kp?.created_at).getDate()}-${
                                    new Date(kp?.created_at).getMonth() + 1
                                  }-${new Date(
                                    kp?.created_at
                                  ).getFullYear()} ${new Date(
                                    kp?.created_at
                                  ).getHours()}:${new Date(kp?.created_at)
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}`}
                                </div>
                              </div>

                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Status</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.status === "ditolak" && (
                                    <span className="badge rounded-pill bg-danger">
                                      Ditolak
                                    </span>
                                  )}
                                  {kp?.status === "disetujui" && (
                                    <span className="badge rounded-pill bg-success">
                                      Disetujui
                                    </span>
                                  )}
                                  {kp?.status === "menunggu" && (
                                    <span className="badge rounded-pill bg-warning">
                                      Menunggu
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="profile-tab-pane"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                            tabIndex={0}
                          >
                            {kp?.status === "menunggu" ? (
                              <form
                                className="row gy-3 gy-xxl-4"
                                onSubmit={setujui}
                              >
                                <div className="col-12">
                                  <label
                                    htmlFor="inputAbout"
                                    className="form-label"
                                  >
                                    Tanggal Seminar
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="newPassword"
                                    value={tanggalSeminar}
                                    onChange={changeTanggalSeminar}
                                  />
                                </div>
                                <div className="col-12">
                                  <label
                                    htmlFor="startTime"
                                    className="form-label"
                                  >
                                    Jam mulai seminar
                                  </label>
                                  <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="startTime"
                                    value={jamMulaiSeminar}
                                    onChange={changeJamMulaiSeminar}
                                  />
                                </div>

                                <div className="col-12">
                                  <label
                                    htmlFor="endTime"
                                    className="form-label"
                                  >
                                    Jam selesai seminar
                                  </label>
                                  <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="endTime"
                                    value={jamAkhirSeminar}
                                    onChange={changeJamAkhirSeminar}
                                  />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">Ruangan</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={ruangan}
                                    onChange={changeRuangan}
                                  />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">
                                    Penguji 1
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={penguji1}
                                    onChange={changePenguji1}
                                  />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">
                                    Penguji 2
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={penguji2}
                                    onChange={changePenguji2}
                                  />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">
                                    Lampiran{" "}
                                    <span className="fst-italic">
                                      (*optional)
                                    </span>{" "}
                                    <span className="fst-italic text-danger">
                                      (cantumkan link google drive)
                                    </span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={lampiran}
                                    onChange={changeLampiran}
                                  />
                                </div>
                                <div className="col-12">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={loading}
                                  >
                                    Setujui
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div>Tidak Dapat Menyetujui</div>
                            )}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="password-tab-pane"
                            role="tabpanel"
                            aria-labelledby="password-tab"
                            tabIndex={0}
                          >
                            {kp?.status == "disetujui" &&
                            !kp?.penilaian_seminar_kp?.nilai ? (
                              <form onSubmit={penilaian}>
                                <div className="row gy-3 gy-xxl-4">
                                  <div className="col-12">
                                    <label
                                      htmlFor="newPassword"
                                      className="form-label"
                                    >
                                      Nilai
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="newPassword"
                                      value={nilai}
                                      onChange={changeNilai}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <label
                                      htmlFor="newPassword"
                                      className="form-label"
                                    >
                                      Nilai Pembimbing 1
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="newPassword"
                                      value={nilaiPembimbing1}
                                      onChange={changeNilaiPembimbing1}
                                    />
                                  </div>

                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      Simpan Nilai
                                    </button>
                                  </div>
                                </div>
                              </form>
                            ) : (
                              <div>Belum Bisa Input Nilai</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <FootersAuth />
        </>
      )}
    </>
  );
}
