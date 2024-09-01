import { Helmet } from "react-helmet";
import UpNav from "../../components/UpNav";
import Sidebar from "../../components/Sidebar";
import FootersAuth from "../../components/FootersAuth";
import React from "react";
import { useLocation } from "react-router-dom"; // 1
import {
  getKPID,
  getPembimbing,
  getPembimbingId,
  getTAID,
  kpDitolak,
  kpSetJadwal,
  kpSetujui,
  taDitolak,
  taSetujui,
} from "../../utils/all-utils";
import { Badge, Nav, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function TaDetails() {
  const [id, setId] = React.useState("");
  const [kp, setKp] = React.useState({});
  const [pembimbing, setPembimbing] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [dosenPembimbing, setDosenPembimbing] = React.useState("");
  const [dosenPembimbing2, setDosenPembimbing2] = React.useState("");
  const [keterangan, setKeterangan] = React.useState("");
  const [jdlPenelitian, setJdlPenelitian] = React.useState("");
  const changePembimbing = ({ target }) => setDosenPembimbing(target.value);
  const changePembimbing2 = ({ target }) => setDosenPembimbing2(target.value);
  const changeKeterangan = ({ target }) => setKeterangan(target.value);
  const changeJdlPenelitian = ({ target }) => setJdlPenelitian(target.value);

  const query = useQuery(); // 3

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [pb1, setPb1] = React.useState("");
  const [pb2, setPb2] = React.useState("");
  const [pb3, setPb3] = React.useState("");
  const [pb4, setPb4] = React.useState("");

  const [tanggalMulai, setTanggalMulai] = React.useState("");
  const changeTanggalMulai = ({ target }) => setTanggalMulai(target.value);
  const [tanggalAkhir, setTanggalAkhir] = React.useState("");
  const changeTanggalAkhir = ({ target }) => setTanggalAkhir(target.value);
  const setJadwal = async (e) => {
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
        tanggal_mulai_kp: tanggalMulai,
        tanggal_selesai_kp: tanggalAkhir,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          kpSetJadwal(form, accessToken, (err, data) => {
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
          taDitolak(form, accessToken, (err, data) => {
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
        pembimbing_satu_id: dosenPembimbing,
        pembimbing_dua_id: dosenPembimbing2,
        id: query.get("id"),
        judul_penelitian: jdlPenelitian,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          taSetujui(form, accessToken, (err, data) => {
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

        const [kpData, pembimbing1, pembimbing2, pembimbing3] =
          await Promise.all([
            new Promise((resolve, reject) => {
              getTAID(query.get("id"), accessToken, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbing(1, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbing(2, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbing(3, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
          ]);
        await setKp(kpData);
        await setPembimbing([...pembimbing1, ...pembimbing2, ...pembimbing3]);
        if (kpData) {
          const [dtlpb1, dtlpb2, dtlpb3, dtlpb4] = await Promise.all([
            new Promise((resolve, reject) => {
              getPembimbingId(kpData?.pembimbing_satu, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbingId(kpData?.pembimbing_dua, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbingId(kpData?.pembimbing_tiga, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
            new Promise((resolve, reject) => {
              getPembimbingId(kpData?.pembimbing_empat, (err, data) => {
                if (err) reject(err);
                else resolve(data);
              });
            }),
          ]);
          setPb1(dtlpb1);
          setPb2(dtlpb2);
          setPb3(dtlpb3);
          setPb4(dtlpb4);
        }
        console.log(kpData);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (
          err.message ==
          `tidak ada pengajuan tugas akhir dengan id:${query.get("id")}`
        ) {
          alert(err);
          window.location.href = "/kordinators/tugas-akhir";
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
                    <h1 className="h4">Details Pengajuan TA</h1>
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
                        <li className="breadcrumb-item">Tugas Akhir</li>
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
                            Informasi Tugas Akhir
                          </div>
                          <div className="card-body">
                            <ul className="list-group list-group-flush mb-0">
                              <li className="list-group-item">
                                <h6 className="mb-1">Judul Penilitian</h6>
                                <span>
                                  {kp?.details_disetujui?.judul_penelitian ||
                                    "-"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing 1</h6>
                                <span>
                                  {kp?.details_disetujui?.pembimbing_satu
                                    ?.nama || "-"}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <h6 className="mb-1">Dosen Pembimbing 2</h6>
                                <span>
                                  {kp?.details_disetujui?.pembimbing_dua
                                    ?.nama || "-"}
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
                              id="email-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#email-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="email-tab-pane"
                              aria-selected="false"
                            >
                              Tolak
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
                            <h5 className="mb-3">Data Pengajuan</h5>
                            <div className="row g-0">
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Form Tugas Akhir</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.form_ta}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Judul 1</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{kp?.judul_pertama}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Deskripsi Judul 1</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.deskripsi_judul_pertama}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Judul 2</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{kp?.judul_kedua}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Deskripsi Judul 2</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.deskripsi_judul_kedua}
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Pembimbing 1</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{pb1?.nama}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Pembimbing 2</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{pb2?.nama}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Pembimbing 3</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{pb3?.nama}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Pembimbing 4</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{pb4?.nama}</div>
                              </div>

                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Bukti Pembayaran</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.bukti_pembayaran}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">
                                  Bukti Selesai Praktikum
                                </div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.bukti_selesai_praktikum}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Bukti Selesai KP</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.bukti_selsai_kp}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">IPK</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{kp?.ipk}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Jumlah SKS</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">{kp?.jumlah_sks}</div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">KRS</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {" "}
                                  <Nav.Link
                                    href={kp?.krs}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
                                </div>
                              </div>
                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Transkip Nilai</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  <Nav.Link
                                    href={kp?.transkip_nilai}
                                    target="_blank"
                                    className="text-primary text-decoration-underline"
                                  >
                                    Lihat Disini
                                  </Nav.Link>
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
                                  ).getHours()}:${new Date(
                                    kp?.created_at
                                  ).getMinutes()}`}
                                </div>
                              </div>

                              <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                <div className="p-2">Keterangan</div>
                              </div>
                              <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                <div className="p-2">
                                  {kp?.keterangan || "-"}
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
                                  {kp?.status === "diterima" && (
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
                                <div className="col-12 ">
                                  <label
                                    htmlFor="inputCountry"
                                    className="form-label"
                                  >
                                    Dosen Pembimbing 1
                                  </label>
                                  <select
                                    className="form-select"
                                    id="inputCountry"
                                    onChange={changePembimbing}
                                    value={dosenPembimbing}
                                  >
                                    {pembimbing.map((pembimbing, index) => {
                                      return (
                                        <option value={pembimbing?.id}>
                                          {pembimbing?.nama}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="col-12 ">
                                  <label
                                    htmlFor="inputCountry"
                                    className="form-label"
                                  >
                                    Dosen Pembimbing 2
                                  </label>
                                  <select
                                    className="form-select"
                                    id="inputCountry"
                                    onChange={changePembimbing2}
                                    value={dosenPembimbing2}
                                  >
                                    {pembimbing.map((pembimbing, index) => {
                                      return (
                                        <option value={pembimbing?.id}>
                                          {pembimbing?.nama}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="col-12">
                                  <label
                                    htmlFor="inputAbout"
                                    className="form-label"
                                  >
                                    Judul Penelitian
                                  </label>
                                  <input
                                    className="form-control"
                                    id="inputAbout"
                                    value={jdlPenelitian}
                                    onChange={changeJdlPenelitian}
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
                            id="email-tab-pane"
                            role="tabpanel"
                            aria-labelledby="email-tab"
                            tabIndex={0}
                          >
                            {kp?.status === "menunggu" ? (
                              <form
                                className="row gy-3 gy-xxl-4"
                                onSubmit={tolak}
                              >
                                <div className="col-12">
                                  <label
                                    htmlFor="inputAbout"
                                    className="form-label"
                                  >
                                    Keterangan
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="inputAbout"
                                    value={keterangan}
                                    onChange={changeKeterangan}
                                  />
                                </div>
                                <div className="col-12">
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                    disabled={loading}
                                  >
                                    Tolak
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div>Tidak Dapat Menyetujui</div>
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
